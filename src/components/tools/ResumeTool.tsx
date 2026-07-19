'use client';

import { useState } from 'react';
import { Plus, Trash2, Download, Loader2, FileText, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResumeToolProps {
  locale: string;
  messages: Record<string, unknown>;
}

interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
}

export function ResumeTool({ locale, messages }: ResumeToolProps) {
  const t = (messages.tools as Record<string, Record<string, unknown>>).resume as Record<string, unknown>;
  const templates = (t.templateNames || {}) as Record<string, string>;
  const isRtl = locale === 'ar';

  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
  });
  const [summary, setSummary] = useState('');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [newLanguage, setNewLanguage] = useState('');
  const [isImproving, setIsImproving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      },
    ]);
  };

  const updateExperience = (id: number, field: keyof Experience, value: string | boolean) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (id: number) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        id: Date.now(),
        institution: '',
        degree: '',
        field: '',
        graduationDate: '',
      },
    ]);
  };

  const updateEducation = (id: number, field: keyof Education, value: string) => {
    setEducations(
      educations.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const removeEducation = (id: number) => {
    setEducations(educations.filter((edu) => edu.id !== id));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const removeLanguage = (lang: string) => {
    setLanguages(languages.filter((l) => l !== lang));
  };

  const handleAiImprove = async () => {
    if (!summary) return;
    setIsImproving(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const improvedSummary = locale === 'ar'
      ? `متخصص ذو خبرة واسعة يتمتع بمهارات قوية في القيادة والتحليل وحل المشكلات. يثبت التاريخ في تحقيق النتائج وقيادة المشاريع بنجاح. يمتلك القدرة على العمل تحت الضغط والتكيف مع بيئات العمل المتنوعة.`
      : `Results-driven professional with extensive experience in leadership, analysis, and problem-solving. Proven track record of delivering results and successfully leading projects. Ability to thrive under pressure and adapt to diverse work environments.`;
    
    setSummary(improvedSummary);
    setIsImproving(false);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input Panel */}
      <div className="space-y-6">
        {/* Templates */}
        <div>
          <label className="mb-3 block text-sm font-medium text-n-700">
            {t.templates as string}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(templates).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedTemplate(key)}
                className={cn(
                  'rounded-lg border px-3 py-2 text-sm font-medium transition-all',
                  selectedTemplate === key
                    ? 'border-accent bg-accent text-white'
                    : 'border-n-200 text-n-700 hover:border-n-300 hover:bg-n-100'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Personal Information */}
        <div className="rounded-xl border border-n-200 bg-white p-6">
          <h3 className="mb-4 font-semibold text-n-900">{t.personalInfo as string}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm text-n-700">{t.fullName as string}</label>
              <input
                type="text"
                value={personalInfo.fullName}
                onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                className="w-full rounded-lg border border-n-200 px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-n-700">{t.email as string}</label>
              <input
                type="email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                className="w-full rounded-lg border border-n-200 px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-n-700">{t.phone as string}</label>
              <input
                type="tel"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                className="w-full rounded-lg border border-n-200 px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-n-700">{t.location as string}</label>
              <input
                type="text"
                value={personalInfo.location}
                onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                className="w-full rounded-lg border border-n-200 px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm text-n-700">{t.website as string}</label>
              <input
                type="url"
                value={personalInfo.website}
                onChange={(e) => setPersonalInfo({ ...personalInfo, website: e.target.value })}
                className="w-full rounded-lg border border-n-200 px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border border-n-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-n-900">{t.summary as string}</h3>
            <button
              onClick={handleAiImprove}
              disabled={!summary || isImproving}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                summary && !isImproving
                  ? 'bg-accent/10 text-accent hover:bg-accent/20'
                  : 'bg-n-100 text-n-400 cursor-not-allowed'
              )}
            >
              {isImproving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {t.aiImprove as string}
            </button>
          </div>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder={t.summaryPlaceholder as string}
            rows={4}
            className="w-full rounded-lg border border-n-200 px-3 py-2.5 text-sm text-n-900 placeholder-n-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        {/* Experience */}
        <div className="rounded-xl border border-n-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-n-900">{t.experience as string}</h3>
            <button
              onClick={addExperience}
              className="flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent/20"
            >
              <Plus className="h-4 w-4" />
              {t.addExperience as string}
            </button>
          </div>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="rounded-lg border border-n-200 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-n-700">
                    {exp.company || (locale === 'ar' ? 'خبرة جديدة' : 'New Experience')}
                  </span>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="text-n-400 hover:text-error"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder={t.company as string}
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="rounded-lg border border-n-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder={t.position as string}
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    className="rounded-lg border border-n-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder={t.startDate as string}
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    className="rounded-lg border border-n-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={t.endDate as string}
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      disabled={exp.current}
                      className="flex-1 rounded-lg border border-n-200 px-3 py-2 text-sm focus:border-accent focus:outline-none disabled:bg-n-100"
                    />
                    <label className="flex items-center gap-1.5 text-sm text-n-600">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                        className="rounded border-n-300 text-accent focus:ring-accent"
                      />
                      {t.current as string}
                    </label>
                  </div>
                  <textarea
                    placeholder={t.experiencePlaceholder as string}
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    rows={3}
                    className="sm:col-span-2 rounded-lg border border-n-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="rounded-xl border border-n-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-n-900">{t.education as string}</h3>
            <button
              onClick={addEducation}
              className="flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent/20"
            >
              <Plus className="h-4 w-4" />
              {t.addEducation as string}
            </button>
          </div>
          <div className="space-y-4">
            {educations.map((edu) => (
              <div key={edu.id} className="rounded-lg border border-n-200 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-n-700">
                    {edu.institution || (locale === 'ar' ? 'تعليم جديد' : 'New Education')}
                  </span>
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="text-n-400 hover:text-error"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder={t.institution as string}
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    className="rounded-lg border border-n-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder={t.degree as string}
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="rounded-lg border border-n-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder={t.field as string}
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    className="rounded-lg border border-n-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder={t.graduationDate as string}
                    value={edu.graduationDate}
                    onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                    className="rounded-lg border border-n-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="rounded-xl border border-n-200 bg-white p-6">
          <h3 className="mb-4 font-semibold text-n-900">{t.skills as string}</h3>
          <div className="mb-3 flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill()}
              placeholder={t.skillPlaceholder as string}
              className="flex-1 rounded-lg border border-n-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
            />
            <button
              onClick={addSkill}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-sm text-accent"
              >
                {skill}
                <button onClick={() => removeSkill(skill)} className="hover:text-accent/80">
                  <Trash2 className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="rounded-xl border border-n-200 bg-white p-6">
          <h3 className="mb-4 font-semibold text-n-900">{t.languages as string}</h3>
          <div className="mb-3 flex gap-2">
            <input
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addLanguage()}
              placeholder={t.languagePlaceholder as string}
              className="flex-1 rounded-lg border border-n-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
            />
            <button
              onClick={addLanguage}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <span
                key={lang}
                className="flex items-center gap-1.5 rounded-full bg-accent-secondary/10 px-3 py-1 text-sm text-accent-secondary"
              >
                {lang}
                <button onClick={() => removeLanguage(lang)} className="hover:text-accent-secondary/80">
                  <Trash2 className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="rounded-2xl border border-n-200 bg-white">
        <div className="flex items-center justify-between border-b border-n-200 px-6 py-4">
          <h3 className="font-semibold text-n-900">{t.preview as string}</h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-lg border border-n-200 px-3 py-1.5 text-sm text-n-700 hover:bg-n-100">
              <FileText className="h-4 w-4" />
              {t.downloadPDF as string}
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-n-200 px-3 py-1.5 text-sm text-n-700 hover:bg-n-100">
              <Download className="h-4 w-4" />
              {t.downloadWord as string}
            </button>
          </div>
        </div>

        <div className="p-6">
          {personalInfo.fullName || summary || experiences.length > 0 || educations.length > 0 || skills.length > 0 ? (
            <div className={cn('min-h-[600px] rounded-xl border border-n-200 bg-white p-8', isRtl && 'text-right')}>
              {/* Header */}
              <div className={cn('mb-6 border-b border-n-200 pb-6', isRtl ? 'text-right' : 'text-left')}>
                <h1 className="mb-2 text-2xl font-bold text-n-900">
                  {personalInfo.fullName || (locale === 'ar' ? 'اسمك هنا' : 'Your Name')}
                </h1>
                <div className={cn('flex flex-wrap gap-3 text-sm text-n-600', isRtl ? 'justify-end' : 'justify-start')}>
                  {personalInfo.email && <span>{personalInfo.email}</span>}
                  {personalInfo.phone && <span>{personalInfo.phone}</span>}
                  {personalInfo.location && <span>{personalInfo.location}</span>}
                  {personalInfo.website && <span>{personalInfo.website}</span>}
                </div>
              </div>

              {/* Summary */}
              {summary && (
                <div className="mb-6">
                  <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
                    {t.summary as string}
                  </h2>
                  <p className="text-sm leading-relaxed text-n-700">{summary}</p>
                </div>
              )}

              {/* Experience */}
              {experiences.length > 0 && (
                <div className="mb-6">
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
                    {t.experience as string}
                  </h2>
                  {experiences.map((exp) => (
                    <div key={exp.id} className="mb-4 last:mb-0">
                      <div className={cn('flex items-start justify-between', isRtl && 'flex-row-reverse')}>
                        <div>
                          <h3 className="font-semibold text-n-900">{exp.position}</h3>
                          <p className="text-sm text-n-600">{exp.company}</p>
                        </div>
                        <span className="text-sm text-n-500">
                          {exp.startDate} - {exp.current ? (locale === 'ar' ? 'حتى الآن' : 'Present') : exp.endDate}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="mt-2 text-sm text-n-700">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {educations.length > 0 && (
                <div className="mb-6">
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
                    {t.education as string}
                  </h2>
                  {educations.map((edu) => (
                    <div key={edu.id} className="mb-3 last:mb-0">
                      <div className={cn('flex items-start justify-between', isRtl && 'flex-row-reverse')}>
                        <div>
                          <h3 className="font-semibold text-n-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                          <p className="text-sm text-n-600">{edu.institution}</p>
                        </div>
                        <span className="text-sm text-n-500">{edu.graduationDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <div className="mb-6">
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
                    {t.skills as string}
                  </h2>
                  <div className={cn('flex flex-wrap gap-2', isRtl && 'justify-end')}>
                    {skills.map((skill) => (
                      <span key={skill} className="rounded-full bg-n-100 px-3 py-1 text-sm text-n-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {languages.length > 0 && (
                <div>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
                    {t.languages as string}
                  </h2>
                  <div className={cn('flex flex-wrap gap-2', isRtl && 'justify-end')}>
                    {languages.map((lang) => (
                      <span key={lang} className="rounded-full bg-n-100 px-3 py-1 text-sm text-n-700">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-n-100">
                <span className="text-2xl">📄</span>
              </div>
              <p className="text-n-500">
                {locale === 'ar' 
                  ? 'ستظهر معاينة السيرة الذاتية هنا'
                  : 'Resume preview will appear here'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
