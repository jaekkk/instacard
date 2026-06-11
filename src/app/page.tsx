'use client';

import { useState, useCallback, useRef } from 'react';
import { TEMPLATES } from '@/data/templates';
import { CardTemplate, CardSlide } from '@/types/card';
import CardCanvas from '@/components/CardCanvas';
import TemplateSelector from '@/components/TemplateSelector';
import CardEditor from '@/components/CardEditor';

export default function Home() {
  const [activeTemplate, setActiveTemplate] = useState<CardTemplate>(TEMPLATES[0]);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [slides, setSlides] = useState<CardSlide[]>(TEMPLATES[0].slides);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTemplateSelect = useCallback((template: CardTemplate) => {
    setActiveTemplate(template);
    setSlides(template.slides);
    setActiveSlideIdx(0);
  }, []);

  const handleSlideChange = useCallback((updated: CardSlide) => {
    setSlides((prev) => prev.map((s, i) => (i === activeSlideIdx ? updated : s)));
  }, [activeSlideIdx]);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCoverImageUrl(url);
  }, []);

  const activeSlide = slides[activeSlideIdx];
  const isCoverSlide = activeSlide.layout === 'cover';

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fafafa',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* 헤더 */}
      <header style={{
        borderBottom: '1px solid #e5e5e5',
        backgroundColor: '#ffffff',
        padding: '0 32px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '-0.01em' }}>
            Insta Card
          </span>
          <span style={{
            fontSize: '11px',
            fontWeight: 500,
            color: '#737373',
            border: '1px solid #e5e5e5',
            padding: '2px 8px',
          }}>
            MINIMAL
          </span>
        </div>
        <p style={{ fontSize: '13px', color: '#a3a3a3' }}>
          인스타그램 카드 뉴스 템플릿
        </p>
      </header>

      {/* 메인 레이아웃 */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>

        {/* 왼쪽: 템플릿 선택 */}
        <aside style={{
          width: '240px',
          borderRight: '1px solid #e5e5e5',
          backgroundColor: '#ffffff',
          padding: '24px 16px',
          overflowY: 'auto',
          flexShrink: 0,
        }}>
          <TemplateSelector
            selected={activeTemplate}
            onSelect={handleTemplateSelect}
          />
        </aside>

        {/* 가운데: 카드 미리보기 */}
        <main style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '32px 24px',
          overflowY: 'auto',
          gap: '24px',
        }}>
          {/* 이미지 업로드 (커버 슬라이드일 때만) */}
          {isCoverSlide && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              border: '1px dashed #d4d4d4',
              backgroundColor: '#ffffff',
              width: '480px',
            }}>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  padding: '8px 16px',
                  background: '#111111',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                  flexShrink: 0,
                }}
              >
                사진 업로드
              </button>
              <p style={{ fontSize: '12px', color: '#a3a3a3', margin: 0 }}>
                {coverImageUrl ? '커버 사진이 적용됐습니다' : '커버 배경에 사용할 사진을 업로드하세요'}
              </p>
              {coverImageUrl && (
                <button
                  onClick={() => setCoverImageUrl(null)}
                  style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#a3a3a3', cursor: 'pointer', fontSize: '12px', flexShrink: 0 }}
                >
                  제거
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
            </div>
          )}

          {/* 현재 슬라이드 */}
          <div style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <CardCanvas
              slide={activeSlide}
              size={480}
              backgroundImage={isCoverSlide ? coverImageUrl ?? undefined : undefined}
            />
          </div>

          {/* 슬라이드 내비게이션 썸네일 */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => setActiveSlideIdx(i)}
                style={{
                  padding: '0',
                  border: `2px solid ${i === activeSlideIdx ? '#111111' : '#e5e5e5'}`,
                  cursor: 'pointer',
                  background: 'none',
                  opacity: i === activeSlideIdx ? 1 : 0.65,
                  transition: 'all 0.15s ease',
                  overflow: 'hidden',
                  position: 'relative',
                  width: '70px',
                  height: '70px',
                  flexShrink: 0,
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transform: 'scale(0.14583)',
                  transformOrigin: 'top left',
                  pointerEvents: 'none',
                }}>
                  <CardCanvas
                    slide={slide}
                    size={480}
                    backgroundImage={i === 0 && slide.layout === 'cover' ? coverImageUrl ?? undefined : undefined}
                  />
                </div>
              </button>
            ))}
          </div>

          <p style={{ fontSize: '13px', color: '#a3a3a3' }}>
            {activeSlideIdx + 1} / {slides.length}
          </p>
        </main>

        {/* 오른쪽: 편집 패널 */}
        <aside style={{
          width: '280px',
          borderLeft: '1px solid #e5e5e5',
          backgroundColor: '#ffffff',
          padding: '24px 20px',
          overflowY: 'auto',
          flexShrink: 0,
        }}>
          <CardEditor
            slide={activeSlide}
            onChange={handleSlideChange}
          />

          <div style={{
            marginTop: '32px',
            padding: '16px',
            backgroundColor: '#fafafa',
            border: '1px solid #e5e5e5',
          }}>
            <p style={{ fontSize: '12px', color: '#737373', lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: '#111', display: 'block', marginBottom: '6px', fontSize: '12px' }}>
                📱 저장 방법
              </strong>
              카드를 우클릭 → 이미지로 저장하거나<br />
              브라우저 캡처 도구를 이용하세요.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
