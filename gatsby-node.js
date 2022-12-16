const path = require(`path`);
const fetch = require(`isomorphic-fetch`);


async function turnPostsIntoPages({ graphql, actions }) {
  const postTemplate = path.resolve('./src/templates/Post.js');
  const { data } = await graphql(`
    query {
      posts: allWpPost {
        totalCount
        nodes {
          slug
          title
        }
      }
    }
  `);

  data.posts.nodes.forEach(post => {
    actions.createPage({
      path: `/${post.slug}`,
      component: postTemplate,
      context: {
        slug: post.slug,
      },
    })
  });

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.posts.totalCount / pageSize);

  Array.from({ length: pageCount }).forEach((_, i) => {

    actions.createPage({
      path: `/${i + 1}`,
      component: path.resolve('./src/pages/index.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    })
  })
}

async function turnCategoriesIntoPages({ graphql, actions }) {
  const categoryTemplate = path.resolve('./src/pages/index.js');

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
      path: `temat/${category.slug}`,
      component: categoryTemplate,
      context: {
        slug: category.slug,
      },
    })
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