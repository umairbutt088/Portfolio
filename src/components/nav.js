/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { css, keyframes } from 'styled-components';
import { navLinks } from '@config';
import { loaderDelay, scrollToHash } from '@utils';
import { useScrollDirection, usePrefersReducedMotion } from '@hooks';
import { Menu } from '@components';

/* Wavy menu line — seamless repeating wave that scrolls for the whole hover.
   Colors match hero “AI-powered” gradient: green (#64ffda) → blue (#57cbff). */
const WAVE_TILE = 120;

const wavyLineScroll = keyframes`
  from {
    -webkit-mask-position: 0 50%;
    mask-position: 0 50%;
  }
  to {
    -webkit-mask-position: -${WAVE_TILE}px 50%;
    mask-position: -${WAVE_TILE}px 50%;
  }
`;

const accentShine = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

/* Black stroke used as a CSS mask so the teal→blue gradient paints the wave */
const WAVY_LINE_MASK = `url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${WAVE_TILE}' height='18' viewBox='0 0 ${WAVE_TILE} 18'%3E%3Cpath fill='none' stroke='%23000' stroke-width='2.5' d='M0 11c10 0 10-8 20-8s10 8 20 8 10-8 20-8 10 8 20 8 10-8 20-8 10 8 20 8'/%3E%3C/svg%3E")`;

