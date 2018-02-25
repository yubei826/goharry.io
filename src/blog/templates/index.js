import React, { Component } from "react";
import Link from "gatsby-link";
import PostList from "../../components/PostList";
import styled from "styled-components";
import Pagination from "../../components/Pagination";

const PostListContainer = styled.div`
  padding: 0;
`;

const IndexPage = ({ data, pathContext }) => {
  const { group } = pathContext;
  const posts = group
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
      <Pagination {...pathContext} />
    </PostListContainer>
  );
};

export default class IndexPageContainer extends Component {
  constructor(props) {
    super(props);
    this.script = undefined;
  }
  componentDidMount() {
    if (window.netlifyIdentity) return;
    this.script = document.createElement("script");
    document.body.appendChild(this.script);
    this.script.src =
      "https://identity.netlify.com/v1/netlify-identity-widget.js";
    this.script.onload = function() {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
      window.netlifyIdentity.init();
    };
  }
  render() {
    return <IndexPage {...this.props} />;
  }
}
