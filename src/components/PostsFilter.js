import React from 'react';
import { useStaticQuery, graphql, Link } from "gatsby";
import PostCategoryTab from "./PostCategoryTab";
import styled from 'styled-components';

const PostCategoriesStyles = styled.nav`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  gap: .6rem;

  a {
    display: flex;
    align-items: center;
    place-content: center;
    
    &[aria-current="page"] {
      
      span {
        color: var(--c-gray-800);
        background-color: var(--c-mint-100);
      }
    }
  }
`;


function countPostsInCateogries(posts) {
  const counts = posts.nodes
    .map(post => (post.terms.nodes))
    .flat()
    .reduce((acc, category) => {
      const existingCateogry = acc[category.id]

      if (existingCateogry) {
        existingCateogry.count += 1;
      } else {
        acc[category.id] = {
          id: category.id,
          name: category.name,
          slug: category.slug,
          count: 1
        }
      }
      return acc;

    }, {});

  const sortedCategories = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );

  return sortedCategories;
}

export default function PostsFilter() {
  const { posts } = useStaticQuery(graphql`
    query  {
      posts: allWpPost {
        nodes {
          terms {
            nodes {
              ... on WpCategory {
                id
                name
                slug
              }
            }
          }
        }
      }
    }
  `)

  const cateogriesWtihCount = countPostsInCateogries(posts)

  return (
    <PostCategoriesStyles>
      <Link to="/">
        <PostCategoryTab name='wszystkie' count={posts.nodes.length} />
      </Link>
      {cateogriesWtihCount.map(category => (
        <Link key={category.id} to={`/temat/${category.slug}`}>
          <PostCategoryTab name={category.name} count={category.count} />
        </Link>
      ))}
    </PostCategoriesStyles>
  )
}