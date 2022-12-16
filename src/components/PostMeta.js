import React from "react";
import styled from 'styled-components';
// import { breakpoint } from "../styles/BreakPoints";

const PostMetaStyles = styled.span`


  .post-meta {
    &-tab {
      display: inline-block;
      padding: .2rem 1rem .1rem;
      font-size: 1.2rem;
      border-radius: 1.6rem;
      background-color: var(--c-gray-800);

      &-emoji {
        display: inline-block;
        font-size: 1.2rem;
        margin-right: .4rem;
      }
    }  
  }
`;

export default function PostMeta({ post }) {
  return (
    <PostMetaStyles className="post-meta">
      {post.date &&
        <time className="post-meta-tab">
          <span className="post-meta-tab-emoji">
            📅
          </span>

          {post.date}
        </time>
      }
    </PostMetaStyles>
  )
}