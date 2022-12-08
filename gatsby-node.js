const path = require(`path`);
const fetch = require(`isomorphic-fetch`);


async function turnPostsIntoPages({ graphql, actions }) {
  const postTemplate = path.resolve('./src/templates/Post.js');
  const { data } = await graphql(`
    query {
      posts: allWpPost {
        nodes {
          slug
          title
        }
      }
    }
  `);

  data.posts.nodes.forEach(post => {
    actions.createPage({
      path: `posts/${post.slug}`,
      component: postTemplate,
      context: {
        reandom: 'this is so random',
        slug: post.slug,
      },
    })
  });
}

async function turnCategoriesIntoPages({ graphql, actions }) {
  console.log('creating category template');
  const categoryTemplate = path.resolve('./src/pages/posts.js');

  const { data } = await graphql(`
   query  {
      categories: allWpTermNode {
        nodes {
          id
          slug
          name
        }
      }
    }
  `);

  data.categories.nodes.forEach(category => {
    actions.createPage({
      path: `category/${category.slug}`,
      component: categoryTemplate,
      context: {
        slug: category.slug,
      },
    })
    console.log(`Creating page for ${category.slug}`);
  })
}

async function fetchRicksAndTurnIntoNodes({ actions, createNodeId, createContentDigest }) {
  const res = await fetch('https://api.sampleapis.com/rickandmorty/characters');
  const ricks = await res.json();

  for (const rick of ricks) {
    const nodeMeta = {
      id: createNodeId(`rick-${rick.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Rick',
        mediaType: 'application/json',
        contentDigest: createContentDigest(rick),
      }
    };

    actions.createNode({
      ...rick,
      ...nodeMeta,
    });
  }
}

exports.sourceNodes = async (params) => {
  await Promise.all([fetchRicksAndTurnIntoNodes(params)]);
}

exports.createPages = async (params) => {
  await Promise.all([
    turnPostsIntoPages(params),
    turnCategoriesIntoPages(params)
  ])
}