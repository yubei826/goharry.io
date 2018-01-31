import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

const ListContainer = styled.div`
  margin: 0;
`;

const Post = styled.div`
  margin: 2rem 0;
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

const Excerpt = styled.div`
  color: #999;
  line-height: 1.7;
`;

export default function PostList({ posts }) {
  return (
    <ListContainer>
      {posts.map(post => {
        return (
          <Post key={post.slug}>
            <Title>
              <Link to={post.slug} style={{ color: "#333" }}>
                {post.title}
              </Link>
            </Title>
            <Excerpt>{post.excerpt}</Excerpt>
          </Post>
        );
      })}
    </ListContainer>
  );
}
