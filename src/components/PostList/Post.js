import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

const Post = styled.div`
  margin: 2rem 0;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PostLink = styled(Link)`
  color: #333;
  &:hover {
    color: #607d8b;
  }
  em {
    color: #f57f17;
    font-style: normal;
  }
`;

const Excerpt = styled.div`
  color: #999;
  line-height: 1.7;
  em {
    color: #f57f17;
    font-style: normal;
  }
`;

export default ({ post }) => {
  return (
    <Post key={post.slug}>
      <Title>
        <PostLink to={post.slug}>{post.title}</PostLink>
      </Title>
      <Excerpt>{post.excerpt}</Excerpt>
    </Post>
  );
};
