import React from 'react';
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import SEO from "../components/SEO";
import parse from 'html-react-parser';

export default function SinglePostPage({ data: { post } }) {
  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }
  const flexibleContent = post.post?.flexibleContent;

  return (
    <>
      <SEO title={post.title} />

      <article>
        <h1>{post.title}</h1>

        <p>{post.terms.nodes.map(post => (post.name)).join(', ')}</p>

        {featuredImage?.data && (
          <GatsbyImage
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
      </article>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    post: wpPost(slug: { eq: $slug }) {
      id
      title
      date
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