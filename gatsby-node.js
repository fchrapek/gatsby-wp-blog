const path = require(`path`);

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

exports.createPages = async (params) => {
  await turnPostsIntoPages(params);
}