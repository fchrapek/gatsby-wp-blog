import React from 'react';
import styled from 'styled-components';

const CategoryStyles = styled.span`
  display: inline-block;
  padding: .2rem 1rem .1rem;
  font-size: 1.2rem;
  border-radius: 1.6rem;
  background-color: var(--c-gray-800);
  
  .count {
    margin-left: .4rem;
    font-size: 1.2rem;
  }
`;

export default function PostCategoryTab({ name, count }) {
  return (
    <CategoryStyles className="post-category">
      {name}

      {count &&
        <span className="count">
          {count}
        </span>
      }
    </CategoryStyles>
  )
}
