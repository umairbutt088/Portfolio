import React, { useEffect, useRef, useState } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled, { keyframes } from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';

const HEADING_WORDS = [
  { text: 'About', accent: false },
  { text: 'Me', accent: true },
];

const PARAGRAPHS = [
  `I’m a Senior React Native Engineer and Mobile Team Lead with 8.5+ years of experience building scalable, production-ready mobile applications for iOS and Android. I specialize in React Native, Expo, TypeScript and modern mobile architecture, with hands-on experience across Firebase, Supabase, REST APIs, GraphQL, real-time systems, payments and third-party integrations.`,
  `My recent work focuses on bringing AI and Large Language Models into mobile products, from intelligent features and AI-powered user experiences to practical LLM integrations. I also leverage AI-assisted development to accelerate code generation, refactoring, debugging, testing and documentation while maintaining strong engineering standards.`,
  `I approach mobile development with a balance of technical depth and product thinking. I care about architecture, performance, usability and maintainability, and enjoy turning complex ideas into reliable products that can evolve and scale in production. Alongside hands-on development, I lead mobile initiatives, mentor developers and contribute to code quality, testing and CI/CD.`,
];

const ACCENT_WORDS = new Set([
  'AI',
  'AI-powered',
  'React',
  'Native',
  'TypeScript',
  'LLM',
  'Large',
  'Language',
  'Models',
]);

const accentShine = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .about-word-inner,
    .about-accent-line,
    .about-pic {
      transition: none !important;
      animation: none !important;
      transform: none !important;
      opacity: 1 !important;
      width: 100% !important;
    }
  }
`;

const StyledHeading = styled.h2`
  &.numbered-heading {
    margin-bottom: 40px;
  }

  .about-word {
    display: inline-block;
    overflow: hidden;
    vertical-align: top;
    margin-right: 0.28em;
  }

  .about-word-inner {
    display: inline-block;
    transform: translate3d(0, 115%, 0) rotate(4deg);
    opacity: 0;
    color: var(--green);
    background: linear-gradient(120deg, var(--green) 0%, var(--blue) 45%, var(--green) 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
  }

  &.is-active .about-word-inner {
    transform: translate3d(0, 0, 0) rotate(0deg);
    opacity: 1;
    animation: ${accentShine} 3.2s ease-in-out infinite alternate;
    animation-delay: 0.8s;
  }

  .about-accent-wrap {
    position: relative;
    display: inline-block;
  }

  .about-accent-line {
    position: absolute;
    left: 0;
    bottom: 0.08em;
    height: 2px;
    width: 0;
    background: linear-gradient(90deg, var(--green), var(--blue));
    opacity: 0.85;
    transition: width 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &.is-active .about-accent-line {
    width: 100%;
    transition-delay: 0.55s;
  }
`;

const StyledText = styled.div`
  .about-copy p {
    margin: 0 0 15px;
  }

  .about-word {
    display: inline-block;
    overflow: hidden;
    vertical-align: top;
    margin-right: 0.22em;
  }

  .about-word-inner {
    display: inline-block;
    transform: translate3d(0, 110%, 0) rotate(2deg);
    opacity: 0;
    transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
  }

  &.is-active .about-word-inner {
    transform: translate3d(0, 0, 0) rotate(0deg);
    opacity: 1;
  }

  .about-accent {
    color: var(--green);
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;
  transform: translate3d(40px, 0, 0);
  opacity: 0;
  transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0s;

  &.is-active {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    transition-delay: 0.35s;
  }

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const splitWords = text => text.trim().split(/\s+/).filter(Boolean);

const AnimatedWords = ({ text, startIndex = 0, prefersReducedMotion, accentWords }) => {
  const words = splitWords(text);

  return words.map((word, i) => {
    const clean = word.replace(/[.,;:!?]/g, '');
    const isAccent = accentWords?.has(clean);
    const delay = (startIndex + i) * 18;

    return (
      <span className="about-word" key={`${word}-${startIndex + i}`} aria-hidden="true">
        <span
          className={`about-word-inner${isAccent ? ' about-accent' : ''}`}
          style={{ transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms` }}
        >
          {word}
        </span>
      </span>
    );
  });
};

const About = () => {
  const sectionRef = useRef(null);
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
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const headingLabel = HEADING_WORDS.map(word => word.text).join(' ');
  let wordCursor = 0;

  return (
    <StyledAboutSection id="about" ref={sectionRef}>
      <StyledHeading
        className={`numbered-heading${isActive ? ' is-active' : ''}`}
        aria-label={headingLabel}
      >
        {HEADING_WORDS.map((word, i) => {
          const delay = i * 70;
          const inner = (
            <span
              className={`about-word-inner${word.accent ? ' about-accent' : ''}`}
              style={{ transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms` }}
              aria-hidden="true"
            >
              {word.text}
            </span>
          );

          return (
            <span className="about-word" key={`${word.text}-${i}`} aria-hidden="true">
              {word.accent ? (
                <span className="about-accent-wrap">
                  {inner}
                  <span className="about-accent-line" />
                </span>
              ) : (
                inner
              )}
            </span>
          );
        })}
      </StyledHeading>

      <div className="inner">
        <StyledText className={isActive ? 'is-active' : undefined}>
          <div className="about-copy">
            {PARAGRAPHS.map((paragraph, paragraphIndex) => {
              const startIndex = wordCursor + 6;
              const wordCount = splitWords(paragraph).length;
              wordCursor += wordCount;

              return (
                <p key={paragraphIndex} aria-label={paragraph}>
                  <AnimatedWords
                    text={paragraph}
                    startIndex={startIndex}
                    prefersReducedMotion={prefersReducedMotion}
                    accentWords={ACCENT_WORDS}
                  />
                </p>
              );
            })}
          </div>
        </StyledText>

        <StyledPic className={`about-pic${isActive ? ' is-active' : ''}`}>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/umair-avatar.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Muhammad Umair Butt"
              objectFit="cover"
              objectPosition="50% 20%"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
