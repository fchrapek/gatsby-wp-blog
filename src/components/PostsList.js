import React from "react";
import styled from 'styled-components';
import PostTile from './PostTile';

const PostGridStyles = styled.ul`
  display: grid;
  gap: 2rem;
`;

export default function PostsList({ posts }) {
  return (
    <>
      <PostGridStyles>
        {posts.map(post => (
          <PostTile key={post.id} post={post}></PostTile>
        ))}
      </PostGridStyles>
    </>
  )
}