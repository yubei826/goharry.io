import React from "react";

export default function Comments({ comments, replyId, slug, reply, form }) {
  return (
    <div>
      {comments.map(comment => (
        <Comment
          comment={comment}
          key={comment._id || comment.date}
          replyId={replyId}
          slug={slug}
          reply={reply}
          form={form}
        />
      ))}
    </div>
  );
}

export function Comment({ comment, replyId, slug, reply, form }) {
  return (
    <div>
      <img src={`https://www.gravatar.com/avatar/${comment.email}?s=60&d=mm`} />
      <div>
        <h4>{comment.name}</h4>
        <div>{comment.message}</div>
        <div>
          {comment._id && (
            <button onClick={() => reply(comment._id)}>
              {replyId === comment._id ? "cancel" : "reply"}
            </button>
          )}
        </div>
      </div>
      {comment._id && replyId === comment._id && <div>{form(replyId)}</div>}
    </div>
  );
}
