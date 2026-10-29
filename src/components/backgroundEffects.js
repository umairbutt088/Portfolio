import React from 'react';
import styled, { keyframes } from 'styled-components';

const driftA = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  40% { transform: translate3d(4vw, -3vh, 0) scale(1.08); }
  70% { transform: translate3d(-3vw, 2vh, 0) scale(0.96); }
`;

const driftB = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  35% { transform: translate3d(-5vw, 4vh, 0) scale(1.1); }
  65% { transform: translate3d(3vw, -2vh, 0) scale(0.94); }
`;

const driftC = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(2vw, 5vh, 0); }
`;

const floatParticle = keyframes`
  0% { transform: translate3d(0, 20px, 0); opacity: 0; }
  12% { opacity: 0.55; }
  88% { opacity: 0.45; }
  100% { transform: translate3d(0, -110vh, 0); opacity: 0; }
`;

const gridShift = keyframes`
  0% { background-position: 0 0, 0 0; }
  100% { background-position: 48px 48px, -48px 24px; }
`;

const shimmer = keyframes`
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.6; }
`;

const StyledBackground = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  background: radial-gradient(
      ellipse 80% 50% at 10% -10%,
      rgba(100, 255, 218, 0.08),
      transparent 55%
    ),
    radial-gradient(ellipse 70% 45% at 95% 10%, rgba(87, 203, 255, 0.07), transparent 50%),
    radial-gradient(ellipse 60% 40% at 50% 100%, rgba(100, 255, 218, 0.04), transparent 55%),
    var(--navy);

  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    will-change: transform;
  }

  .orb-a {
    width: min(52vw, 480px);
    height: min(52vw, 480px);
    top: -8%;
    left: -6%;
    background: radial-gradient(circle, rgba(100, 255, 218, 0.22) 0%, transparent 70%);
    animation: ${driftA} 22s ease-in-out infinite, ${shimmer} 10s ease-in-out infinite;
  }

  .orb-b {
    width: min(48vw, 420px);
    height: min(48vw, 420px);
    top: 18%;
    right: -10%;
    background: radial-gradient(circle, rgba(87, 203, 255, 0.2) 0%, transparent 70%);
    animation: ${driftB} 26s ease-in-out infinite, ${shimmer} 12s ease-in-out infinite 1s;
  }

  .orb-c {
    width: min(56vw, 520px);
    height: min(56vw, 520px);
    bottom: -12%;
    left: 28%;
    background: radial-gradient(
      circle,
      rgba(100, 255, 218, 0.12) 0%,
      rgba(87, 203, 255, 0.08) 45%,
      transparent 70%
    );
    animation: ${driftC} 30s ease-in-out infinite;
  }

  .grid {
    position: absolute;
    inset: 0;
    opacity: 0.18;
    background-image: linear-gradient(rgba(100, 255, 218, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(87, 203, 255, 0.05) 1px, transparent 1px);
    background-size: 48px 48px, 48px 48px;
    mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 75%);
    animation: ${gridShift} 40s linear infinite;
  }

  .particles {
    position: absolute;
    inset: 0;
  }

  .particle {
    position: absolute;
    bottom: -10px;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 8px rgba(100, 255, 218, 0.55);
    animation: ${floatParticle} linear infinite;
    opacity: 0;

    &:nth-child(odd) {
      background: var(--blue);
      box-shadow: 0 0 8px rgba(87, 203, 255, 0.5);
      width: 2px;
      height: 2px;
    }
  }

  .vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 40%, rgba(2, 12, 27, 0.55) 100%);
  }

  @media (prefers-reduced-motion: reduce) {
    .orb,
    .grid,
    .particle {
      animation: none !important;
    }

    .particle {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .orb {
      filter: blur(48px);
    }

    .grid {
      opacity: 0.12;
    }

    .particle:nth-child(n + 10) {
      display: none;
    }
  }
`;

const PARTICLES = [
  { left: '8%', delay: '0s', duration: '18s' },
  { left: '16%', delay: '3s', duration: '22s' },
  { left: '24%', delay: '7s', duration: '16s' },
  { left: '33%', delay: '1.5s', duration: '20s' },
  { left: '42%', delay: '9s', duration: '24s' },
  { left: '51%', delay: '4s', duration: '19s' },
  { left: '60%', delay: '11s', duration: '21s' },
  { left: '69%', delay: '2s', duration: '17s' },
  { left: '78%', delay: '6s', duration: '23s' },
  { left: '87%', delay: '8s', duration: '18s' },
  { left: '12%', delay: '13s', duration: '25s' },
  { left: '55%', delay: '15s', duration: '20s' },
  { left: '91%', delay: '5s', duration: '22s' },
  { left: '37%', delay: '10s', duration: '16s' },
];

const BackgroundEffects = () => (
  <StyledBackground aria-hidden="true">
    <div className="orb orb-a" />
    <div className="orb orb-b" />
    <div className="orb orb-c" />
    <div className="grid" />
    <div className="particles">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
    <div className="vignette" />
  </StyledBackground>
);

export default BackgroundEffects;