const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  height: var(--nav-height);
  background-color: rgba(10, 25, 47, 0.85);
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  backdrop-filter: blur(10px);
  transition: var(--transition);

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }

  @media (prefers-reduced-motion: no-preference) {
    ${props =>
      props.scrollDirection === 'up' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        background-color: rgba(10, 25, 47, 0.85);
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};

    ${props =>
      props.scrollDirection === 'down' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) * -1));
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};
  }
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: var(--lightest-slate);
  z-index: 12;

  .brand {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 0;

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      gap: 14px;
      text-decoration: none;
      color: inherit;
      min-width: 0;

      @media (max-width: 480px) {
        gap: 10px;
      }
    }

    .avatar {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      padding: 2px;
      background: linear-gradient(135deg, var(--green) 0%, var(--blue) 55%, var(--green) 100%);
      box-shadow: 0 0 16px rgba(100, 255, 218, 0.28);

      @media (max-width: 480px) {
        width: 42px;
        height: 42px;
      }

      .avatar-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid var(--navy);
        background: var(--light-navy);

        .gatsby-image-wrapper {
          width: 100%;
          height: 100%;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 18%;
        }
      }
    }

    .brand-text {
      display: flex;
      flex-direction: column;
      gap: 3px;
      min-width: 0;
    }

    .brand-name {
      color: var(--lightest-slate);
      font-family: var(--font-sans);
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.15;
      white-space: nowrap;
      transition: color 0.35s var(--easing), filter 0.35s var(--easing);

      @media (max-width: 1080px) {
        font-size: 20px;
      }

      @media (max-width: 480px) {
        font-size: 18px;
        max-width: 46vw;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .brand-title {
      color: var(--slate);
      font-family: var(--font-sans);
      font-size: 13px;
      font-weight: 500;
      line-height: 1.2;
      white-space: nowrap;

      @media (max-width: 900px) {
        font-size: 12px;
      }

      @media (max-width: 600px) {
        display: none;
      }
    }

    a:hover,
    a:focus-visible {
      outline: 0;

      .brand-name {
        color: var(--green);
        background: linear-gradient(120deg, var(--green) 0%, var(--blue) 45%, var(--green) 100%);
        background-size: 200% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: ${accentShine} 2.8s ease-in-out infinite alternate;
      }

      .avatar {
        background: linear-gradient(135deg, var(--green) 0%, var(--blue) 55%, var(--green) 100%);
        box-shadow: 0 0 20px rgba(100, 255, 218, 0.4);
      }
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 2px;
      position: relative;
      font-family: var(--font-sans);
      font-size: var(--fz-sm);
      font-weight: 600;

      a {
        position: relative;
        display: inline-block;
        padding: 10px 12px 18px;
        /* Keep a real fill on the <a> so clicks don't fall through transparent gradient text */
        color: var(--green);
        transition: filter 0.35s var(--easing);

        .nav-text {
          background: linear-gradient(120deg, var(--green) 0%, var(--blue) 45%, var(--green) 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: ${accentShine} 3.5s ease-in-out infinite alternate;
        }

        &::after {
          content: '';
          position: absolute;
          left: 6px;
          right: 6px;
          bottom: 2px;
          height: 14px;
          background: linear-gradient(90deg, var(--green) 0%, var(--blue) 50%, var(--green) 100%);
          background-size: 200% 100%;
          -webkit-mask-image: ${WAVY_LINE_MASK};
          mask-image: ${WAVY_LINE_MASK};
          -webkit-mask-repeat: repeat-x;
          mask-repeat: repeat-x;
          -webkit-mask-size: ${WAVE_TILE}px 14px;
          mask-size: ${WAVE_TILE}px 14px;
          -webkit-mask-position: 0 50%;
          mask-position: 0 50%;
          opacity: 0;
          pointer-events: none;
        }

        &:hover,
        &:focus-visible {
          filter: brightness(1.15);

          &::after {
            opacity: 1;
            animation: ${wavyLineScroll} 1.1s linear infinite,
              ${accentShine} 2.4s ease-in-out infinite alternate;
          }
        }
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    ol li a .nav-text {
      animation: none;
    }

    ol li a {
      &:hover::after,
      &:focus-visible::after {
        animation: none;
        opacity: 1;
      }
    }
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 12px;
    font-size: var(--fz-xs);
    /* Header is translucent — match navy fill so the gradient border reads cleanly */
    background: linear-gradient(rgba(10, 25, 47, 0.95), rgba(10, 25, 47, 0.95)) padding-box,
      linear-gradient(120deg, var(--green) 0%, var(--blue) 50%, var(--green) 100%) border-box;
  }
`;

const Nav = ({ isHome }) => {
  const [isMounted, setIsMounted] = useState(!isHome);
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const timeout = isHome ? loaderDelay : 0;
  const fadeClass = isHome ? 'fade' : '';
  const fadeDownClass = isHome ? 'fadedown' : '';

  const BrandMark = (
    <>
      <div className="avatar">
        <div className="avatar-img">
          <StaticImage
            src="../images/umair-avatar.jpg"
            width={96}
            height={96}
            quality={95}
            formats={['AUTO', 'WEBP', 'AVIF']}
            alt="Muhammad Umair Butt"
            placeholder="none"
            objectFit="cover"
            objectPosition="50% 18%"
          />
        </div>
      </div>
      <div className="brand-text">
        <span className="brand-name">Muhammad Umair Butt</span>
        <span className="brand-title">Senior React Native Engineer | Mobile Team Lead</span>
      </div>
    </>
  );

  const Brand = (
    <div className="brand" tabIndex="-1">
      {isHome ? (
        <a href="/" aria-label="Home — Muhammad Umair Butt">
          {BrandMark}
        </a>
      ) : (
        <Link to="/" aria-label="Home — Muhammad Umair Butt">
          {BrandMark}
        </Link>
      )}
    </div>
  );

  const ResumeLink = (
    <a className="resume-button" href="/resume_cv.pdf" target="_blank" rel="noopener noreferrer">
      <span className="btn-text">Resume</span>
    </a>
  );

  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      <StyledNav>
        {prefersReducedMotion ? (
          <>
            {Brand}

            <StyledLinks>
              <ol>
                {navLinks &&
                  navLinks.map(({ url, name }, i) => (
                    <li key={i}>
                      <a href={url} onClick={e => scrollToHash(e, url)}>
                        <span className="nav-text">{name}</span>
                      </a>
                    </li>
                  ))}
              </ol>
              <div>{ResumeLink}</div>
            </StyledLinks>

            <Menu />
          </>
        ) : (
          <>
            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition classNames={fadeClass} timeout={timeout}>
                  <>{Brand}</>
                </CSSTransition>
              )}
            </TransitionGroup>

            <StyledLinks>
              <ol>
                <TransitionGroup component={null}>
                  {isMounted &&
                    navLinks &&
                    navLinks.map(({ url, name }, i) => (
                      <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>
                        <li key={i} style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                          <a href={url} onClick={e => scrollToHash(e, url)}>
                            <span className="nav-text">{name}</span>
                          </a>
                        </li>
                      </CSSTransition>
                    ))}
                </TransitionGroup>
              </ol>

              <TransitionGroup component={null}>
                {isMounted && (
                  <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                    <div style={{ transitionDelay: `${isHome ? navLinks.length * 100 : 0}ms` }}>
                      {ResumeLink}
                    </div>
                  </CSSTransition>
                )}
              </TransitionGroup>
            </StyledLinks>

            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition classNames={fadeClass} timeout={timeout}>
                  <Menu />
                </CSSTransition>
              )}
            </TransitionGroup>
          </>
        )}
      </StyledNav>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
};

export default Nav;
