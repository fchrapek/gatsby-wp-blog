import React from "react";
import styled from 'styled-components';
import parse from 'html-react-parser';
import { Link } from 'gatsby';
import PostCategoryTab from "./PostCategoryTab";
import PostMeta from "./PostMeta";
import { breakpoint } from "../styles/BreakPoints";

const PostStyles = styled.li`
  background-color: var(--c-gray-600);
  border-radius: 1.6rem;

  .post {
    &-link {
      display: block;
      padding: 2rem;

      @media ${breakpoint.md} {
        padding: 3.2rem;
      }
    }

    &-category {
      margin-right: .6rem;
      margin-bottom: 1rem;
      color: var(--c-mint-100);
      background-color: transparent;
      border: .1rem solid var(--c-mint-100);
    }

    &-title {
      margin-bottom: 1rem;
    }

    &-meta {
      margin-bottom: 2rem;
    }

    &-excerpt {
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      height: 4.8rem;
      overflow: hidden;
    }
  }
`;

export default function PostTile({ post }) {
  return (
    <PostStyles>
      <Link className="post-link" to={`/${post.slug}`}>
        {post.terms?.nodes.map(term => {
          return (
            <PostCategoryTab key={term.id} name={term.name} />
          )
        })}

        <h2 className="post-title">
          {post.title}
        </h2>

        <PostMeta post={post} />

        {post.excerpt &&
          <div className="post-excerpt">
            {parse(post.excerpt)}
          </div>
        }
      </Link>
    </PostStyles>
  )
}