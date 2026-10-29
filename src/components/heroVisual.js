import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-18px) translateX(4px); }
`;

const floatAlt = keyframes`
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-14px) translateX(-5px); }
`;

const dash = keyframes`
  to { stroke-dashoffset: -48; }
`;

const flowDash = keyframes`
  to { stroke-dashoffset: -72; }
`;

const orbitSpin = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
`;

const orbitPulse = keyframes`
  0%, 100% {
    opacity: 0.55;
    filter: drop-shadow(0 0 8px rgba(100, 255, 218, 0.25));
  }
  50% {
    opacity: 0.95;
    filter: drop-shadow(0 0 22px rgba(100, 255, 218, 0.55));
  }
`;

const tagPulse = keyframes`
  0%, 100% {
    filter: brightness(1);
    box-shadow:
      0 10px 24px rgba(0, 0, 0, 0.35),
      0 0 14px var(--tag-glow);
  }
  50% {
    filter: brightness(1.15);
    box-shadow:
      0 12px 28px rgba(0, 0, 0, 0.4),
      0 0 28px var(--tag-glow),
      0 0 40px var(--tag-glow);
  }
`;

const StyledHeroVisual = styled.div`
  position: relative;
  width: 100%;
  max-width: 580px;
  height: 500px;
  margin: 0 auto;
  flex-shrink: 0;
  pointer-events: none;
  user-select: none;

  @media (max-width: 1080px) {
    max-width: 500px;
    height: 450px;
  }

  @media (max-width: 900px) {
    max-width: 520px;
    height: 400px;
    margin-top: 8px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    height: 360px;
    margin-top: 4px;

    .hide-sm {
      display: none !important;
    }

    .tag-rn {
      top: 2% !important;
      left: 6% !important;
    }

    .tag-ios {
      top: 3% !important;
      right: 4% !important;
      left: auto !important;
    }

    .tag-ts {
      top: auto !important;
      bottom: 10% !important;
      left: 3% !important;
    }

    .tag-ai {
      bottom: 8% !important;
      left: auto !important;
      right: 6% !important;
    }
  }

  @media (max-width: 480px) {
    height: 300px;

    .hide-xs {
      display: none !important;
    }

    .tag-rn {
      top: 1% !important;
      left: 2% !important;
    }

    .tag-ios {
      top: 2% !important;
      right: 2% !important;
    }

    .tag-ts {
      bottom: 6% !important;
      left: 1% !important;
    }

    .tag-ai {
      bottom: 5% !important;
      right: 2% !important;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .phone,
    .code,
    .tag,
    .panel,
    .ai-chip,
    .chart,
    .orbit,
    .tag-network path,
    .tag-network .dot {
      animation: none !important;
    }
  }
`;

const Stage = styled.div`
  position: absolute;
  inset: 0;
  overflow: visible;
  background: transparent;
  border: none;
  box-shadow: none;
`;

const GlowBackdrop = styled.div`
  position: absolute;
  inset: -18% -16%;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(
      ellipse 58% 54% at 64% 40%,
      rgba(255, 105, 180, 0.38),
      transparent 70%
    ),
    radial-gradient(ellipse 54% 52% at 30% 60%, rgba(56, 189, 248, 0.4), transparent 72%),
    radial-gradient(ellipse 42% 38% at 78% 20%, rgba(244, 114, 182, 0.26), transparent 74%),
    radial-gradient(ellipse 40% 36% at 16% 26%, rgba(100, 255, 218, 0.22), transparent 76%);
  filter: blur(8px);
  -webkit-mask-image: radial-gradient(ellipse 74% 70% at 50% 48%, #000 12%, transparent 80%);
  mask-image: radial-gradient(ellipse 74% 70% at 50% 48%, #000 12%, transparent 80%);

  &::after {
    content: '';
    position: absolute;
    inset: 14% 18%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255, 182, 213, 0.26) 0%,
      rgba(100, 255, 218, 0.2) 38%,
      rgba(125, 211, 252, 0.18) 55%,
      transparent 72%
    );
    filter: blur(36px);
  }

  @media (max-width: 768px) {
    inset: -10% -8%;
    opacity: 0.9;
  }

  @media (max-width: 480px) {
    inset: -6% -4%;
    opacity: 0.8;
  }
`;

