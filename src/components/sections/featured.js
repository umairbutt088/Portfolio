import React, { useEffect, useRef, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const HEADING_WORDS = [
  { text: 'Some', accent: false },
  { text: 'Things', accent: false },
  { text: 'I\'ve', accent: false },
  { text: 'Built', accent: true },
];

const accentShine = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const stripHtml = html =>
  String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const splitWords = text => text.trim().split(/\s+/).filter(Boolean);

const KineticWords = ({ text, startIndex = 0, prefersReducedMotion, accentWords, className }) => {
  const words = splitWords(text);

  return words.map((word, i) => {
    const clean = word.replace(/[.,;:!?()'"]/g, '');
    const isAccent = accentWords?.has(clean);
    const delay = (startIndex + i) * 40;

    return (
      <span
        className={`kinetic-word ${className || ''}`.trim()}
        key={`${word}-${startIndex + i}`}
        aria-hidden="true"
      >
        <span
          className={`kinetic-word-inner${isAccent ? ' kinetic-accent' : ''}`}
          style={{ transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms` }}
        >
          {word}
        </span>
      </span>
    );
  });
};

KineticWords.propTypes = {
  text: PropTypes.string.isRequired,
  startIndex: PropTypes.number,
  prefersReducedMotion: PropTypes.bool,
  accentWords: PropTypes.instanceOf(Set),
  className: PropTypes.string,
};

const StyledFeaturedSection = styled.section`
  @media (prefers-reduced-motion: reduce) {
    .kinetic-word-inner,
    .kinetic-accent-line,
    .project-tech-list li,
    .project-links,
    .project-image {
      transition: none !important;
      animation: none !important;
      transform: none !important;
      opacity: 1 !important;
      width: auto !important;
    }

    .kinetic-accent-line {
      width: 100% !important;
    }
  }

  .kinetic-word {
    display: inline-block;
    overflow: hidden;
    vertical-align: top;
    margin-right: 0.28em;
  }

  .kinetic-word-inner {
    display: inline-block;
    transform: translate3d(0, 115%, 0) rotate(3deg);
    opacity: 0;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
  }

  .is-active .kinetic-word-inner {
    transform: translate3d(0, 0, 0) rotate(0deg);
    opacity: 1;
  }

  .kinetic-accent-wrap {
    position: relative;
    display: inline-block;
  }

  .kinetic-accent-line {
    position: absolute;
    left: 0;
    bottom: 0.08em;
    height: 2px;
    width: 0;
    background: linear-gradient(90deg, var(--green), var(--blue));
    opacity: 0.85;
    transition: width 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .is-active .kinetic-accent-line {
    width: 100%;
    transition-delay: 0.55s;
  }
`;

const StyledHeading = styled.h2`
  &.numbered-heading {
    margin-bottom: 40px;
  }

  .kinetic-word-inner {
    color: var(--green);
    background: linear-gradient(120deg, var(--green) 0%, var(--blue) 45%, var(--green) 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &.is-active .kinetic-word-inner {
    animation: ${accentShine} 3.2s ease-in-out infinite alternate;
    animation-delay: 0.9s;
  }
`;

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .project-tech-list {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--green);
    font-size: clamp(24px, 5vw, 28px);

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }

    a {
      color: inherit;
    }

    .kinetic-word-inner {
      color: var(--green);
      background: linear-gradient(120deg, var(--green) 0%, var(--blue) 45%, var(--green) 100%);
      background-size: 200% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  &.is-active .project-title .kinetic-word-inner {
    animation: ${accentShine} 3.2s ease-in-out infinite alternate;
    animation-delay: 0.6s;
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    .kinetic-word {
      margin-right: 0.22em;
    }

    .kinetic-accent {
      -webkit-text-fill-color: initial;
      background: none;
      color: var(--white);
    }
  }

  &.is-active .project-description .kinetic-word-inner {
    transform: translate3d(0, 0, 0) rotate(0deg);
    opacity: 1;
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;
    gap: 8px;

    li {
      margin: 0;
      padding: 6px 10px;
      border: 1px solid transparent;
      border-radius: var(--border-radius);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
      line-height: 1.2;
      color: var(--green);
      background: linear-gradient(var(--light-navy), var(--light-navy)) padding-box,
        linear-gradient(120deg, var(--green) 0%, var(--blue) 50%, var(--green) 100%) border-box;
      box-shadow: 0 0 0 0 transparent;
      transform: translate3d(0, 14px, 0);
      opacity: 0;
      transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1),
        opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;

      span {
        background: linear-gradient(120deg, var(--green) 0%, var(--blue) 50%, var(--green) 100%);
        background-size: 200% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        background: linear-gradient(rgba(10, 25, 47, 0.72), rgba(10, 25, 47, 0.72)) padding-box,
          linear-gradient(120deg, var(--green) 0%, var(--blue) 50%, var(--green) 100%) border-box;
      }
    }
  }

  &.is-active .project-tech-list li {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);
    transform: translate3d(0, 16px, 0);
    opacity: 0;
    transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }

  &.is-active .project-links {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;
    transform: translate3d(36px, 0, 0);
    opacity: 0;
    transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1);

    @media (min-width: 769px) {
      align-self: start;

      a {
        /* Taller frame so phone / app screenshots stay readable (was 7/4 + 400px). */
        aspect-ratio: 2 / 3;
        max-height: 600px;
        overflow: hidden;
      }

      .img,
      .img > span {
        height: 100% !important;
      }

      .img img {
        object-fit: cover !important;
        object-position: center center;
        width: 100% !important;
        height: 100% !important;
      }
    }

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      transform: none;
    }

    a {
      width: 100%;
      background-color: var(--green);
      border-radius: var(--border-radius);
      vertical-align: middle;

      @media (max-width: 768px) {
        height: 100%;
      }

      &:hover,
      &:focus {
        background: transparent;
        outline: 0;

        &:before,
        .img {
          background: transparent;
          filter: none;
        }
      }

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: var(--transition);
        background-color: var(--navy);
        mix-blend-mode: screen;
      }
    }

    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);

      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(50%);
      }
    }
  }

  &.is-active .project-image {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    transition-delay: 0.25s;

    @media (max-width: 768px) {
      opacity: 0.25;
      transform: none;
      transition-delay: 0s;
    }
  }

  &:nth-of-type(odd) .project-image {
    transform: translate3d(-36px, 0, 0);
  }

  &:nth-of-type(odd).is-active .project-image {
    transform: translate3d(0, 0, 0);

    @media (max-width: 768px) {
      transform: none;
    }
  }
`;

const FeaturedProject = ({ project, prefersReducedMotion }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const { frontmatter, html } = project;
  const { external, title, tech, github, cover, cta, ios, android } = frontmatter;
  const image = getImage(cover);
  const projectUrl = external || ios || android || github || '#';
  const description = stripHtml(html);
  const overline = 'Featured Project';

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsActive(true);
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.28 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const titleWords = splitWords(title);
  const descWordStart = splitWords(overline).length + titleWords.length + 2;

  return (
    <StyledProject ref={ref} className={isActive ? 'is-active' : undefined}>
      <div className="project-content">
        <div>
          <p className="project-overline" aria-label={overline}>
            <KineticWords text={overline} prefersReducedMotion={prefersReducedMotion} />
          </p>

          <h3 className="project-title">
            <a href={projectUrl} aria-label={title}>
              <KineticWords
                text={title}
                startIndex={3}
                prefersReducedMotion={prefersReducedMotion}
              />
            </a>
          </h3>

          <div className="project-description" aria-label={description}>
            <KineticWords
              text={description}
              startIndex={descWordStart}
              prefersReducedMotion={prefersReducedMotion}
              accentWords={new Set(['push', 'notifications', 'precedents', 'citations', 'AI'])}
            />
          </div>

          {tech.length > 0 && (
            <ul className="project-tech-list">
              {tech.map((item, i) => (
                <li
                  key={i}
                  style={{
                    transitionDelay: prefersReducedMotion
                      ? '0ms'
                      : `${Math.max(420, descWordStart * 40 + 120) + i * 40}ms`,
                  }}
                >
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          <div
            className="project-links"
            style={{
              transitionDelay: prefersReducedMotion
                ? '0ms'
                : `${Math.max(520, descWordStart * 40 + 220)}ms`,
            }}
          >
            {cta && (
              <a href={cta} aria-label="Course Link" className="cta">
                Learn More
              </a>
            )}
            {github && (
              <a href={github} aria-label="GitHub Link">
                <Icon name="GitHub" />
              </a>
            )}
            {ios && (
              <a href={ios} aria-label="Apple App Store Link" target="_blank" rel="noreferrer">
                <Icon name="AppStore" />
              </a>
            )}
            {android && (
              <a
                href={android}
                aria-label="Google Play Store Link"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="PlayStore" />
              </a>
            )}
            {external && !cta && (
              <a href={external} aria-label="External Link" className="external">
                <Icon name="External" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="project-image">
        <a href={projectUrl}>
          <GatsbyImage image={image} alt={title} className="img" />
        </a>
      </div>
    </StyledProject>
  );
};

FeaturedProject.propTypes = {
  project: PropTypes.object.isRequired,
  prefersReducedMotion: PropTypes.bool.isRequired,
};

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, PNG])
                }
              }
              tech
              github
              external
              ios
              android
              cta
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const headingRef = useRef(null);
  const [headingActive, setHeadingActive] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const headingLabel = HEADING_WORDS.map(word => word.text).join(' ');

  useEffect(() => {
    if (prefersReducedMotion) {
      setHeadingActive(true);
      return;
    }

    const node = headingRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeadingActive(entry.isIntersecting);
      },
      { threshold: 0.6 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <StyledFeaturedSection id="projects">
      <StyledHeading
        className={`numbered-heading${headingActive ? ' is-active' : ''}`}
        ref={headingRef}
        aria-label={headingLabel}
      >
        {HEADING_WORDS.map((word, i) => {
          const delay = i * 70;
          const inner = (
            <span
              className={`kinetic-word-inner${word.accent ? ' kinetic-accent' : ''}`}
              style={{ transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms` }}
              aria-hidden="true"
            >
              {word.text}
            </span>
          );

          return (
            <span className="kinetic-word" key={`${word.text}-${i}`} aria-hidden="true">
              {word.accent ? (
                <span className="kinetic-accent-wrap">
                  {inner}
                  <span className="kinetic-accent-line" />
                </span>
              ) : (
                inner
              )}
            </span>
          );
        })}
      </StyledHeading>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => (
            <FeaturedProject key={i} project={node} prefersReducedMotion={prefersReducedMotion} />
          ))}
      </StyledProjectsGrid>
    </StyledFeaturedSection>
  );
};

export default Featured;
