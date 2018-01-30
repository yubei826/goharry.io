/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path");
var crypto = require("crypto");

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type !== "MarkdownRemark") return;
  const slug = generateSlugHash(node.frontmatter.title);
  createNodeField({ node, name: "slug", value: slug });
  if (!node.frontmatter.tags) return;
  const tags = node.frontmatter.tags.map(tag =>
    Object.assign({}, { name: tag, slug: generateSlugHash(tag) })
  );
  createNodeField({ node, name: "tags", value: tags });
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            excerpt(pruneLength: 120)
            fields {
              slug
              tags {
                name
                slug
              }
            }
            frontmatter {
              path
              title
              date
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const edges = result.data.allMarkdownRemark.edges;

    createPosts(createPage, edges);

    createTagPages(createPage, edges);
  });
};

function createPosts(createPage, edges) {
  const blogPostTemplate = path.resolve(`src/blog/templates/post.js`);

  edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: node.fields.slug
      } // additional data can be passed via context
    });
  });
}

const createTagPages = (createPage, edges) => {
  // Tell it to use our tags template.
  const tagTemplate = path.resolve(`src/blog/templates/tags.js`);
  // Create an empty object to store the posts.
  const allTags = new Map();
  console.log("creating posts");

  // Loop through all nodes (our markdown posts) and add the tags to our post object.

  edges.forEach(({ node }) => {
    if (node.fields.tags) {
      node.fields.tags.forEach(tag => {
        const slug = tag.slug;
        const posts = allTags.has(slug)
          ? allTags.get(slug).posts.concat(node)
          : [node];
        allTags.set(tag.slug, {
          tag,
          posts
        });
      });
    }
  });

  const tags = Array.from(allTags.values());

  // Create the tags page with the list of tags from our posts object.
  createPage({
    path: "/tags",
    component: tagTemplate,
    context: {
      tags
    }
  });

  // For each of the tags in the post object, create a tag page.

  allTags.forEach((tag, key) => {
    createPage({
      path: `/tags/${tag.tag.slug}`,
      component: tagTemplate,
      context: {
        tags,
        tag: tag.tag,
        posts: tag.posts
      }
    });
  });
};

function generateSlugHash(slug) {
  return crypto
    .createHash("md5")
    .update(slug)
    .digest("hex")
    .slice(0, 10);
}