const Orbit = styled.svg`
  position: absolute;
  top: 50%;
  left: 55%;
  width: 420px;
  height: 420px;
  transform: translate(-50%, -50%);
  z-index: 1;
  opacity: 0.75;
  animation: ${orbitSpin} 18s linear infinite, ${orbitPulse} 3.6s ease-in-out infinite;
  transform-origin: center;
  will-change: transform, filter;

  @media (max-width: 900px) {
    width: 360px;
    height: 360px;
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
    left: 50%;
  }

  @media (max-width: 480px) {
    width: 250px;
    height: 250px;
  }

  .track {
    fill: none;
    stroke: rgba(168, 178, 209, 0.22);
    stroke-width: 1.2;
    stroke-dasharray: 6 8;
  }

  .glow-ring {
    fill: none;
    stroke: url(#orbitGlow);
    stroke-width: 3.5;
    stroke-linecap: round;
    stroke-dasharray: 90 340;
    filter: drop-shadow(0 0 10px rgba(100, 255, 218, 0.65));
  }

  .glow-ring-soft {
    fill: none;
    stroke: rgba(87, 203, 255, 0.35);
    stroke-width: 8;
    stroke-linecap: round;
    stroke-dasharray: 70 360;
    stroke-dashoffset: 120;
    filter: blur(4px);
  }
`;

const Phone = styled.div`
  position: absolute;
  top: 7%;
  left: 48%;
  width: 168px;
  height: 340px;
  border-radius: 28px;
  background: #0a0f1a;
  border: 2px solid #2a3548;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.55), 0 0 40px rgba(139, 92, 246, 0.15);
  overflow: hidden;
  z-index: 4;
  animation: ${float} 5.2s ease-in-out infinite;

  @media (max-width: 900px) {
    left: 50%;
    margin-left: -75px;
    width: 150px;
    height: 300px;
    border-radius: 24px;
  }

  @media (max-width: 768px) {
    top: 10%;
    margin-left: -68px;
    width: 136px;
    height: 275px;
    border-radius: 22px;
  }

  @media (max-width: 480px) {
    top: 8%;
    margin-left: -60px;
    width: 120px;
    height: 245px;
    border-radius: 18px;
  }

  .notch {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 10px;
    background: #000;
    border-radius: 20px;
    z-index: 3;

    @media (max-width: 480px) {
      height: 7px;
      top: 6px;
    }
  }

  .screen {
    height: 100%;
    background: #0d1526;
    display: flex;
    flex-direction: column;
  }

  .top {
    padding: 28px 10px 10px;
    background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #a855f7 100%);

    @media (max-width: 768px) {
      padding: 22px 8px 8px;
    }

    @media (max-width: 480px) {
      padding: 18px 6px 6px;
    }

    .hello {
      margin: 0;
      color: rgba(255, 255, 255, 0.85);
      font-size: 9px;

      @media (max-width: 480px) {
        font-size: 7px;
      }
    }

    .brand {
      margin: 2px 0 8px;
      color: #fff;
      font-size: 15px;
      font-weight: 800;

      @media (max-width: 768px) {
        font-size: 12px;
      }

      @media (max-width: 480px) {
        font-size: 10px;
        margin-bottom: 5px;
      }
    }

    .search {
      height: 22px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.22);
      border: 1px solid rgba(255, 255, 255, 0.2);

      @media (max-width: 480px) {
        height: 16px;
        border-radius: 6px;
      }
    }
  }

  .chips {
    display: flex;
    gap: 4px;
    padding: 8px 8px 0;
    overflow: hidden;

    @media (max-width: 480px) {
      padding: 5px 5px 0;
      gap: 3px;
    }

    span {
      flex-shrink: 0;
      padding: 3px 7px;
      border-radius: 999px;
      background: rgba(35, 53, 84, 0.9);
      color: var(--light-slate);
      font-size: 8px;

      @media (max-width: 480px) {
        font-size: 6px;
        padding: 2px 5px;
      }

      &.on {
        background: rgba(99, 102, 241, 0.35);
        color: #c4b5fd;
        border: 1px solid rgba(167, 139, 250, 0.4);
      }
    }
  }

  .cards {
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;

    @media (max-width: 480px) {
      padding: 5px;
      gap: 4px;
    }
  }

  .card {
    position: relative;
    height: 58px;
    border-radius: 10px;
    overflow: hidden;
    background: linear-gradient(135deg, #1e3a5f, #312e81);

    @media (max-width: 768px) {
      height: 44px;
      border-radius: 8px;
    }

    @media (max-width: 480px) {
      height: 36px;
      border-radius: 6px;
    }

    &.bali {
      background: linear-gradient(135deg, #0f766e, #1e3a8a);
    }

    .label {
      position: absolute;
      left: 8px;
      bottom: 6px;
      color: #fff;
      font-size: 10px;
      font-weight: 700;

      @media (max-width: 480px) {
        font-size: 8px;
        left: 5px;
        bottom: 4px;
      }
    }

    .badge {
      position: absolute;
      top: 5px;
      right: 5px;
      padding: 2px 5px;
      border-radius: 999px;
      background: rgba(168, 85, 247, 0.9);
      color: #fff;
      font-size: 7px;
      font-weight: 600;

      @media (max-width: 480px) {
        font-size: 5px;
        padding: 1px 3px;
        top: 3px;
        right: 3px;
      }
    }
  }

  .tabbar {
    display: flex;
    justify-content: space-around;
    padding: 8px 4px 12px;
    border-top: 1px solid rgba(35, 53, 84, 0.8);

    @media (max-width: 480px) {
      padding: 5px 2px 8px;
    }

    span {
      width: 14px;
      height: 14px;
      border-radius: 4px;
      background: rgba(136, 146, 176, 0.25);

      @media (max-width: 480px) {
        width: 10px;
        height: 10px;
      }

      &.active {
        background: #818cf8;
        box-shadow: 0 0 8px rgba(129, 140, 248, 0.6);
      }
    }
  }
`;

