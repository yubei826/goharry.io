import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const Post = PropTypes.shape({
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  fields: PropTypes.shape({
    slug: PropTypes.string.isRequired
  })
});

const PostNavs = styled.div`
  display: flex;
  padding-top: 2rem;
  @media (max-width: 700px) {
    display: block;
  }
`;

const GapSpace = styled.div`
  width: 1rem;
`;

export default function PostNavigation({ next, prev }) {
  return (
    <PostNavs>
      <PostNavLink post={prev} text="previous" />
      <GapSpace />
      <PostNavLink post={next} text="next" right />
    </PostNavs>
  );
}

PostNavigation.propTypes = {
  next: Post,
  prev: Post
};

const PostNavItem = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 700px) {
    padding-bottom: 1rem;
  }
  ${props =>
    props.right &&
    css`
      text-align: right;
      @media (max-width: 700px) {
        text-align: left;
        padding-bottom: 0;
      }
    `};
`;

const Empty = styled.div`
  flex: 1;
`;

const SubTitle = styled.div`
  color: #999;
  text-transform: uppercase;
  font-size: 0.8rem;
`;

const Title = styled.h5`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 400;
  color: #333;
  &:hover {
    color: #607d8b;
  }
`;

export function PostNavLink({ post, text, right }) {
  if (!post) {
    return <Empty />;
  }
  return (
    <PostNavItem right={right}>
      <Link to={`${post.fields.slug}`}>
        <SubTitle>{text}</SubTitle>
        <Title>{post.frontmatter.title}</Title>
      </Link>
    </PostNavItem>
  );
}

PostNavLink.propTypes = {
  post: Post,
  text: PropTypes.oneOf(["next", "previous"]),
  right: PropTypes.bool
};
