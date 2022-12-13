import React from 'react';
import { useStaticQuery, graphql, Link } from "gatsby";
import styled from 'styled-components';

const CategoriesStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  a {
    display: flex;
    align-items: center;
    place-content: center;
    padding: 1rem;
    
    .count {
      border: 2px solid white;
    }
    
    &[aria-current="page"] {
      background-color: red;
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
      <Link to="/posts">
        <span className="name">
          All
        </span>

        <span className="count">
          {posts.nodes.length}
        </span>
      </Link>
      {cateogriesWtihCount.map(category => (
        <Link
          key={category.id}
          to={`/category/${category.slug}`}
          className={category.slug === activeCategory ? 'active' : ''}>

          <span className="name">
            {category.name}
          </span>

          <span className="count">
            {category.count}
          </span>
        </Link>
      ))}
    </CategoriesStyles>
  )
}