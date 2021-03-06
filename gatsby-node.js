/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path");
var crypto = require("crypto");
const createPaginatedPages = require("./pagination");

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type !== "MarkdownRemark") return;
  const pathName = getFileName(node.fileAbsolutePath);
  const slug = `/${generateSlugHash(pathName)}`;
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

    createPagination(createPage, edges, "src/blog/templates/index.js");

    createPosts(createPage, edges);

    createTagPages(createPage, edges);
  });
};

function createPagination(
  createPage,
  edges,
  template,
  context = {},
  pageLength = 10,
  pathPrefix = ""
) {
  createPaginatedPages({
    edges,
    createPage,
    pageLength,
    context,
    pathPrefix,
    pageTemplate: template
  });
}

function createPosts(createPage, edges) {
  const blogPostTemplate = path.resolve(`src/blog/templates/post.js`);

  edges.forEach(({ node }, index) => {
    let context = {
      slug: node.fields.slug
    };
    if (index > 0) {
      context.prev = edges[index - 1].node;
    }
    if (index < edges.length - 1) {
      context.next = edges[index + 1].node;
    }
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: context
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
    createPagination(
      createPage,
      tag.posts,
      `src/blog/templates/tags.js`,
      { tags, tag: tag.tag },
      10,
      `tags/${tag.tag.slug}`
    );
    // createPage({
    //   path: `/tags/${tag.tag.slug}`,
    //   component: tagTemplate,
    //   context: {
    //     tags,
    //     tag: tag.tag,
    //     posts: tag.posts
    //   }
    // });
  });
};

function generateSlugHash(slug) {
  return crypto
    .createHash("md5")
    .update(slug)
    .digest("hex")
    .slice(0, 10);
}

function getFileName(filePath) {
  return filePath.split("/").slice(-1)[0];
}
