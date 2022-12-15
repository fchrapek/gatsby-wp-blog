import React from 'react';
import { useStaticQuery, graphql, Link } from "gatsby";
import CategoryTab from "./CategoryTab";
import styled from 'styled-components';

const CategoriesStyles = styled.nav`
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

export default function PostsFilter({ activeCategory }) {
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
    <CategoriesStyles>
      <Link to="/">
        <CategoryTab name='wszystkie' count={posts.nodes.length} />
      </Link>
      {cateogriesWtihCount.map(category => (
        <Link key={category.id} to={`/temat/${category.slug}`}>
          <CategoryTab name={category.name} count={category.count} />
        </Link>
      ))}
    </CategoriesStyles>
  )
}