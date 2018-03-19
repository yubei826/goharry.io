import React from "react";
import styled from "styled-components";
import "./post.css";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import Disqus from "../../components/Disqus";
import PostNavigation from "../../components/PostNavigation";
import MasterHeader from "../../components/MasterHeader";
import Content from "../../components/Content";
import Button from "../../components/Button";
import Share from "../../components/Share";
import SubscribeForm from "../../components/Subscribe";
import PostComments from "../../components/Comment/comment";

const PostDate = styled.time`
  color: #999;
  font-size: 14px;
`;

const Post = styled.div`
  padding-top: 0;
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
  padding-top: 1rem;
  p {
    line-height: 1.7;
    word-break: break-word;
    text-align: justify;
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
  @media (max-width: 700px) {
    img {
      margin-left: -1rem;
      margin-right: -1rem;
      width: calc(100% + 2rem);
    }
  }
`;

const PostMeta = styled.div`
  padding-top: 1rem;
  display: flex;
  align-items: center;
`;

const Tags = styled.div`
  flex: 1;
`;

const Tag = styled(Button)`
  margin-right: 0.5rem;
`;

const CommentBox = styled.div`
  background: rgba(236, 239, 241, 0.4);
  padding: 2rem 0;
  border-top: solid 1px #ddd;
  margin-top: 1.5rem;
  margin-bottom: -2rem;
`;

const CommentLabel = styled.h4`
  margin: 0;
  padding-bottom: 2rem;
  line-height: 1;
`;

export default function PostTemplate({
  data, // this prop will be injected by the GraphQL query below.
  pathContext,
  ...props
}) {
  const { markdownRemark, site, allCommentsYaml } = data; // data.markdownRemark holds our post data
  const { frontmatter, html, fields, excerpt } = markdownRemark;
  const comments = allCommentsYaml
    ? allCommentsYaml.edges.map(edge => edge.node)
    : [];
  return (
    <Post>
      <Helmet
        title={frontmatter.title}
        meta={[
          { name: "description", content: excerpt },
          {
            name: "keywords",
            content: fields.tags.map(t => t.name).join(", ")
          }
        ]}
      />
      <MasterHeader>
        <Title>{frontmatter.title}</Title>
        <PostDate>{frontmatter.date}</PostDate>
      </MasterHeader>
      <Content>
        <PostContent dangerouslySetInnerHTML={{ __html: html }} />
        <PostMeta>
          <Tags>
            {fields.tags.map(tag => (
              <Tag key={tag.slug} to={`/tags/${tag.slug}`}>
                {tag.name}
              </Tag>
            ))}
          </Tags>
          <Share
            url={site.siteMetadata.siteUrl + fields.slug}
            title={frontmatter.title}
          />
        </PostMeta>
        <SubscribeForm />
        <PostNavigation {...pathContext} />
        {/* <Disqus
          title={frontmatter.title}
          identifier={fields.slug.replace("/", "")}
          shortname={site.siteMetadata.disqusShortName}
        /> */}
      </Content>
      {(!frontmatter.comment || frontmatter.comment !== "closed") && (
        <CommentBox>
          <Content>
            <CommentLabel>COMMENTS({comments.length})</CommentLabel>
            <PostComments comments={comments} slug={fields.slug} />
          </Content>
        </CommentBox>
      )}
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
        date(formatString: "YYYY-MM-DD")
        path
        title
      }
    }
    site {
      siteMetadata {
        disqusShortName
        siteUrl
      }
    }
    allCommentsYaml(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          _id
          name
          email
          message
          date
          slug
        }
      }
    }
  }
`;
