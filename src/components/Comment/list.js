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
      {!comments.length ? (
        <EmptyList>No comments yet!</EmptyList>
      ) : (
        formatCommentsData(comments).map(comment => (
          <Comment
            comment={comment}
            key={comment._id || comment.date}
            replyId={replyId}
            slug={slug}
            reply={reply}
            form={form}
          />
        ))
      )}
    </CommentList>
  );
}

const CommentItem = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: #ddd;
`;

const CommentContent = styled.div`
  flex: 1;
  padding-left: 1rem;
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
`;

const ReplyBox = styled.div`
  padding-top: 1rem;
`;

const CommentHeader = styled.div`
  padding: 0;
  color: #999;
`;

export function Comment({ comment, replyId, slug, reply, form }) {
  return (
    <CommentItem>
      <Avatar
        src={`https://www.gravatar.com/avatar/${comment.email}?s=40&d=mm`}
        alt={comment.name}
      />
      <CommentContent>
        <CommentHeader>
          <CommentAuthor comment={comment} />
          {comment.parentNode && (
            <span>
              {" "}
              REPLY TO <CommentAuthor comment={comment.parentNode} />
            </span>
          )}
        </CommentHeader>
        <CommentText>{comment.message}</CommentText>
        <div>
          <CommentDate>
            {dateFormat(new Date(comment.date * 1000), "yyyy-mm-dd HH:MM")}
          </CommentDate>
          {comment._id && (
            <ReplyButton onClick={() => reply(comment._id)}>
              {replyId === comment._id ? "CANCEL" : "REPLY"}
            </ReplyButton>
          )}
        </div>
        {comment._id &&
          replyId === comment._id && <ReplyBox>{form(replyId)}</ReplyBox>}
      </CommentContent>
    </CommentItem>
  );
}

const Author = styled.strong`
  color: #333;
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
