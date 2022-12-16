import React from 'react';
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from 'styled-components';
import Seo from "../components/Seo";
import PostCategoryTab from "../components/PostCategoryTab";
import parse from 'html-react-parser';

const PostStyles = styled.article`
  h2 {
    margin-bottom: 2rem;
  }

  p {
    margin-bottom: 1.6rem;
  }

  section {
    p:last-child {
      margin-bottom: 2.4rem;
    }
  }

  .post {
    &-title {
      margin-bottom: 4rem;
    }

    &-thumbnail {
      margin-bottom: 4rem;
    }
  }
`;

export default function SinglePostPage({ data: { post } }) {
  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }
  const flexibleContent = post.post?.flexibleContent;

  return (
    <>
      <Seo title={post.title} />

      <PostStyles>
        {post.terms.nodes.map(post => (
          <PostCategoryTab key={post.id} name={post.name} />
        ))}

        <h1 className="post-title">
          {post.title}
        </h1>


        {featuredImage?.data && (
          <GatsbyImage
            className="post-thumbnail"
            image={featuredImage.data}
            alt={featuredImage.alt}
          />
        )}

        {flexibleContent?.map(data => {
          const image = {
            data: data.image?.localFile?.childImageSharp?.gatsbyImageData,
            alt: data.image?.alt || ``,
          }

          return (
            <React.Fragment key={Math.floor(Math.random() * 100)}>
              {data?.content && parse(data.content)}

              {image?.data && (
                <GatsbyImage
                  image={image.data}
                  alt={image.alt}
                />
              )}

              {data.section?.map(sectionData => {
                return (
                  <section key={Math.floor(Math.random() * 100)}>
                    {sectionData.flexibleContent.map(flexibleContent => (
                      flexibleContent?.content && parse(flexibleContent.content)
                    ))}
                  </section>
                )
              })}
            </React.Fragment>
          )
        })}
      </PostStyles>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    post: wpPost(slug: { eq: $slug }) {
      id
      title
      date(formatString: "DD MMM YY", locale: "pl")
      excerpt
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                placeholder: DOMINANT_COLOR
                layout: FULL_WIDTH
              )
            }
          }
        }
      }
      post {
        flexibleContent {
          ... on WpPost_Post_FlexibleContent_Section {
            section {
              flexibleContent {
                ... on WpPost_Post_FlexibleContent_Section_section_FlexibleContent_Content {
                  content
                }
                ... on WpPost_Post_FlexibleContent_Section_section_FlexibleContent_Image {
                  image {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData(
                          quality: 100
                          placeholder: DOMINANT_COLOR
                          layout: FULL_WIDTH
                        )
                      }
                    }
                  }
                }
              }
            }
          }
          ... on WpPost_Post_FlexibleContent_Content {
            content
          }
        }
      }
      content
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
`;