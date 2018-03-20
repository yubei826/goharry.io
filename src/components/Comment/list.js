import React from "react";
import styled from "styled-components";
import dateFormat from "dateformat";

const CommentList = styled.div`
  background: transparent;
`;

const EmptyList = styled.div`
  padding: 3rem 0 5rem;
  text-align: center;
  color: #999;
  font-size: 1.4rem;
`;

export default function Comments({ comments, replyId, slug, reply, form }) {
  return (
    <CommentList>
      {formatCommentsData(comments).map(comment => (
        <Comment
          comment={comment}
          key={comment._id || comment.date}
          replyId={replyId}
          slug={slug}
          reply={reply}
          form={form}
        />
      ))}
    </CommentList>
  );
}

const CommentItem = styled.div`
  margin-bottom: 2rem;
  background: #fff;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.04),
    0 2px 2px 0 rgba(0, 0, 0, 0.04), 0 1px 5px 0 rgba(0, 0, 0, 0.04);
  border-radius: 2px;
`;

const Avatar = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: #ddd;
  margin-right: 1rem;
`;

const CommentContent = styled.div`
  flex: 1;
  padding: 1rem;
`;

const CommentText = styled.div`
  line-height: 1.6;
`;

const ReplyButton = styled.button`
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  outline: 0;
  color: #666;
  font-size: 0.8rem;
  cursor: pointer;
`;

const CommentDate = styled.time`
  color: #666;
  font-size: 0.8rem;
  padding-right: 0.5rem;
  flex: 1;
`;

const ReplyBox = styled.div`
  padding: 1rem;
`;

const CommentHeader = styled.div`
  padding: 0 1rem;
  color: #999;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px #eee;
`;

const CommentFooter = styled.div`
  height: 40px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  border-top: solid 1px #eee;
  background: rgba(236, 239, 241, 0.4);
`;

export function Comment({ comment, replyId, slug, reply, form }) {
  return (
    <CommentItem>
      <CommentHeader>
        <Avatar
          src={`https://www.gravatar.com/avatar/${comment.email}?s=30&d=mm`}
          alt={comment.name}
        />
        <CommentAuthor comment={comment} />
        {comment.parentNode && (
          <span>
            <span style={{ padding: "0 0.3rem" }}>reply to</span>
            <CommentAuthor comment={comment.parentNode} />
          </span>
        )}
      </CommentHeader>
      <CommentContent>
        <CommentText>{comment.message}</CommentText>
      </CommentContent>
      <CommentFooter>
        <CommentDate>
          {dateFormat(new Date(comment.date * 1000), "yyyy-mm-dd HH:MM")}
        </CommentDate>
        {comment._id && (
          <ReplyButton onClick={() => reply(comment._id)}>
            {replyId === comment._id ? "CANCEL" : "REPLY"}
          </ReplyButton>
        )}
      </CommentFooter>
      {comment._id &&
        replyId === comment._id && <ReplyBox>{form(replyId)}</ReplyBox>}
    </CommentItem>
  );
}

const Author = styled.strong`
  color: #333;
  font-weight: 400;
  strong {
    font-weight: 400;
  }
`;

const AuthorLink = Author.withComponent("a");

function CommentAuthor({ comment }) {
  if (!comment.url) return <Author>{comment.name}</Author>;
  return (
    <AuthorLink href={comment.url}>
      <strong>{comment.name}</strong>
    </AuthorLink>
  );
}

function formatCommentsData(comments) {
  return comments.sort((a, b) => a.date - b.date).map(comment => {
    if (!comment._parent) return comment;
    const parentNode = comments.find(c => c._id === comment._parent);
    return {
      ...comment,
      parentNode
    };
  });
}
