'use client';

import { CardSlide, COLOR_SCHEMES } from '@/types/card';

interface CardCanvasProps {
  slide: CardSlide;
  size?: number;
  backgroundImage?: string;
}

export default function CardCanvas({ slide, size = 480, backgroundImage }: CardCanvasProps) {
  const scheme = COLOR_SCHEMES[slide.colorScheme];
  const hasPhotoBg = slide.layout === 'cover' && !!backgroundImage;

  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    backgroundColor: hasPhotoBg ? '#000' : scheme.bg,
    color: hasPhotoBg ? '#ffffff' : scheme.text,
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Pretendard', -apple-system, sans-serif",
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={containerStyle} className="card-canvas select-none">
      {/* 사진 배경 + 다크 오버레이 */}
      {hasPhotoBg && (
        <>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)',
          }} />
        </>
      )}
      {slide.layout === 'cover' && (
        <CoverLayout
          slide={slide}
          scheme={hasPhotoBg ? { ...scheme, bg: 'transparent', text: '#ffffff', muted: 'rgba(255,255,255,0.7)', border: 'rgba(255,255,255,0.3)', accent: '#ffffff' } : scheme}
        />
      )}
      {slide.layout === 'quote' && <QuoteLayout slide={slide} scheme={scheme} />}
      {slide.layout === 'tip' && <TipLayout slide={slide} scheme={scheme} />}
      {slide.layout === 'list' && <ListLayout slide={slide} scheme={scheme} />}
      {slide.layout === 'stat' && <StatLayout slide={slide} scheme={scheme} />}
      {slide.layout === 'closing' && <ClosingLayout slide={slide} scheme={scheme} />}
    </div>
  );
}

type SchemeType = typeof COLOR_SCHEMES[keyof typeof COLOR_SCHEMES];
interface LayoutProps {
  slide: CardSlide;
  scheme: SchemeType;
}

function CoverLayout({ slide, scheme }: LayoutProps) {
  return (
    <div style={{
      padding: '44px 40px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 1,
    }}>
      {/* 상단: 브랜드 태그 */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {slide.tag && (
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.18em',
            color: scheme.muted,
            textTransform: 'uppercase',
          }}>
            {slide.tag}
          </span>
        )}
      </div>

      {/* 하단: 뱃지 + 제목 */}
      <div>
        {slide.subtitle && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            border: `1px solid ${scheme.border}`,
            padding: '6px 12px',
            marginBottom: '16px',
            backdropFilter: 'blur(4px)',
          }}>
            <span style={{
              fontSize: '13px',
              color: scheme.text,
              letterSpacing: '0.02em',
            }}>
              {slide.subtitle}
            </span>
            <span style={{ fontSize: '13px', color: scheme.muted }}>↗</span>
          </div>
        )}
        <h1 style={{
          fontSize: '42px',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          color: scheme.text,
          whiteSpace: 'pre-line',
          margin: 0,
        }}>
          {slide.title}
        </h1>
      </div>
    </div>
  );
}

function QuoteLayout({ slide, scheme }: LayoutProps) {
  return (
    <div style={{
      padding: '56px 48px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '2px',
        height: '48px',
        backgroundColor: scheme.accent,
        marginBottom: '32px',
      }} />
      <blockquote style={{
        fontSize: '26px',
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: '-0.01em',
        marginBottom: '24px',
        whiteSpace: 'pre-line',
      }}>
        {slide.title}
      </blockquote>
      {slide.subtitle && (
        <p style={{
          fontSize: '14px',
          color: scheme.muted,
          letterSpacing: '0.05em',
        }}>
          {slide.subtitle}
        </p>
      )}
    </div>
  );
}

function TipLayout({ slide, scheme }: LayoutProps) {
  return (
    <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {slide.tag && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          border: `1px solid ${scheme.border}`,
          padding: '6px 14px',
          marginBottom: '40px',
          alignSelf: 'flex-start',
        }}>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: scheme.muted }}>
            {slide.tag}
          </span>
        </div>
      )}
      <h2 style={{
        fontSize: '32px',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        marginBottom: '20px',
        flex: '0 0 auto',
      }}>
        {slide.title}
      </h2>
      {slide.body && (
        <p style={{
          fontSize: '17px',
          color: scheme.muted,
          lineHeight: 1.75,
          flex: 1,
        }}>
          {slide.body}
        </p>
      )}
      {slide.accent && (
        <div style={{
          marginTop: 'auto',
          paddingTop: '32px',
          borderTop: `1px solid ${scheme.border}`,
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          color: scheme.accent,
        }}>
          → {slide.accent}
        </div>
      )}
    </div>
  );
}

function ListLayout({ slide, scheme }: LayoutProps) {
  return (
    <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '36px' }}>
        {slide.tag && (
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', color: scheme.muted }}>
            {slide.tag}
          </span>
        )}
        <h2 style={{
          fontSize: '26px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}>
          {slide.title}
        </h2>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
        {slide.items?.map((item, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '14px 0',
              borderBottom: i < (slide.items?.length ?? 0) - 1 ? `1px solid ${scheme.border}` : 'none',
              fontSize: '17px',
              lineHeight: 1.5,
            }}
          >
            <span style={{
              fontSize: '12px',
              fontWeight: 600,
              color: scheme.muted,
              minWidth: '20px',
              paddingTop: '3px',
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatLayout({ slide, scheme }: LayoutProps) {
  return (
    <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <div>
        {slide.tag && (
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', color: scheme.muted }}>
            {slide.tag}
          </span>
        )}
      </div>
      <div>
        <div style={{
          fontSize: '80px',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          marginBottom: '20px',
          color: scheme.accent,
        }}>
          {slide.number}
        </div>
        <h2 style={{
          fontSize: '26px',
          fontWeight: 600,
          lineHeight: 1.3,
          letterSpacing: '-0.01em',
          marginBottom: '16px',
          whiteSpace: 'pre-line',
        }}>
          {slide.title}
        </h2>
        {slide.body && (
          <p style={{ fontSize: '15px', color: scheme.muted, lineHeight: 1.65 }}>
            {slide.body}
          </p>
        )}
      </div>
      <div style={{ width: '32px', height: '2px', backgroundColor: scheme.border }} />
    </div>
  );
}

function ClosingLayout({ slide, scheme }: LayoutProps) {
  return (
    <div style={{
      padding: '48px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    }}>
      <div style={{
        width: '32px',
        height: '2px',
        backgroundColor: scheme.accent,
      }} />
      <div>
        <h2 style={{
          fontSize: '40px',
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          marginBottom: '16px',
          whiteSpace: 'pre-line',
        }}>
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p style={{ fontSize: '17px', color: scheme.muted, lineHeight: 1.65 }}>
            {slide.subtitle}
          </p>
        )}
      </div>
      {slide.tag && (
        <p style={{ fontSize: '14px', color: scheme.muted, letterSpacing: '0.03em' }}>
          {slide.tag}
        </p>
      )}
    </div>
  );
}
