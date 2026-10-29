import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import {
  Head,
  Loader,
  Nav,
  Social,
  Email,
  Footer,
  BackgroundEffects,
  CometCursor,
} from '@components';
import { GlobalStyle, theme } from '@styles';

const StyledContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: transparent;
`;

const Layout = ({ children, location }) => {
  const isHome = location.pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);

  // Sets target="_blank" rel="noopener noreferrer" on external links
  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const timers = [];
    const navEntry = performance.getEntriesByType?.('navigation')?.[0];
    const isReload = navEntry?.type === 'reload';

    // Reloads should always start at the hero, even if the URL still has a section hash
    // (e.g. /#skills from a prior nav click) or the browser restores focus mid-page.
    if (isReload && location.hash) {
      window.history.replaceState(null, '', `${location.pathname}${location.search || ''}`);
    }

    if (!isReload && location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      timers.push(
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView();
          }
        }, 0),
      );
    } else if (!location.hash) {
      const forceTop = () => window.scrollTo(0, 0);
      forceTop();
      // Run again after layout/images settle so scroll anchoring can't leave us mid-page.
      requestAnimationFrame(forceTop);
      timers.push(setTimeout(forceTop, 50));
      timers.push(setTimeout(forceTop, 300));
    }

    handleExternalLinks();

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isLoading, location.hash, location.pathname]);

  return (
    <>
      <Head />

      <div id="root">
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <a className="skip-to-content" href="#content">
            Skip to Content
          </a>

          {isLoading && isHome ? (
            <Loader finishLoading={() => setIsLoading(false)} />
          ) : (
            <>
              <BackgroundEffects />
              <StyledContent>
                <Nav isHome={isHome} />
                <Social isHome={isHome} />
                <Email isHome={isHome} />

                <div id="content">
                  {children}
                  <Footer />
                </div>
              </StyledContent>
              <CometCursor />
            </>
          )}
        </ThemeProvider>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
