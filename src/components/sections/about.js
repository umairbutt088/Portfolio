import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'React Native',
    'Expo',
    'JavaScript (ES6+)',
    'TypeScript',
    'Functional Copmponents',
    'Styled Component',
    'Redux & Redux-Toolkit',
    'Jest Unit Testing',
    'Rest APIs',
    'Firebase FireStore',
    'Push Notifications',
    'Axios Interceptor',
    'Crashlytics',
    'Google Analytics',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! I’m Umair – a React Native developer with a passion for transforming ideas into
              high-impact mobile applications. With over 4 years of experience in mobile
              development, I’ve honed my skills in crafting cross-platform apps that are as
              beautiful as they are functional.
            </p>

            <p>
              I’ve had the opportunity to work on a diverse range of projects, from large-scale
              applications that serve thousands of users to specialized tools tailored for specific
              needs. My journey in app development has been both challenging and rewarding, pushing
              me to not only master the technical aspects but also to think critically about user
              experience, scalability, and performance.
            </p>

            {/* <h2>What Sets Me Apart:</h2>

            <p>
              <h5>Innovative, User-Centered Design: </h5>I believe that great apps are intuitive,
              responsive, and visually appealing. With expertise in React Native CLI and Expo, along
              with TypeScript, I build interfaces that are both functional and delightful to use.
            </p>
            <p>
              <h5>Technical Depth and Versatility:</h5> Beyond the frontend, I’m well-versed in
              using Redux (and Redux Toolkit) for state management, ensuring seamless data handling
              and app performance. I’ve also integrated various backend and cloud solutions,
              including Firebase and RESTful APIs, to create cohesive, reliable systems.
            </p> */}

            <p>
              Each project I take on is a collaboration. I’m committed to understanding my clients’
              goals and working together to deliver solutions that not only meet requirements but
              exceed expectations. My approach is proactive and hands-on, ensuring each app is built
              with precision, scalability, and a keen eye for detail.
            </p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/userImage.png"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
