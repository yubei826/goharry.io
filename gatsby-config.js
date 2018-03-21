const query = `{
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
        }
        fields {
          slug
          tags {
            name
          }
        }
        html
        excerpt(pruneLength: 120)
      }
    }
  }
}`;

const queries = [
  {
    query,
    transformer: ({ data }) => {
      return data.allMarkdownRemark.edges.map(({ node }) =>
        Object.assign({}, node, { objectID: node.fields.slug })
      );
    }
  }
];

module.exports = {
  siteMetadata: {
    title: `Harry`,
    siteUrl: `https://goharry.io`,
    description: "log",
    keywords: ["javascript", "node", "react"],
    disqusShortName: "devharry"
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/blog/posts`,
        name: "blog-posts"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/blog/pages`,
        name: "blog-pages"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/_data`,
        name: "staticman-data"
      }
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-plugin-sharp`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-"
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
              linkImagesToOriginal: true,
              sizeByPixelDensity: false
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `tomato`,
        // Disable the loading spinner.
        showSpinner: true
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-1655372-9",
        // Setting this parameter is optional
        anonymize: true
      }
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: "ZO2N7VNXMJ",
        apiKey: "989fe7d662be4adea2a53ff26b1b08f9",
        indexName: "goharry.io",
        queries,
        chunkSize: 10000 // default: 1000
      }
    },
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-feed`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sitemap`
  ]
};
