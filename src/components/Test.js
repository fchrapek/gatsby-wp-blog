import React from 'react';
import styled from 'styled-components';

const TestParagraph = styled.p`
  font-size: 16rem;
`;

export default function Test({ content }) {
  return (
    <TestParagraph>
      {content}
    </TestParagraph>
  );
}
