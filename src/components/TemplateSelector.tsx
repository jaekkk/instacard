'use client';

import { TEMPLATES } from '@/data/templates';
import { CardTemplate } from '@/types/card';
import CardCanvas from './CardCanvas';

interface TemplateSelectorProps {
  selected: CardTemplate;
  onSelect: (template: CardTemplate) => void;
}

export default function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: '#737373', marginBottom: '4px' }}>
        템플릿 선택
      </p>
      {TEMPLATES.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template)}
          className="template-item"
          style={{
            display: 'flex',
            gap: '14px',
            alignItems: 'center',
            padding: '12px',
            border: `1.5px solid ${selected.id === template.id ? '#111111' : '#e5e5e5'}`,
            background: selected.id === template.id ? '#f5f5f5' : '#ffffff',
            cursor: 'pointer',
            textAlign: 'left',
            width: '100%',
          }}
        >
          {/* 썸네일 */}
          <div style={{ width: '52px', height: '52px', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, transform: 'scale(0.10833)', transformOrigin: 'top left', pointerEvents: 'none' }}>
              <CardCanvas slide={template.slides[0]} size={480} />
            </div>
          </div>

          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#111111', marginBottom: '2px' }}>
              {template.name}
            </p>
            <p style={{ fontSize: '12px', color: '#737373' }}>
              {template.description}
            </p>
            <p style={{ fontSize: '11px', color: '#a3a3a3', marginTop: '4px' }}>
              {template.slides.length}장
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
