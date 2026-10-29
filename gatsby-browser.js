/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

exports.onClientEntry = () => {
  // Prevent the browser from restoring a mid-page scroll after reload/loader.
  if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  const navEntry = performance.getEntriesByType?.('navigation')?.[0];
  if (navEntry?.type === 'reload' && window.location.hash) {
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${window.location.search || ''}`,
    );
  }

  window.scrollTo(0, 0);
};

exports.shouldUpdateScroll = ({ routerProps: { location } }) => {
  const navEntry = performance.getEntriesByType?.('navigation')?.[0];
  const isReload = navEntry?.type === 'reload';

  if (!isReload && location.hash) {
    const id = location.hash.replace(/^#/, '');
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
    return false;
  }

  window.setTimeout(() => window.scrollTo(0, 0), 0);
  return [0, 0];
};
