import React from "react";
import { Link } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import styled from 'styled-components';
import CategoryTab from "./CategoryTab";

const PostGridStyles = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const PostStyles = styled.li`
  background-color: var(--c-gray-600);
  border-radius: 1.6rem;
  
  a {
    display: block;
    padding: 2rem;
  }

  .category-tab {
    margin-bottom: 1rem;
  }
`;

function SinglePost({ post }) {
  // const featuredImage = {
  //   data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
  //   alt: post.featuredImage?.node?.alt || ``,
  // }

  console.log(post)

  return (
    <PostStyles>
      <Link to={`/${post.slug}`}>
        {post.terms.nodes.map(term => {
          return (
            <CategoryTab name={term.name} />
          )
        })}

        <h2>{post.title}</h2>

        {/* {featuredImage?.data && (
        <GatsbyImage
          image={featuredImage.data}
          alt={featuredImage.alt}
        />
      )} */}
      </Link>
    </PostStyles>
  )
}

export default function PostsList({ posts }) {
  return (
    <>
      <PostGridStyles>
        {posts.map(post => (
          <SinglePost key={post.id} post={post}></SinglePost>
        ))}
      </PostGridStyles>
    </>
  )
}