const CodeWindow = styled.div`
  position: absolute;
  top: 22%;
  left: 3%;
  width: 250px;
  border-radius: 12px;
  background: rgba(13, 21, 38, 0.92);
  border: 1px solid rgba(99, 102, 241, 0.35);
  box-shadow: 0 22px 45px rgba(0, 0, 0, 0.5), 0 0 28px rgba(99, 102, 241, 0.12);
  overflow: hidden;
  z-index: 5;
  backdrop-filter: blur(10px);
  animation: ${floatAlt} 6.5s ease-in-out infinite;
  animation-delay: 0.2s;

  @media (max-width: 900px) {
    width: 200px;
    top: 24%;
    left: 2%;
  }

  @media (max-width: 768px) {
    width: 170px;
    top: 26%;
    left: 1%;
  }

  @media (max-width: 480px) {
    width: 148px;
    border-radius: 9px;
    top: 30%;
    left: 0;
  }

  .bar {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px 10px;
    background: rgba(17, 34, 64, 0.95);
    border-bottom: 1px solid rgba(35, 53, 84, 0.9);

    @media (max-width: 480px) {
      padding: 6px 7px;
      gap: 3px;
    }

    i {
      width: 7px;
      height: 7px;
      border-radius: 50%;

      @media (max-width: 480px) {
        width: 5px;
        height: 5px;
      }

      &.r {
        background: #ff5f56;
      }
      &.y {
        background: #ffbd2e;
      }
      &.g {
        background: #27c93f;
      }
    }

    span {
      margin-left: 6px;
      color: var(--slate);
      font-family: var(--font-mono);
      font-size: 10px;

      @media (max-width: 480px) {
        font-size: 8px;
        margin-left: 3px;
      }
    }
  }

  pre {
    margin: 0;
    padding: 10px 12px 12px;
    font-family: var(--font-mono);
    font-size: 10px;
    line-height: 1.55;
    color: var(--lightest-slate);

    @media (max-width: 768px) {
      font-size: 8.5px;
      padding: 8px 9px 10px;
    }

    @media (max-width: 480px) {
      font-size: 7px;
      padding: 6px 7px 8px;
      line-height: 1.45;
    }
  }

  .kw {
    color: #c792ea;
  }
  .fn {
    color: #82aaff;
  }
  .var {
    color: #eeffff;
  }
  .str {
    color: #c3e88d;
  }
  .cm {
    color: #546e7a;
  }
  .op {
    color: var(--slate);
  }
`;

