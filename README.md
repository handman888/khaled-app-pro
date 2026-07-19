# Smart Design Digital Pro

التصميم الذكي ديجيتال برو — The complete AI platform for text, image, and video design in Arabic and English.

## Features

- **11 AI Tools** — Text, Image, Video, Audio, Code, Chat, Translate, Document, Presentation, Resume, Social Media
- **Bilingual** — Full Arabic and English support with RTL
- **Responsive** — Works on all devices
- **Professional Design** — Built with Tailwind CSS

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/smart-design-digital-pro.git

# Navigate to project
cd smart-design-digital-pro

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Development

```bash
# Start dev server (with webpack - required for Windows)
npm run dev

# Build for production
npm run build -- --webpack

# Start production server
npm start
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

## Project Structure

```
smart-design-digital-pro/
├── locales/           # Translation files (en.json, ar.json)
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   │   ├── layout/    # Header, Footer
│   │   ├── sections/  # Homepage sections
│   │   ├── tools/     # AI tool components
│   │   └── pages/     # Page components
│   └── lib/           # Utilities (i18n, utils)
├── public/            # Static assets
└── DESIGN.md          # Design system documentation
```

## Available Tools

| Tool | Path | Description |
|------|------|-------------|
| Text Generation | `/tools/text` | Create marketing copy, social media content |
| Image Generation | `/tools/image` | AI image creation with styles and effects |
| Video Generation | `/tools/video` | Video creation with templates |
| Audio/Music | `/tools/audio` | Music, voiceover, sound effects |
| Code Generator | `/tools/code` | Generate, explain, debug code |
| AI Chatbot | `/tools/chat` | Conversational AI assistant |
| AI Translator | `/tools/translate` | 100+ language translation |
| Document Analyzer | `/tools/document` | Analyze and summarize documents |
| Presentation Maker | `/tools/presentation` | Create professional presentations |
| Resume Builder | `/tools/resume` | Build professional resumes |
| Social Media | `/tools/social` | Manage social media content |

## Bilingual Support

- English: `/en/*`
- Arabic: `/ar/*`

## License

MIT
