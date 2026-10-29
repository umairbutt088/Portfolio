import { css } from 'styled-components';

// https://reactcommunity.org/react-transition-group/css-transition

const TransitionStyles = css`
  /* Fade up */
  .fadeup-enter {
    opacity: 0.01;
    transform: translateY(40px);
    transition: opacity 600ms var(--easing), transform 600ms var(--easing);
  }

  .fadeup-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity 600ms var(--easing), transform 600ms var(--easing);
  }

  /* Fade down */
  .fadedown-enter {
    opacity: 0.01;
    transform: translateY(-30px);
    transition: opacity 500ms var(--easing), transform 500ms var(--easing);
  }

  .fadedown-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity 500ms var(--easing), transform 500ms var(--easing);
  }

  /* Fade left → in */
  .fadeleft-enter {
    opacity: 0.01;
    transform: translateX(-56px);
    transition: opacity 800ms var(--easing), transform 800ms var(--easing);
  }

  .fadeleft-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 800ms var(--easing), transform 800ms var(--easing);
  }

  /* Fade right → in */
  .faderight-enter {
    opacity: 0.01;
    transform: translateX(56px);
    transition: opacity 800ms var(--easing), transform 800ms var(--easing);
  }

  .faderight-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 800ms var(--easing), transform 800ms var(--easing);
  }

  /* Fade */
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: opacity 300ms var(--easing);
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transition: opacity 300ms var(--easing);
  }
`;

export default TransitionStyles;
