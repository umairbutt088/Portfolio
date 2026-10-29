import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, whatsappNumber } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;
  position: relative;
  z-index: 1;
  /* Keep readable even if a reveal lib stalls on small screens */
  min-height: 280px;

  @media (max-width: 768px) {
    margin: 40px auto 80px;
    padding: 40px 0 60px;
    min-height: 320px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    margin: 0 0 20px;
    font-size: clamp(36px, 8vw, 60px);
    color: var(--green);
    background-image: linear-gradient(120deg, var(--green) 0%, var(--blue) 45%, var(--green) 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    margin: 0 auto;
    color: var(--slate);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    display: inline-block;

    @media (max-width: 480px) {
      margin-top: 36px;
    }
  }
`;

const Contact = () => {
  const revealOverline = useRef(null);
  const revealTitle = useRef(null);
  const revealText = useRef(null);
  const revealCta = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    // reset: false — last section must not snap back to opacity 0 at the page bottom on mobile
    sr.reveal(revealOverline.current, srConfig(80, 0.1, 'bottom', false));
    sr.reveal(revealTitle.current, srConfig(160, 0.1, 'bottom', false));
    sr.reveal(revealText.current, srConfig(240, 0.1, 'bottom', false));
    sr.reveal(revealCta.current, srConfig(320, 0.1, 'bottom', false));
  }, [prefersReducedMotion]);

  return (
    <StyledContactSection id="contact">
      <h2 className="numbered-heading overline" ref={revealOverline}>
        What’s Next?
      </h2>

      <h2 className="title" ref={revealTitle}>
        Get In Touch
      </h2>

      <p ref={revealText}>
        I’m seeking a position as a React Native developer with a strong focus on building dynamic
        and efficient mobile applications. Proficient in JavaScript, TypeScript, HTML, CSS, and
        Redux Toolkit, I thrive in fast-paced environments where I can tackle challenges, learn new
        technologies, and deliver impactful solutions. My passion for creating seamless user
        experiences drives my dedication to this field.
      </p>

      <a
        className="email-link"
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noreferrer noopener"
        ref={revealCta}
      >
        <span className="btn-text">Send a WhatsApp Message</span>
      </a>
    </StyledContactSection>
  );
};

export default Contact;
