import React from "react";
import GatsbyLink from "gatsby-link";
import PostList from "../../components/PostList";

export default function Tags({ pathContext }) {
  const { tags, posts, tag } = pathContext;
  if (tag) {
    console.log(posts);
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
        <h1>
          {posts.length} post{posts.length === 1 ? "" : "s"} tagged with{" "}
          {tag.name}
        </h1>
        <PostList posts={postListData} />
        {/* <GatsbyLink to="/tags">All tags</GatsbyLink> */}
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
