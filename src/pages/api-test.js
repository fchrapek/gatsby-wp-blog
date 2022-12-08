import React from 'react';
import { graphql } from 'gatsby';
// import { StaticImage } from "gatsby-plugin-image";

export default function ApiTestPage({ data }) {
  const characters = data.ricks.nodes

  return (
    <div>
      {characters.map(character => {
        return <React.Fragment key={character.id}>
          {character?.image && (
            <img
              src={character.image}
              alt={character.name}
            />
          )};

          {character?.name && (
            <h2>{character.name}</h2>
          )};
        </React.Fragment>

      })}
    </div>
  );
}

export const query = graphql`
  query {
    ricks: allRick {
      nodes {
        id
        name
        image
      }
    }
  }
`;
