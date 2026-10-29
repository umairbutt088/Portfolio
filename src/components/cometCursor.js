import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';

const StyledCanvas = styled.canvas`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  pointer-events: none;
`;

const MAX_POINTS = 18;
const lerp = (a, b, t) => a + (b - a) * t;

const CometCursor = () => {
  const canvasRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const pointer = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
    };

    const head = {
      x: pointer.x,
      y: pointer.y,
    };

    const trail = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = e => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };

    let raf = 0;

    const frame = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Head eases toward pointer; trail samples follow the head
      head.x = lerp(head.x, pointer.x, 0.28);
      head.y = lerp(head.y, pointer.y, 0.28);

      trail.unshift({ x: head.x, y: head.y });
      if (trail.length > MAX_POINTS) {
        trail.pop();
      }

      if (trail.length > 1) {
        // Soft ribbon
        for (let i = 0; i < trail.length - 1; i++) {
          const p0 = trail[i];
          const p1 = trail[i + 1];
          const t = i / (trail.length - 1);
          const width = lerp(5.5, 0.6, t);
          const alpha = lerp(0.55, 0.02, t);

          ctx.beginPath();
          ctx.strokeStyle = `rgba(100, 255, 218, ${alpha * 0.55})`;
          ctx.lineWidth = width + 3;
          ctx.lineCap = 'round';
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();

          ctx.beginPath();
          const g = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
          g.addColorStop(0, `rgba(100, 255, 218, ${alpha})`);
          g.addColorStop(1, `rgba(87, 203, 255, ${alpha * 0.85})`);
          ctx.strokeStyle = g;
          ctx.lineWidth = width;
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }
      }

      // Comet head
      const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 14);
      glow.addColorStop(0, 'rgba(230, 241, 255, 0.95)');
      glow.addColorStop(0.25, 'rgba(100, 255, 218, 0.55)');
      glow.addColorStop(0.55, 'rgba(87, 203, 255, 0.22)');
      glow.addColorStop(1, 'rgba(87, 203, 255, 0)');

      ctx.beginPath();
      ctx.fillStyle = glow;
      ctx.arc(head.x, head.y, 14, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = 'rgba(230, 241, 255, 0.95)';
      ctx.arc(head.x, head.y, 2.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = 'rgba(100, 255, 218, 0.7)';
      ctx.arc(head.x, head.y, 1.2, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return <StyledCanvas ref={canvasRef} aria-hidden="true" />;
};

export default CometCursor;
