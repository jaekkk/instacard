'use client';

import { CardSlide, ColorScheme, COLOR_SCHEMES } from '@/types/card';

interface CardEditorProps {
  slide: CardSlide;
  onChange: (updated: CardSlide) => void;
}

export default function CardEditor({ slide, onChange }: CardEditorProps) {
  const update = (field: keyof CardSlide, value: unknown) =>
    onChange({ ...slide, [field]: value });

  const inputStyle: React.CSSProperties = {
    width: '100%',
    border: '1px solid #e5e5e5',
    padding: '10px 12px',
    fontSize: '14px',
    background: '#fafafa',
    color: '#111111',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.1em',
    color: '#737373',
    display: 'block',
    marginBottom: '6px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: '#737373' }}>
        슬라이드 편집
      </p>

      {/* 배경 색상 */}
      <div>
        <label style={labelStyle}>배경 컬러</label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(Object.keys(COLOR_SCHEMES) as ColorScheme[]).map((key) => (
            <button
              key={key}
              onClick={() => update('colorScheme', key)}
              title={key}
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: COLOR_SCHEMES[key].bg,
                border: slide.colorScheme === key
                  ? `2px solid #111111`
                  : `1.5px solid #e5e5e5`,
                cursor: 'pointer',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
        <p style={{ fontSize: '12px', color: '#a3a3a3', marginTop: '6px' }}>
          현재: {slide.colorScheme}
        </p>
      </div>

      {/* 태그 */}
      {slide.tag !== undefined && (
        <div>
          <label style={labelStyle}>태그</label>
          <input
            style={{ ...inputStyle, resize: undefined }}
            value={slide.tag}
            onChange={(e) => update('tag', e.target.value)}
            placeholder="예: LIFESTYLE, @계정명"
          />
        </div>
      )}

      {/* 숫자 (stat 레이아웃) */}
      {slide.number !== undefined && (
        <div>
          <label style={labelStyle}>숫자 / 수치</label>
          <input
            style={{ ...inputStyle, resize: undefined }}
            value={slide.number}
            onChange={(e) => update('number', e.target.value)}
            placeholder="예: 90분, 7kg, 21일"
          />
        </div>
      )}

      {/* 제목 */}
      <div>
        <label style={labelStyle}>제목</label>
        <textarea
          style={{ ...inputStyle, minHeight: '80px' }}
          value={slide.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="제목을 입력하세요&#10;줄바꿈은 엔터"
        />
      </div>

      {/* 부제목 */}
      {slide.subtitle !== undefined && (
        <div>
          <label style={labelStyle}>부제목</label>
          <input
            style={{ ...inputStyle, resize: undefined }}
            value={slide.subtitle}
            onChange={(e) => update('subtitle', e.target.value)}
            placeholder="부제목을 입력하세요"
          />
        </div>
      )}

      {/* 본문 */}
      {slide.body !== undefined && (
        <div>
          <label style={labelStyle}>본문</label>
          <textarea
            style={{ ...inputStyle, minHeight: '100px' }}
            value={slide.body}
            onChange={(e) => update('body', e.target.value)}
            placeholder="본문 내용을 입력하세요"
          />
        </div>
      )}

      {/* 강조 텍스트 */}
      {slide.accent !== undefined && (
        <div>
          <label style={labelStyle}>강조 문구</label>
          <input
            style={{ ...inputStyle, resize: undefined }}
            value={slide.accent}
            onChange={(e) => update('accent', e.target.value)}
            placeholder="예: 21일의 법칙, 하루 2L"
          />
        </div>
      )}

      {/* 리스트 아이템 */}
      {slide.items !== undefined && (
        <div>
          <label style={labelStyle}>목록 (한 줄에 하나)</label>
          <textarea
            style={{ ...inputStyle, minHeight: '160px' }}
            value={slide.items.join('\n')}
            onChange={(e) => update('items', e.target.value.split('\n'))}
            placeholder="항목 1&#10;항목 2&#10;항목 3"
          />
        </div>
      )}
    </div>
  );
}
