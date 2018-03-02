module.exports = {
  siteMetadata: {
    title: "Gatsby Default Starter"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    `gatsby-transformer-json`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `resume`,
        path: `${__dirname}/src/data/`
      }
    }
  ]
};
