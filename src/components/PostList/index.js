import React from "react";
import styled from "styled-components";
import Content from "../Content";
import Post from "./Post";

const ListContainer = styled.div`
  margin: 0;
`;

export default function PostList({ posts }) {
  return (
    <Content>
      <ListContainer>
        {posts.map(post => {
          return <Post post={post} key={post.slug} />;
        })}
      </ListContainer>
    </Content>
  );
}
