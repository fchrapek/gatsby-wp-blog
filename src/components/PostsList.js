import React from "react";
import { Link } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import styled from 'styled-components';

const PostGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  gap: 4rem;
`;

const PostStyles = styled.div`
  border: 1px solid red;
`;

function SinglePost({ post }) {
  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }

  return (
    <PostStyles>
      <Link to={`/${post.slug}`}>
        <h2>{post.title}</h2>
      </Link>
      <p>{post.terms.nodes.map(term => term.name).join(', ')}</p>
      {featuredImage?.data && (
        <GatsbyImage
          image={featuredImage.data}
          alt={featuredImage.alt}
        />
      )}
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