const TagNetwork = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 6;
  pointer-events: none;
  overflow: visible;

  .link {
    fill: none;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-dasharray: 8 10;
    animation: ${flowDash} 0.9s linear infinite;
    opacity: 0.9;
  }

  .dot {
    filter: url(#dotGlow);
  }
`;

const Tag = styled.div`
  --tag-glow: ${({ $glow }) => $glow};
  position: absolute;
  z-index: 7;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 11px;
  border-radius: 999px;
  background: rgba(17, 34, 64, 0.88);
  border: 1px solid ${({ $border }) => $border};
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35), 0 0 18px ${({ $glow }) => $glow};
  color: var(--lightest-slate);
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  backdrop-filter: blur(8px);
  animation: ${float} ${({ $dur }) => $dur || '5.5s'} ease-in-out infinite,
    ${tagPulse} 3.6s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay || '0s'}, ${({ $pulseDelay }) => $pulseDelay || '0s'};

  @media (max-width: 768px) {
    padding: 5px 8px;
    font-size: 9px;
    gap: 5px;
  }

  @media (max-width: 480px) {
    padding: 4px 6px;
    font-size: 8px;
    gap: 4px;
  }

  svg,
  .mark {
    width: 14px;
    height: 14px;
    flex-shrink: 0;

    @media (max-width: 480px) {
      width: 11px;
      height: 11px;
    }
  }

  .mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    font-size: 7px;
    font-weight: 800;
    font-family: var(--font-mono);
    color: #fff;
  }
`;

const AiChip = styled.div`
  position: absolute;
  top: 8%;
  left: 6%;
  z-index: 6;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  max-width: 200px;
  padding: 8px 11px;
  border-radius: 12px;
  background: rgba(17, 34, 64, 0.9);
  border: 1px solid rgba(236, 72, 153, 0.45);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4), 0 0 20px rgba(236, 72, 153, 0.18);
  animation: ${floatAlt} 3.8s ease-in-out infinite;

  @media (max-width: 900px) {
    max-width: 170px;
    top: 5%;
    left: 3%;
  }

  @media (max-width: 768px) {
    max-width: 150px;
    padding: 6px 8px;
    top: 4%;
    left: 2%;
  }

  @media (max-width: 480px) {
    max-width: 140px;
    padding: 5px 7px;
    border-radius: 9px;
    top: 2%;
    left: 1%;
  }

  .icon {
    width: 18px;
    height: 18px;
    border-radius: 6px;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, #ec4899, #8b5cf6);
    flex-shrink: 0;
    box-shadow: 0 0 12px rgba(236, 72, 153, 0.5);

    @media (max-width: 480px) {
      width: 14px;
      height: 14px;
    }

    svg {
      width: 11px;
      height: 11px;

      @media (max-width: 480px) {
        width: 9px;
        height: 9px;
      }
    }
  }

  p {
    margin: 0;
    color: var(--light-slate);
    font-size: 10px;
    line-height: 1.3;

    @media (max-width: 480px) {
      font-size: 8px;
    }

    strong {
      color: #f9a8d4;
      font-weight: 600;
    }
  }
`;

const Connector = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
  overflow: visible;

  path {
    fill: none;
    stroke: rgba(167, 139, 250, 0.55);
    stroke-width: 1.4;
    stroke-dasharray: 4 5;
    animation: ${dash} 0.75s linear infinite;
  }
`;

const Panel = styled.div`
  position: absolute;
  z-index: 6;
  width: 138px;
  padding: 9px 10px;
  border-radius: 12px;
  background: rgba(17, 34, 64, 0.82);
  border: 1px solid rgba(148, 163, 184, 0.22);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(10px);
  animation: ${floatAlt} ${({ $dur }) => $dur || '6s'} ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay || '0s'};

  @media (max-width: 768px) {
    width: 110px;
    padding: 7px 8px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    width: 90px;
    padding: 5px 6px;
    border-radius: 8px;
  }

  .title {
    margin: 0;
    color: var(--lightest-slate);
    font-size: 11px;
    font-weight: 700;

    @media (max-width: 480px) {
      font-size: 9px;
    }
  }

  .sub {
    margin: 3px 0 0;
    color: var(--slate);
    font-size: 9px;
    line-height: 1.35;

    @media (max-width: 480px) {
      font-size: 7px;
    }
  }
`;

