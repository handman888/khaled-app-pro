import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// --- In-memory rate limiter (per-IP, sliding window) ---
const RATE_LIMIT_MAX = 10;          // requests per window
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

// Periodic cleanup to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateLimitMap) {
    if (now > val.resetAt) rateLimitMap.delete(key);
  }
}, 120_000);

// --- Allowed MIME types ---
const ALLOWED_TYPES = new Set([
  'image/png', 'image/jpeg', 'image/webp', 'image/gif',
]);
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(request: NextRequest) {
  try {
    // --- Rate limit check ---
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({
        error: 'Too many requests. Please try again later.',
        code: 'RATE_LIMITED'
      }, { status: 429 });
    }

    const formData = await request.formData();
    const imageFile = formData.get('image') as File | null;
    const outputFormat = (formData.get('format') as string) || 'html';

    if (!imageFile) {
      return NextResponse.json({
        error: 'No image provided',
        code: 'NO_IMAGE'
      }, { status: 400 });
    }

    // --- Validate MIME type ---
    if (!ALLOWED_TYPES.has(imageFile.type)) {
      return NextResponse.json({
        error: 'Invalid file type. Please upload a PNG, JPEG, or WebP image.',
        code: 'INVALID_TYPE'
      }, { status: 400 });
    }

    // --- Validate file size ---
    if (imageFile.size > MAX_FILE_SIZE) {
      return NextResponse.json({
        error: 'File too large. Maximum size is 10 MB.',
        code: 'FILE_TOO_LARGE'
      }, { status: 400 });
    }

    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your-openai-api-key-here') {
      return NextResponse.json({
        error: 'OpenAI API key is not configured.',
        code: 'MISSING_API_KEY',
        docs: 'https://platform.openai.com/api-keys'
      }, { status: 503 });
    }

    // Convert file to base64
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');
    const mimeType = imageFile.type || 'image/png';

    // Analyze image and generate code using OpenAI Vision
    const analysisPrompt = getAnalysisPrompt(outputFormat);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an expert web developer and UI/UX designer. Analyze the provided image with extreme precision and generate production-ready code that perfectly recreates the design. Pay attention to every detail: colors, fonts, spacing, layouts, shadows, borders, gradients, and responsive behavior.'
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: analysisPrompt
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${base64Image}`,
                  detail: 'high'
                }
              }
            ]
          }
        ],
        max_tokens: 4000,
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);

      // Handle specific OpenAI error codes
      if (response.status === 401) {
        return NextResponse.json({
          error: 'Invalid API key. Please check your OpenAI API key configuration.',
          code: 'INVALID_API_KEY'
        }, { status: 401 });
      }

      if (response.status === 429) {
        return NextResponse.json({ 
          error: 'Rate limit exceeded. Please try again later or upgrade your OpenAI plan.',
          code: 'RATE_LIMIT_EXCEEDED'
        }, { status: 429 });
      }

      if (response.status === 400) {
        return NextResponse.json({ 
          error: 'Invalid request. The image may be too large or in an unsupported format.',
          code: 'BAD_REQUEST'
        }, { status: 400 });
      }

      return NextResponse.json({ 
        error: errorData.error?.message || 'Failed to analyze image. Please try again.',
        code: 'ANALYSIS_FAILED'
      }, { status: 500 });
    }

    const data = await response.json();
    const generatedCode = data.choices[0]?.message?.content;

    if (!generatedCode) {
      return NextResponse.json({ error: 'No code generated' }, { status: 500 });
    }

    // Extract analysis details
    const analysisDetails = extractAnalysisDetails(generatedCode);

    return NextResponse.json({
      code: generatedCode,
      analysis: analysisDetails
    });

  } catch (error) {
    console.error('Image analysis error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function getAnalysisPrompt(format: string): string {
  const basePrompt = `Analyze this image with extreme precision and generate code that recreates it exactly.

IMPORTANT INSTRUCTIONS:
1. Identify ALL visual elements: text, buttons, icons, images, containers, layouts
2. Extract exact colors (use hex codes), fonts, sizes, spacing, and shadows
3. Note the complete layout structure (flex, grid, absolute positioning)
4. Identify all interactive elements and their states
5. Make the code responsive for mobile, tablet, and desktop
6. Use modern CSS practices (Flexbox, Grid, CSS Variables)
7. Include proper semantic HTML structure

