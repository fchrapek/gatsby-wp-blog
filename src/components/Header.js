import React from 'react';
import { useStaticQuery, graphql, Link } from "gatsby";
import styled from 'styled-components';
import Logo from "./Logo";
import { breakpoint } from "../styles/BreakPoints";

const HeaderStyles = styled.header`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto auto;
  place-content: center;
  grid-column-gap: 2.6rem;
  margin-bottom: 3.2rem;
  padding-bottom: 3.2rem;
  border-bottom: 1px dashed var(--c-mint-100);
  
  @media ${breakpoint.md} { 
    grid-column-gap: 4.8rem;
    margin-bottom: 4.8rem;
    padding-bottom: 4.8rem;
  }

  .site {
    &-home {
      display: grid;
      grid-area: 1 / 1 / 3 / 2;
      place-content: center;

      @media ${breakpoint.md} { 
        grid-row: 1 / 4;
      }
    }

    &-title {
      grid-area: 1 / 2 / 2 / 2;
    }

    &-tagline {
      display: block;
      grid-area: 2 / 2 / 3 / 3;
      margin-top: .8rem;
      font-size: 1.4rem;
      line-height: 2rem;
    }
    
    &-description {
      grid-area: 3 / 1 / 4 / 3;
      margin-top: 2rem;
      color: var(--c-mint-200);
      font-size: 1.6rem;

      @media ${breakpoint.md} { 
        grid-column: 2 / 3;
        margin-top: 1.8rem;
        font-size: 1.8rem;
        line-height: 2.8rem;
      }
    }
  }
`;

export default function Header() {
  const { wp } = useStaticQuery(graphql`
     query {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)

  const siteData = wp.generalSettings;

  return (
    <HeaderStyles>
      <Link className="site-home" to={'/'}>
        <Logo />
      </Link>
      {siteData.title &&
        <Link to={'/'}>
          <h1 className="site-title">
            {siteData.title}

            {siteData.description &&
              <span className="site-tagline">
                {siteData.description}
              </span>
            }
          </h1>
        </Link>
      }

      <p className="site-description">
        Cyfrowy ogród tropikalny zamieszkany przez pajączki, które są wesołe i tańczą, kiedy Pan ogrodnik dba o ich sieć!
      </p>
    </HeaderStyles>
  );
}