const Chart = styled.div`
  position: absolute;
  right: 4%;
  bottom: 7%;
  z-index: 6;
  width: 120px;
  padding: 9px 10px;
  border-radius: 12px;
  background: rgba(17, 34, 64, 0.85);
  border: 1px solid rgba(168, 85, 247, 0.35);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.35), 0 0 18px rgba(168, 85, 247, 0.12);
  animation: ${float} 6.8s ease-in-out infinite;
  animation-delay: 0.4s;

  @media (max-width: 768px) {
    width: 100px;
    padding: 7px 8px;
  }

  @media (max-width: 480px) {
    width: 82px;
    padding: 5px 6px;
    border-radius: 8px;
    bottom: 5%;
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 6px;

    span {
      color: var(--slate);
      font-size: 9px;

      @media (max-width: 480px) {
        font-size: 7px;
      }
    }

    strong {
      color: #c4b5fd;
      font-size: 12px;
      font-weight: 700;

      @media (max-width: 480px) {
        font-size: 10px;
      }
    }
  }

  svg {
    width: 100%;
    height: 36px;

    @media (max-width: 480px) {
      height: 26px;
    }

    path.fill {
      fill: url(#engFill);
      opacity: 0.35;
    }

    path.line {
      fill: none;
      stroke: #c084fc;
      stroke-width: 2;
      stroke-linecap: round;
      filter: drop-shadow(0 0 4px rgba(192, 132, 252, 0.7));
    }
  }
`;

const IconReact = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="2" fill="#61DAFB" />
    <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="#61DAFB" strokeWidth="1.3" />
    <ellipse
      cx="12"
      cy="12"
      rx="9"
      ry="3.8"
      stroke="#61DAFB"
      strokeWidth="1.3"
      transform="rotate(60 12 12)"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="9"
      ry="3.8"
      stroke="#61DAFB"
      strokeWidth="1.3"
      transform="rotate(120 12 12)"
    />
  </svg>
);

const IconNext = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="#fff" />
    <path d="M8.4 7.6h1.6l4.8 7.2V7.6h1.6v8.6h-1.6l-4.8-7.2v7.2H8.4V7.6z" fill="#0a192f" />
  </svg>
);

const IconApple = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const IconAndroid = () => (
  <svg viewBox="0 0 24 24" fill="#3DDC84" aria-hidden="true">
    <path d="M17.6 9.5l1.4-2.4c.1-.2 0-.4-.2-.5-.2-.1-.4 0-.5.2l-1.4 2.4A8.4 8.4 0 0012 8.2a8.4 8.4 0 00-4.9 1.5L5.7 7.3c-.1-.2-.3-.3-.5-.2-.2.1-.3.3-.2.5l1.4 2.4A7.7 7.7 0 004 15.2h16a7.7 7.7 0 00-2.4-5.7zM9 13.2a.9.9 0 110-1.8.9.9 0 010 1.8zm6 0a.9.9 0 110-1.8.9.9 0 010 1.8z" />
    <path d="M4 16.2v2.2c0 .7.6 1.3 1.3 1.3h.4V22c0 .4.3.7.7.7s.7-.3.7-.7v-2.3h9.8V22c0 .4.3.7.7.7s.7-.3.7-.7v-2.3h.4c.7 0 1.3-.6 1.3-1.3v-2.2H4z" />
  </svg>
);

const IconSpark = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3l1.2 4.2L17.5 8.5l-4.3 1.3L12 14l-1.2-4.2L6.5 8.5l4.3-1.3L12 3z" fill="#e879f9" />
    <path d="M18.5 13.5l.7 2.2 2.2.7-2.2.7-.7 2.2-.7-2.2-2.2-.7 2.2-.7.7-2.2z" fill="#c084fc" />
  </svg>
);

const IconBrain = () => (
  <svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
    <path d="M9.5 4.5a3 3 0 00-2.8 4.1A3.2 3.2 0 005 11.5c0 1.3.8 2.4 1.9 2.9V17a2 2 0 002 2h.6v1.5h1.8V19H12v-1.5h.7A2 2 0 0014.7 17v-2.6A3.2 3.2 0 0016.5 11.5a3.2 3.2 0 00-1.7-2.9 3 3 0 00-2.8-4.1c-.5 0-1 .1-1.4.3A3 3 0 009.5 4.5z" />
  </svg>
);

