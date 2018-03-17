import React from "react";

export default function CommentForm({ slug }) {
  return (
    <form
      method="POST"
      action="https://api.staticman.net/v2/entry/housne/goharry.io/source/comments"
    >
      <input name="options[slug]" type="hidden" value={slug} />
      <label>
        <input name="fields[name]" type="text" />Name
      </label>
      <label>
        <input name="fields[email]" type="email" />E-mail
      </label>
      <label>
        <textarea name="fields[message]" />Message
      </label>
      <button type="submit">Go!</button>
    </form>
  );
}