ANALYSIS REQUIREMENTS:
- List every visible element with its exact position
- Extract all text content exactly as shown
- Identify color palette used (primary, secondary, accent, background, text colors)
- Note typography (font family, sizes, weights, line heights)
- Describe spacing and alignment patterns
- Identify any shadows, borders, or visual effects
- Note hover states and interactive elements

`;

  switch (format) {
    case 'react':
      return basePrompt + `Generate a complete React component using TypeScript and Tailwind CSS that recreates this design.
Include:
- Proper TypeScript interfaces for props
- Reusable component structure
- Tailwind CSS classes for styling
- Responsive design utilities
- Accessible HTML elements

Return ONLY the code in a single code block with proper formatting.`;

    case 'vue':
      return basePrompt + `Generate a complete Vue.js single-file component that recreates this design.
Include:
- Template section with HTML structure
- Script section with proper TypeScript
- Style section with scoped CSS or Tailwind
- Responsive design
- Accessible HTML elements

Return ONLY the code in a single code block with proper formatting.`;

    case 'nextjs':
      return basePrompt + `Generate a Next.js App Router component using TypeScript and Tailwind CSS that recreates this design.
Include:
- 'use client' directive for client components (if interactive)
- Proper TypeScript interfaces for props
- Next.js App Router conventions (app directory structure)
- Tailwind CSS classes for styling
- next/image for any images (with alt text)
- next/link for any navigation links
- Responsive design with Tailwind responsive utilities
- Accessible HTML elements with proper ARIA attributes
- Server Component by default, Client Component only when needed

Return ONLY the code in a single code block with proper formatting.`;

    case 'svelte':
      return basePrompt + `Generate a Svelte component using TypeScript that recreates this design.
Include:
- Svelte 5 syntax with $props() for reactive state
- TypeScript interfaces for props
- Scoped CSS styles (in <style> block)
- Tailwind CSS classes if applicable
- Responsive design
- Accessible HTML elements
- Svelte transitions/animations where appropriate
- Event handlers for interactive elements

Return ONLY the code in a single code block with proper formatting.`;

    case 'css':
      return basePrompt + `Generate the HTML and CSS needed to recreate this design.
Include:
- Semantic HTML structure
- Clean, well-organized CSS
- CSS variables for colors and spacing
- Responsive media queries
- Modern CSS features (Flexbox, Grid)

Return the code in a single code block with HTML and CSS together.`;

    default: // html
      return basePrompt + `Generate complete HTML with inline CSS or a style block that recreates this design.
Include:
- Full HTML5 document structure
- Inline or embedded CSS
- Responsive design with media queries
- Semantic HTML elements
- Accessibility attributes

Return ONLY the code in a single code block with proper formatting.`;
  }
}

function extractAnalysisDetails(code: string): {
  elements: string[];
  colors: string[];
  fonts: string[];
  layout: string;
} {
  // Extract colors (hex codes)
  const colorRegex = /#[0-9A-Fa-f]{3,8}/g;
  const colors = [...new Set(code.match(colorRegex) || [])];

  // Extract font families
  const fontRegex = /font-family:\s*([^;]+)/g;
  const fonts: string[] = [];
  let fontMatch;
  while ((fontMatch = fontRegex.exec(code)) !== null) {
    fonts.push(fontMatch[1].trim());
  }

  // Identify layout type
  let layout = 'Unknown';
  if (code.includes('display: grid') || code.includes('grid-template')) {
    layout = 'CSS Grid';
  } else if (code.includes('display: flex') || code.includes('flex-direction')) {
    layout = 'Flexbox';
  } else if (code.includes('display: absolute') || code.includes('position: absolute')) {
    layout = 'Absolute Positioning';
  }

  // Extract key elements
  const elements: string[] = [];
  const elementPatterns = [
    { regex: /<button[^>]*>([^<]*)<\/button>/g, name: 'Button' },
    { regex: /<input[^>]*>/g, name: 'Input' },
    { regex: /<nav[^>]*>/g, name: 'Navigation' },
    { regex: /<header[^>]*>/g, name: 'Header' },
    { regex: /<footer[^>]*>/g, name: 'Footer' },
    { regex: /<section[^>]*>/g, name: 'Section' },
    { regex: /<article[^>]*>/g, name: 'Article' },
  ];

  for (const pattern of elementPatterns) {
    const matches = code.match(pattern.regex);
    if (matches && matches.length > 0) {
      elements.push(`${pattern.name} (${matches.length})`);
    }
  }

  return {
    elements,
    colors,
    fonts: [...new Set(fonts)],
    layout
  };
}