const HeroVisual = () => (
  <StyledHeroVisual aria-hidden="true">
    <Stage>
      <GlowBackdrop />
      <Orbit className="orbit hide-sm" viewBox="0 0 420 420">
        <defs>
          <linearGradient id="orbitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64ffda" stopOpacity="0.15" />
            <stop offset="35%" stopColor="#64ffda" stopOpacity="1" />
            <stop offset="70%" stopColor="#57cbff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#57cbff" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <circle className="track" cx="210" cy="210" r="188" />
        <circle className="track" cx="210" cy="210" r="152" />
        <circle className="glow-ring-soft" cx="210" cy="210" r="188" />
        <circle className="glow-ring" cx="210" cy="210" r="188" />
        <circle
          className="glow-ring-soft"
          cx="210"
          cy="210"
          r="152"
          style={{ strokeDashoffset: 200 }}
        />
        <circle
          className="glow-ring"
          cx="210"
          cy="210"
          r="152"
          style={{ strokeDasharray: '60 380', strokeDashoffset: 80 }}
        />
      </Orbit>

      <Connector className="hide-sm" viewBox="0 0 580 500" preserveAspectRatio="none">
        <path d="M420 120 C460 130, 500 145, 520 160" />
        <path d="M420 200 C465 210, 505 225, 520 245" />
        <path d="M420 280 C460 295, 500 320, 520 340" />
        <path d="M150 90 C170 130, 190 170, 210 210" />
      </Connector>

      <AiChip className="ai-chip">
        <div className="icon">
          <IconBrain />
        </div>
        <p>
          <strong>AI:</strong> Generate personalized recommendations
        </p>
      </AiChip>

      <CodeWindow className="code">
        <div className="bar">
          <i className="r" />
          <i className="y" />
          <i className="g" />
          <span>TripPlanner.tsx</span>
        </div>
        <pre>
          <code>
            <span className="kw">import</span> <span className="op">{'{'}</span>{' '}
            <span className="var">useState</span> <span className="op">{'}'}</span>{' '}
            <span className="kw">from</span> <span className="str">&apos;react&apos;</span>
            <span className="op">;</span>
            {'\n'}
            <span className="kw">import</span> <span className="op">{'{'}</span>{' '}
            <span className="var">View</span>
            <span className="op">,</span> <span className="var">Text</span>{' '}
            <span className="op">{'}'}</span> <span className="kw">from</span>{' '}
            <span className="str">&apos;react-native&apos;</span>
            <span className="op">;</span>
            {'\n'}
            <span className="kw">import</span> <span className="op">{'{'}</span>{' '}
            <span className="fn">getRecommendations</span> <span className="op">{'}'}</span>{' '}
            <span className="kw">from</span> <span className="str">&apos;@/ai&apos;</span>
            <span className="op">;</span>
            {'\n'}
            {'\n'}
            <span className="cm">{'// AI-assisted trip discovery'}</span>
            {'\n'}
            <span className="kw">const</span> <span className="fn">loadTrips</span>{' '}
            <span className="op">=</span> <span className="kw">async</span>{' '}
            <span className="op">()</span> <span className="op">=&gt;</span>{' '}
            <span className="op">{'{'}</span>
            {'\n'}
            {'  '}
            <span className="kw">const</span> <span className="var">trips</span>{' '}
            <span className="op">=</span> <span className="kw">await</span>{' '}
            <span className="fn">getRecommendations</span>
            <span className="op">(</span>
            <span className="var">user</span>
            <span className="op">);</span>
            {'\n'}
            {'  '}
            <span className="fn">setTrips</span>
            <span className="op">(</span>
            <span className="var">trips</span>
            <span className="op">);</span>
            {'\n'}
            <span className="op">{'}'};</span>
          </code>
        </pre>
      </CodeWindow>

      <Phone className="phone">
        <div className="notch" />
        <div className="screen">
          <div className="top">
            <p className="hello">Good morning</p>
            <p className="brand">TripPlanner</p>
            <div className="search" />
          </div>
          <div className="chips">
            <span className="on">Mountains</span>
            <span>Beaches</span>
            <span>Cities</span>
          </div>
          <div className="cards">
            <div className="card">
              <span className="badge">AI Picks</span>
              <span className="label">Swiss Alps</span>
            </div>
            <div className="card bali">
              <span className="label">Bali Escape</span>
            </div>
          </div>
          <div className="tabbar">
            <span className="active" />
            <span />
            <span />
            <span />
          </div>
        </div>
      </Phone>

      <Panel
        className="panel hide-sm"
        style={{ top: '14%', right: '3%' }}
        $delay="0.1s"
        $dur="4.2s"
      >
        <p className="title">Backend</p>
        <p className="sub">Firebase · Supabase · Realtime</p>
      </Panel>

      <Panel
        className="panel hide-sm"
        style={{ top: '36%', right: '2%' }}
        $delay="0.35s"
        $dur="4.6s"
      >
        <p className="title">AI Integration</p>
        <p className="sub">LLM APIs · Smart features</p>
      </Panel>

      <Panel className="panel hide-sm" style={{ top: '58%', right: '4%' }} $delay="0.55s" $dur="4s">
        <p className="title">Cross-Platform</p>
        <p className="sub">iOS &amp; Android with Expo</p>
      </Panel>

      <Chart className="chart hide-sm">
        <div className="head">
          <span>Engagement</span>
          <strong>+42%</strong>
        </div>
        <svg viewBox="0 0 100 36" preserveAspectRatio="none">
          <defs>
            <linearGradient id="engFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="fill" d="M0 30 L18 24 L36 26 L54 16 L72 18 L100 6 L100 36 L0 36 Z" />
          <path className="line" d="M0 30 L18 24 L36 26 L54 16 L72 18 L100 6" />
        </svg>
      </Chart>

      <TagNetwork className="tag-network hide-sm" viewBox="0 0 580 500" preserveAspectRatio="none">
        <defs>
          <linearGradient id="linkGradA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#61dafb" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="linkGradB" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3178c6" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#f7df1e" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="linkGradC" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a8b2d1" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#3ddc84" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="linkGradD" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f7df1e" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#e879f9" stopOpacity="0.85" />
          </linearGradient>
          <filter id="dotGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="3.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* RN → Next → TS */}
        <path
          className="link"
          stroke="url(#linkGradA)"
          d="M200 28 C 230 45, 250 70, 265 100"
          style={{ animationDuration: '1.2s' }}
        />
        <path
          className="link"
          stroke="url(#linkGradA)"
          d="M250 115 C 220 145, 175 170, 155 205"
          style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
        />

        {/* TS → JS → AI */}
        <path
          className="link"
          stroke="url(#linkGradB)"
          d="M145 230 C 120 280, 105 330, 115 390"
          style={{ animationDuration: '1.35s' }}
        />
        <path
          className="link"
          stroke="url(#linkGradD)"
          d="M145 415 C 185 430, 220 435, 255 430"
          style={{ animationDuration: '1.1s' }}
        />

        {/* RN → iOS → Android */}
        <path
          className="link"
          stroke="url(#linkGradC)"
          d="M275 28 C 330 20, 380 25, 420 40"
          style={{ animationDuration: '1.45s' }}
        />
        <path
          className="link"
          stroke="url(#linkGradC)"
          d="M445 55 C 460 85, 465 115, 460 145"
          style={{ animationDuration: '1.25s', animationDirection: 'reverse' }}
        />

        {/* Next → AI (cross link) */}
        <path
          className="link"
          stroke="rgba(232, 121, 249, 0.45)"
          d="M280 120 C 310 200, 300 320, 270 420"
          style={{ animationDuration: '1.8s' }}
        />

        {/* Traveling energy dots between tags */}
        <circle className="dot" r="5.2" fill="#61dafb">
          <animateMotion
            dur="1.8s"
            repeatCount="indefinite"
            path="M200 28 C 230 45, 250 70, 265 100"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="dot" r="4.8" fill="#82aaff">
          <animateMotion
            dur="2.0s"
            begin="0.4s"
            repeatCount="indefinite"
            path="M250 115 C 220 145, 175 170, 155 205"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            dur="2.0s"
            begin="0.4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="dot" r="4.8" fill="#f7df1e">
          <animateMotion
            dur="2.2s"
            begin="0.7s"
            repeatCount="indefinite"
            path="M145 230 C 120 280, 105 330, 115 390"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            dur="2.2s"
            begin="0.7s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="dot" r="5" fill="#e879f9">
          <animateMotion
            dur="1.7s"
            begin="0.2s"
            repeatCount="indefinite"
            path="M145 415 C 185 430, 220 435, 255 430"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            dur="1.7s"
            begin="0.2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="dot" r="4.4" fill="#ccd6f6">
          <animateMotion
            dur="1.95s"
            begin="0.55s"
            repeatCount="indefinite"
            path="M275 28 C 330 20, 380 25, 420 40"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            dur="1.95s"
            begin="0.55s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="dot" r="4.8" fill="#3ddc84">
          <animateMotion
            dur="1.85s"
            begin="0.9s"
            repeatCount="indefinite"
            path="M445 55 C 460 85, 465 115, 460 145"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            dur="1.85s"
            begin="0.9s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="dot" r="4.2" fill="#c084fc">
          <animateMotion
            dur="2.5s"
            begin="1.1s"
            repeatCount="indefinite"
            path="M280 120 C 310 200, 300 320, 270 420"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            dur="2.5s"
            begin="1.1s"
            repeatCount="indefinite"
          />
        </circle>
      </TagNetwork>

      {/* Floating stack tags — second-image style */}
      <Tag
        className="tag tag-rn"
        style={{ top: '3%', left: '28%' }}
        $border="rgba(97, 218, 251, 0.55)"
        $glow="rgba(97, 218, 251, 0.28)"
        $dur="3.6s"
        $delay="0s"
        $pulseDelay="0s"
      >
        <IconReact />
        React Native
      </Tag>

      <Tag
        className="tag hide-sm"
        style={{ top: '18%', left: '38%' }}
        $border="rgba(230, 241, 255, 0.35)"
        $glow="rgba(230, 241, 255, 0.12)"
        $dur="4.1s"
        $delay="0.3s"
        $pulseDelay="0.45s"
      >
        <IconNext />
        Next.js
      </Tag>

      <Tag
        className="tag tag-ts"
        style={{ top: '40%', left: '22%' }}
        $border="rgba(49, 120, 198, 0.6)"
        $glow="rgba(49, 120, 198, 0.28)"
        $dur="3.9s"
        $delay="0.15s"
        $pulseDelay="0.9s"
      >
        <span className="mark" style={{ background: '#3178c6' }}>
          TS
        </span>
        TypeScript
      </Tag>

      <Tag
        className="tag hide-xs"
        style={{ bottom: '18%', left: '16%' }}
        $border="rgba(247, 223, 30, 0.55)"
        $glow="rgba(247, 223, 30, 0.22)"
        $dur="4.3s"
        $delay="0.5s"
        $pulseDelay="1.35s"
      >
        <span className="mark" style={{ background: '#f7df1e', color: '#0a192f' }}>
          JS
        </span>
        JavaScript
      </Tag>

      <Tag
        className="tag tag-ios"
        style={{ top: '6%', right: '28%' }}
        $border="rgba(168, 178, 209, 0.4)"
        $glow="rgba(168, 178, 209, 0.15)"
        $dur="3.7s"
        $delay="0.25s"
        $pulseDelay="0.6s"
      >
        <IconApple />
        iOS
      </Tag>

      <Tag
        className="tag hide-sm"
        style={{ top: '28%', right: '22%' }}
        $border="rgba(61, 220, 132, 0.45)"
        $glow="rgba(61, 220, 132, 0.2)"
        $dur="4s"
        $delay="0.45s"
        $pulseDelay="1.1s"
      >
        <IconAndroid />
        Android
      </Tag>

      <Tag
        className="tag tag-ai"
        style={{ bottom: '14%', left: '42%' }}
        $border="rgba(232, 121, 249, 0.55)"
        $glow="rgba(192, 132, 252, 0.3)"
        $dur="3.8s"
        $delay="0.2s"
        $pulseDelay="1.8s"
      >
        <IconSpark />
        AI
      </Tag>
    </Stage>
  </StyledHeroVisual>
);

export default HeroVisual;
