import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import Footer from './Footer';
import Header from "./Header";


const ContentStyles = styled.main`
  max-width: 76rem;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyles />
      <Typography />
      <ContentStyles>
        <Header />
        {children}
        <Footer />
      </ContentStyles>
    </>
  );
}
