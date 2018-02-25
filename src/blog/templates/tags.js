import React from "react";
import GatsbyLink from "gatsby-link";
import PostList from "../../components/PostList";
import styled from "styled-components";
import Pagination from "../../components/Pagination";

const TagHeader = styled.div`
  background: #eceff1;
  padding: 2rem 0;
`;

export default function Tags({ pathContext }) {
  const { tags, group, tag } = pathContext;
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
        <TagHeader>
          <div className="content">
            <h1 style={{ margin: 0, fontSize: "1.8rem" }}>
              posts tagged with {tag.name}
            </h1>
          </div>
        </TagHeader>
        <PostList posts={postListData} />
        {/* <GatsbyLink to="/tags">All tags</GatsbyLink> */}
        <Pagination {...pathContext} />
      </div>
    );
  }
  return (
    <div>
      <h1>Tags</h1>
      <ul className="tags">
        {tags.map(tag => {
          return (
            <li key={tag.tag.slug}>
              <GatsbyLink to={`/tags/${tag.tag.slug}`}>
                {tag.tag.name}
                {tag.posts.length}
              </GatsbyLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
