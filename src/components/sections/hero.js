import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import HeroVisual from '../heroVisual';

const TITLE_WORDS = [
  { text: 'I', accent: false },
  { text: 'build', accent: false },
  { text: 'AI-powered', accent: true },
  { text: 'applications.', accent: false, breakAfter: true },
  { text: 'From', accent: false },
  { text: 'idea', accent: false },
  { text: 'to', accent: false },
  { text: 'production', accent: false },
  { text: 'on', accent: false },
  { text: 'iOS', accent: false },
  { text: '&', accent: false },
  { text: 'Android.', accent: false },
];

const titleGlow = keyframes`
  0%, 100% { text-shadow: 0 0 0 transparent; }
  50% { text-shadow: 0 0 22px rgba(100, 255, 218, 0.14); }
`;

const accentShine = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  align-items: center;
  justify-content: space-between;
  gap: clamp(24px, 4vw, 48px);
  min-height: 100vh;
  height: auto;
  padding-top: calc(var(--nav-height) + 24px);
  padding-bottom: 60px;
  max-width: 100%;
  width: 100%;
  overflow: visible;
  box-sizing: border-box;

  @media (max-width: 1080px) {
    gap: 28px;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    min-height: auto;
    padding-top: calc(var(--nav-height) + 20px);
    padding-bottom: 48px;
    gap: 28px;
  }

  @media (max-width: 480px) {
    padding-top: calc(var(--nav-height) + 16px);
    padding-bottom: 36px;
    gap: 20px;
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-title {
      animation: none !important;
    }

    .hero-word-inner,
    .hero-summary,
    .hero-accent-line {
      transition: none !important;
      animation: none !important;
      transform: none !important;
      opacity: 1 !important;
      width: 100% !important;
    }
  }
`;

const StyledHeroContent = styled.div`
  flex: 1 1 auto;
  max-width: 560px;
  min-width: 0;
  width: 100%;

  @media (max-width: 900px) {
    max-width: 100%;
    order: 1;
  }

  .hero-title {
    margin: 0;
    color: var(--lightest-slate);
    font-size: clamp(36px, 6.5vw, 68px);
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: -0.02em;

    @media (max-width: 900px) {
      font-size: clamp(30px, 7.5vw, 48px);
    }

    @media (max-width: 480px) {
      font-size: clamp(26px, 8vw, 34px);
      line-height: 1.2;
    }
  }

  .hero-title.is-active {
    animation: ${titleGlow} 5s ease-in-out infinite;
    animation-delay: 1.4s;
  }

  .hero-word {
    display: inline-block;
    overflow: hidden;
    vertical-align: top;
    margin-right: 0.28em;
  }

  .hero-break {
    display: block;
    height: 0;
  }

  .hero-word-inner {
    display: inline-block;
    transform: translate3d(0, 115%, 0) rotate(4deg);
    opacity: 0;
    transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
  }

  .hero-title.is-active .hero-word-inner {
    transform: translate3d(0, 0, 0) rotate(0deg);
    opacity: 1;
  }

  .hero-accent {
    position: relative;
    display: inline-block;
    color: var(--green);
    background: linear-gradient(120deg, var(--green) 0%, var(--blue) 45%, var(--green) 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-title.is-active .hero-accent {
    animation: ${accentShine} 2.8s ease-in-out infinite alternate;
    animation-delay: 1.1s;
  }

  .hero-accent-wrap {
    position: relative;
    display: inline-block;
  }

  .hero-accent-line {
    position: absolute;
    left: 0;
    bottom: 0.08em;
    height: 2px;
    width: 0;
    background: var(--green);
    opacity: 0.7;
    transition: width 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: 0s;
  }

  .hero-title.is-active .hero-accent-line {
    width: 100%;
    transition-delay: 0.95s;
  }

  .hero-summary {
    margin: 28px 0 0;
    max-width: 540px;
    color: var(--slate);
    font-size: var(--fz-xl);
    line-height: 1.45;
    transform: translate3d(0, 28px, 0);
    opacity: 0;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: 0s;

    @media (max-width: 900px) {
      max-width: 100%;
      margin-top: 24px;
    }

    @media (max-width: 480px) {
      margin-top: 20px;
      font-size: var(--fz-lg);
      line-height: 1.5;
    }
  }

  .hero-summary.is-active {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    transition-delay: 0.55s;
  }
`;

const StyledHeroAside = styled.div`
  flex: 0 1 auto;
  width: min(580px, 48vw);
  max-width: 100%;
  min-width: 0;

  @media (max-width: 1080px) {
    width: min(480px, 46vw);
  }

  @media (max-width: 900px) {
    order: 2;
    width: 100%;
    max-width: 520px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const Hero = () => {
  const sectionRef = useRef(null);
  const revealVisual = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsActive(true);
      return;
    }

    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealVisual.current, srConfig(280, 0.2, 'right'));
  }, [prefersReducedMotion]);

  const titleLabel = TITLE_WORDS.map(word => word.text).join(' ');

  return (
    <StyledHeroSection ref={sectionRef}>
      <StyledHeroContent>
        <h1 className={`hero-title${isActive ? ' is-active' : ''}`} aria-label={titleLabel}>
          {TITLE_WORDS.map((word, i) => {
            const delay = i * 70;
            const inner = (
              <span
                className={`hero-word-inner${word.accent ? ' hero-accent' : ''}`}
                style={{ transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms` }}
                aria-hidden="true"
              >
                {word.text}
              </span>
            );

            return (
              <React.Fragment key={`${word.text}-${i}`}>
                <span className="hero-word" aria-hidden="true">
                  {word.accent ? (
                    <span className="hero-accent-wrap">
                      {inner}
                      <span className="hero-accent-line" />
                    </span>
                  ) : (
                    inner
                  )}
                </span>
                {word.breakAfter ? <span className="hero-break" aria-hidden="true" /> : null}
              </React.Fragment>
            );
          })}
        </h1>

        <p className={`hero-summary${isActive ? ' is-active' : ''}`}>
          Senior React Native Engineer and Mobile Team Lead based in Lahore, Pakistan, with 4+ years
          of experience building production mobile applications for iOS and Android. Specialized in
          React Native, Expo, TypeScript, scalable mobile architecture, Firebase, Supabase and
          modern API integrations. Experienced in AI/LLM integration, AI-assisted development,
          payments, real-time features, testing and CI/CD, with a focus on building reliable,
          scalable products.
        </p>
      </StyledHeroContent>

      <StyledHeroAside>
        <div ref={revealVisual}>
          <HeroVisual />
        </div>
      </StyledHeroAside>
    </StyledHeroSection>
  );
};

export default Hero;
