import React from "react";
import Link from "gatsby-link";
import PostList from "../components/PostList";
import styled from "styled-components";

const PostListContainer = styled.div`
  padding: 0;
`;

const IndexPage = ({ data: { allMarkdownRemark: { edges } } }) => {
  const posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => {
      return {
        ...edge.node.frontmatter,
        excerpt: edge.node.excerpt,
        slug: edge.node.fields.slug
      };
    });

  return (
    <PostListContainer>
      <PostList posts={posts} />
    </PostListContainer>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 120)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            path
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
