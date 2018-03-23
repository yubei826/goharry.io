import React from "react";
import GatsbyLink from "gatsby-link";
import PostList from "../../components/PostList";
import styled from "styled-components";
import Pagination from "../../components/Pagination";
import Content from "../../components/Content";
import MasterHeader from "../../components/MasterHeader";
import Button from "../../components/Button";

const TagHeader = styled.div`
  background: #eceff1;
  padding: 2rem 0;
`;

export default function Tags({ pathContext }) {
  const { tags, group, tag } = pathContext;
  console.log(tags);
  const posts = group;
  if (tag) {
    const postListData = posts
      .filter(node => !!node.frontmatter.date) // You can filter your posts based on some criteria
      .map(node => {
        return {
          ...node.frontmatter,
          excerpt: node.excerpt,
          slug: node.fields.slug
        };
      });
    return (
      <div>
        <MasterHeader>
          <h1 style={{ margin: 0, fontSize: "1.8rem" }}># {tag.name}</h1>
        </MasterHeader>
        <PostList posts={postListData} />
        {/* <GatsbyLink to="/tags">All tags</GatsbyLink> */}
        <Pagination {...pathContext} />
      </div>
    );
  }
  return (
    <div>
      <MasterHeader>
        <h1 style={{ margin: 0, fontSize: "1.8rem" }}>Tags</h1>
      </MasterHeader>
      <Content>
        <div className="tags" style={{ paddingTop: "2rem" }}>
          {tags.sort((a, b) => b.posts.length - a.posts.length).map(tag => {
            return (
              <Button
                key={tag.tag.slug}
                to={`/tags/${tag.tag.slug}`}
                style={{ margin: "0.5rem 1rem 0.5rem 0" }}
              >
                {tag.tag.name}
                <sup>{tag.posts.length}</sup>
              </Button>
            );
          })}
        </div>
      </Content>
    </div>
  );
}
