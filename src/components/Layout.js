import React from 'react';
import styled from 'styled-components';
import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import Footer from './Footer';


const ContentStyles = styled.main`
  max-width: 60rem;
  margin: 0 auto;
  padding: 2rem;
`;

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyles />
      <Typography />
      <ContentStyles>
        {children}
        <Footer />
      </ContentStyles>
    </>
  );
}
