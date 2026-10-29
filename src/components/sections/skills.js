import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const tagEnter = keyframes`
  0% {
    opacity: 0;
    transform: translateY(14px) scale(0.94);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

/* Enter animation targets the face so the outer hit box stays still */

const accentDraw = keyframes`
  0% { width: 0; opacity: 0; }
  100% { width: 72px; opacity: 1; }
`;

const SKILL_GROUPS = [
  {
    title: 'Mobile and web',
    items: [
      'React Native',
      'JavaScript',
      'TypeScript',
      'CSS',
      'Functional Components',
      'React.js',
      'Next.js',
      'HTML',
      'Native Modules',
      'Expo',
      'Debug Software',
    ],
  },
  {
    title: 'Backend and integrations',
    items: [
      'MongoDB',
      'MySQL',
      'Node.js',
      'Firebase Firestore',
      'Firebase Auth',
      'Firebase Storage',
      'Realtime Database',
      'Nest.js',
      'Socket.io',
      'REST API',
      'Supabase',
    ],
  },
  {
    title: 'AI and LLMs',
    items: ['AI Chatbots', 'LLM Integration'],
  },
  {
    title: 'Architecture and state',
    items: ['Redux / Redux Toolkit', 'Zustand', 'Git', 'Context API'],
  },
  {
    title: 'Payments',
    items: ['RevenueCat', 'In-App Purchases', 'Stripe Payments'],
  },
  {
    title: 'Testing and release',
    items: ['Jest', 'Google Analytics', 'Maestro UI Testing', 'Crashlytics'],
  },
];

const StyledSkillsSection = styled.section`
  max-width: 1000px;

  .section-heading {
    margin: 10px 0 12px;
  }

  .heading-accent {
    display: block;
    width: 72px;
    height: 3px;
    margin: 0 0 40px;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--green) 0%, var(--blue) 100%);
  }

  &.is-visible .heading-accent {
    animation: ${accentDraw} 0.7s ease forwards;
  }

  &.is-visible .tag-face {
    animation: ${tagEnter} 0.55s cubic-bezier(0.22, 1, 0.36, 1) backwards;
    animation-delay: calc(var(--tag-i, 0) * 40ms);
  }

  @media (prefers-reduced-motion: reduce) {
    &.is-visible .heading-accent,
    &.is-visible .tag-face {
      animation: none;
    }
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px 28px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px 22px;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  min-width: 0;

  .group + .group {
    padding-top: 22px;
    border-top: 1px solid rgba(100, 255, 218, 0.16);
  }

  .group-title {
    margin: 0 0 12px;
    color: var(--green);
    font-size: var(--fz-xl);
    font-weight: 600;
    line-height: 1.3;
    background: linear-gradient(120deg, var(--green) 0%, var(--blue) 45%, var(--green) 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 8px;
    margin: 0;
    padding: 4px 2px 12px 10px;
    list-style: none;
    overflow: visible;
  }

  /*
   * 3D social tiles — horizontal.
   * Outer .tag is a STABLE hit area (never transforms).
   * Inner .tag-face moves on hover so the cursor can't leave the hit box
   * and cause infinite hover flicker at the bottom/edge.
   */
  .tag {
    list-style: none;
    position: relative;
    display: block;
    height: 42px;
    padding: 0 0 8px 8px;
    margin: 0;
    background: transparent;
    border: none;
    box-shadow: none;
    cursor: default;
    z-index: 1;
    box-sizing: border-box;

    @media (max-width: 480px) {
      height: 38px;
      padding: 0 0 6px 6px;
    }

    .tag-face {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
      width: 100%;
      padding: 0 14px;
      border-radius: 4px;
      background: linear-gradient(
        145deg,
        rgba(17, 34, 64, 0.98) 0%,
        rgba(35, 53, 84, 0.95) 55%,
        rgba(17, 34, 64, 0.98) 100%
      );
      box-shadow: -10px 10px 8px rgba(2, 12, 27, 0.4), inset 0 0 0 1px rgba(100, 255, 218, 0.18);
      box-sizing: border-box;
      transform: translate(0, 0);
      transition: transform 0.5s ease, box-shadow 0.5s ease, background 0.5s ease;

      @media (max-width: 480px) {
        height: 32px;
        padding: 0 12px;
      }
    }

    .tag-label {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      margin: 0;
      padding: 0;
      font-size: var(--fz-xs);
      font-family: var(--font-sans);
      font-weight: 600;
      line-height: 1;
      letter-spacing: 0.02em;
      white-space: nowrap;
      transform: translateY(1px);
      color: var(--green);
      background: linear-gradient(120deg, var(--green) 0%, var(--blue) 50%, var(--green) 100%);
      background-size: 200% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      transition: letter-spacing 0.5s ease, filter 0.5s ease;

      @media (max-width: 480px) {
        font-size: 11px;
      }
    }

    /* Left 3D wall */
    .tag-face::before {
      content: '';
      position: absolute;
      top: 5px;
      left: -10px;
      height: 100%;
      width: 10px;
      background: linear-gradient(180deg, #1d3d4a 0%, #16304a 100%);
      transform: skewY(-45deg);
      transition: background 0.5s ease;
    }

    /* Bottom 3D wall */
    .tag-face::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: -5px;
      height: 10px;
      width: 100%;
      background: linear-gradient(90deg, #1a3850 0%, #245a6a 100%);
      transform: skewX(-45deg);
      transition: background 0.5s ease;
    }

    &:hover,
    &:focus-visible {
      outline: none;
      z-index: 5;

      .tag-face {
        background: linear-gradient(120deg, var(--green) 0%, var(--blue) 55%, var(--green) 100%);
        box-shadow: -28px 28px 24px rgba(2, 12, 27, 0.5), 0 0 22px rgba(100, 255, 218, 0.22);
        transform: translate(14px, -12px);

        @media (max-width: 480px) {
          transform: translate(10px, -10px);
        }

        &::before {
          background: linear-gradient(180deg, #3db89a 0%, #2a8fb8 100%);
        }

        &::after {
          background: linear-gradient(90deg, #4fd0b8 0%, #6ec8ef 100%);
        }
      }

      .tag-label {
        color: var(--navy);
        background: none;
        -webkit-text-fill-color: var(--navy);
        letter-spacing: 0.04em;
        filter: none;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .tag-face {
        transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
      }

      &:hover .tag-face,
      &:focus-visible .tag-face {
        transform: none;
        box-shadow: -10px 10px 8px rgba(2, 12, 27, 0.4);
      }
    }
  }
`;

const Skills = () => {
  const revealContainer = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    sr.reveal(revealContainer.current, srConfig(120, 0.15, 'bottom'));

    const node = revealContainer.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const columns = [SKILL_GROUPS.slice(0, 2), SKILL_GROUPS.slice(2, 4), SKILL_GROUPS.slice(4, 6)];

  let tagIndex = 0;

  return (
    <StyledSkillsSection
      id="skills"
      ref={revealContainer}
      className={isVisible ? 'is-visible' : undefined}
    >
      <h2 className="numbered-heading section-heading">What I Work With</h2>
      <span className="heading-accent" aria-hidden="true" />

      <StyledGrid>
        {columns.map((groups, columnIndex) => (
          <StyledColumn key={columnIndex}>
            {groups.map(group => (
              <div className="group" key={group.title}>
                <h3 className="group-title">{group.title}</h3>
                <ul className="tags">
                  {group.items.map(item => {
                    const i = tagIndex;
                    tagIndex += 1;
                    return (
                      <li className="tag" key={item} style={{ ['--tag-i']: i }}>
                        <div className="tag-face">
                          <span className="tag-label">{item}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </StyledColumn>
        ))}
      </StyledGrid>
    </StyledSkillsSection>
  );
};

export default Skills;
