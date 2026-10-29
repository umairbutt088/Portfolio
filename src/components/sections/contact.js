import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { email, resumeUrl, socialMedia, srConfig, whatsappNumber } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { Icon } from '@components/icons';

const formatWhatsAppDisplay = digits => {
  const d = String(digits || '').replace(/\D/g, '');
  if (d.length < 11) {
    return `+${d}`;
  }
  // Pakistan-style: +92 3XX XXXXXXX
  if (d.startsWith('92') && d.length >= 12) {
    return `+${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}`;
  }
  return `+${d}`;
};

const linkedinUrl =
  socialMedia.find(({ name }) => name.toLowerCase() === 'linkedin')?.url ||
  'https://www.linkedin.com/';

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v11a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 17.5v-11z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M5.5 7.5L12 12.5l6.5-5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.97.52 3.89 1.52 5.58L2 22l4.74-1.56a10 10 0 004.99 1.34h.01c5.46 0 9.89-4.4 9.89-9.83C21.63 6.4 17.5 2 12.04 2zm5.77 14.11c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.16-4.93-4.35-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.38.26-.29.57-.36.76-.36h.55c.17 0 .41-.07.64.49.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.17-.3.38-.42.51-.14.14-.29.29-.12.56.16.28.73 1.2 1.56 1.94 1.07.96 1.97 1.26 2.25 1.4.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.32.07.12.07.67-.17 1.34z" />
  </svg>
);

const IconDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 4v10m0 0l-3.5-3.5M12 14l3.5-3.5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 17.5V18a2 2 0 002 2h10a2 2 0 002-2v-.5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const StyledContactSection = styled.section`
  max-width: 920px;
  margin: 0 auto 100px;
  text-align: left;
  position: relative;
  z-index: 1;
  padding: 48px 0 24px;

  @media (max-width: 768px) {
    margin: 40px auto 80px;
    padding: 32px 0 48px;
  }

  .headline {
    margin: 0 0 14px;
    color: var(--lightest-slate);
    font-size: clamp(28px, 5vw, 44px);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    max-width: 18ch;
  }

  .subhead {
    margin: 0 0 36px;
    color: var(--slate);
    font-size: clamp(var(--fz-md), 2vw, var(--fz-lg));
    line-height: 1.5;
    max-width: 42ch;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }

  .action {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 18px;
    border-radius: 999px;
    font-size: var(--fz-sm);
    font-family: var(--font-sans);
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    transition: var(--transition);
    white-space: nowrap;

    svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    &.primary {
      color: var(--navy);
      background: linear-gradient(120deg, var(--green) 0%, var(--blue) 100%);
      border: 1px solid transparent;
      box-shadow: 0 10px 28px -12px rgba(100, 255, 218, 0.55);

      &:hover,
      &:focus-visible {
        outline: none;
        transform: translateY(-2px);
        box-shadow: 0 14px 32px -12px rgba(87, 203, 255, 0.6);
      }
    }

    &.ghost {
      color: var(--lightest-slate);
      background: transparent;
      border: 1px solid rgba(100, 255, 218, 0.35);

      svg {
        color: var(--green);
      }

      &:hover,
      &:focus-visible {
        outline: none;
        border-color: var(--green);
        background: rgba(100, 255, 218, 0.06);
        transform: translateY(-2px);
      }
    }

    @media (max-width: 480px) {
      width: 100%;
      justify-content: center;
      white-space: normal;
      text-align: center;
    }
  }
`;

const Contact = () => {
  const revealTitle = useRef(null);
  const revealText = useRef(null);
  const revealCta = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const whatsappDisplay = formatWhatsAppDisplay(whatsappNumber);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    // reset: false — last section must not snap back to opacity 0 at the page bottom on mobile
    sr.reveal(revealTitle.current, srConfig(80, 0.1, 'bottom', false));
    sr.reveal(revealText.current, srConfig(160, 0.1, 'bottom', false));
    sr.reveal(revealCta.current, srConfig(240, 0.1, 'bottom', false));
  }, [prefersReducedMotion]);

  return (
    <StyledContactSection id="contact">
      <h2 className="headline" ref={revealTitle}>
        Looking for a React Native engineer? Let’s talk.
      </h2>

      <p className="subhead" ref={revealText}>
        Open to remote full-time and freelance roles. I usually reply within a day.
      </p>

      <div className="actions" ref={revealCta}>
        <a className="action primary" href={`mailto:${email}`}>
          <IconMail />
          <span>{email}</span>
        </a>

        <a
          className="action ghost"
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <IconWhatsApp />
          <span>{whatsappDisplay}</span>
        </a>

        <a className="action ghost" href={linkedinUrl} target="_blank" rel="noreferrer noopener">
          <Icon name="Linkedin" />
          <span>LinkedIn</span>
        </a>

        <a className="action ghost" href={resumeUrl} target="_blank" rel="noreferrer noopener">
          <IconDownload />
          <span>Download CV</span>
        </a>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
