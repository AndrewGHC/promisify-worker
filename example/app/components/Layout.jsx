import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MAIN_COLOUR = '#1976D2'; // Blue
const OFF_WHITE = '#FAFAFA';
const OFF_WHITE_DARKER = '#ECEFF1';
const DARK_GREY = '#424242';

const Section = styled.section`
  display: grid;
  grid-template: 10vh 1fr 5vh / 1fr;
  grid-template-areas: "head"
                       "main"
                       "foot";
  min-height: 100vh;
  min-width: 100vw;
  max-height: 100vh;
  max-width: 100vw;
  font-family: Arial;
  > * {
    padding: 1em;
  }
`;

const Header = styled.header`
  grid-area: head;
  background-color: ${MAIN_COLOUR};
  display: flex;
  align-items: center;
  color: ${OFF_WHITE};
`;

const Main = styled.main`
  grid-area: main;
  background-color: ${OFF_WHITE};
  color: ${DARK_GREY};
`;

const Footer = styled.footer`
  grid-area: foot;
  background-color: ${OFF_WHITE_DARKER};
  display: flex;
  align-items: center;
`;

const FooterLink = styled.a`
  text-decoration: none;
`;

const Layout = ({ children }) => (
  <Section>
    <Header>
      <h1>
        Promisify web workers
      </h1>
    </Header>

    <Main>
      {children}
    </Main>

    <Footer>
      <FooterLink href="https://github.com/AndrewGHC">
        AndrewGHC
      </FooterLink>
    </Footer>
  </Section>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
