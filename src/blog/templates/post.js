import React from "react";
import styled from "styled-components";
import "./post.css";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import Disqus from "../../components/Disqus";
import PostNavigation from "../../components/PostNavigation";

const PostDate = styled.time`
  color: #999;
  font-size: 14px;
`;

const Post = styled.div`
  padding-top: 2rem;
`;

const Title = styled.h1`
  font-size: 1.7rem;
  padding: 0.5rem 0 1rem;
  text-transform: uppercase;
  line-height: 1.4;
  font-weight: 500;
  margin: 0;
  padding: 0;
`;

const PostContent = styled.div`
  p {
    line-height: 1.7;
    word-break: break-word;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1.5rem 0 1rem;
    font-family: "SF Pro SC", "SF Pro Display", "SF Pro Icons", "PingFang SC",
      "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    line-height: 1;
    font-weight: 500;
  }
  h1 {
    font-size: 1.6rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.4rem;
  }
  h4 {
    font-size: 1.4rem;
  }
  h5 {
    font-size: 1.2rem;
  }
  h6 {
    font-size: 1.2rem;
  }
  code {
    color: #607d8b;
    background: rgba(236, 239, 241, 0.4);
    padding: 0 0.3rem;
    border-radius: 2px;
  }
  img {
    max-width: 100%;
  }
`;

const Tags = styled.div`
  padding-top: 1rem;
`;

const Tag = styled(Link)`
  height: 32px;
  display: inline-flex;
  align-items: center;
  padding: 0 1rem;
  border-radius: 2px;
  background: #eceff1;
  color: #455a64;
  margin-right: 0.5rem;
  &:hover {
    background: #90a4ae;
    color: #fff;
  }
`;

export default function PostTemplate({
  data, // this prop will be injected by the GraphQL query below.
  pathContext
}) {
  const { markdownRemark, site } = data; // data.markdownRemark holds our post data
  const { frontmatter, html, fields, excerpt } = markdownRemark;
  return (
    <Post>
      <Helmet
        title={frontmatter.title}
        meta={[
          { name: "description", content: excerpt },
          { name: "keywords", content: fields.tags.map(t => t.name).join(", ") }
        ]}
      />
      <PostDate>{frontmatter.date}</PostDate>
      <Title>{frontmatter.title}</Title>
      <PostContent dangerouslySetInnerHTML={{ __html: html }} />
      <Tags>
        {fields.tags.map(tag => (
          <Tag key={tag.slug} to={`/tags/${tag.slug}`}>
            {tag.name}
          </Tag>
        ))}
      </Tags>
      <PostNavigation {...pathContext} />
      <Disqus
        title={frontmatter.title}
        identifier={fields.slug.replace("/")}
        shortname={site.siteMetadata.disqusShortName}
      />
    </Post>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 120)
      fields {
        slug
        tags {
          name
          slug
        }
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
    site {
      siteMetadata {
        disqusShortName
      }
    }
  }
`;
