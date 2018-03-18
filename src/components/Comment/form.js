import React, { PureComponent } from "react";
import axios from "axios";
import serialize from "form-serialize";

const RequestStatusEnum = {
  IDLE: 0,
  PENDING: 1,
  SUCCESS: 2,
  FAIL: 3
};

const AddCommentRequestUrl =
  "https://api.staticman.net/v2/entry/housne/goharry.io/source/comments";

export default class CommentForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      requestStatus: RequestStatusEnum.IDLE
    };
    this.form = undefined;
  }

  submitHandle(event) {
    event.preventDefault();
    const data = serialize(event.target);
    axios
      .post(AddCommentRequestUrl, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded " }
      })
      .then(({ data }) => {
        if (data && data.success) {
          this.props.addComment(data.fields);
          this.form.reset();
        }
      });
  }

  render() {
    const { slug, replyId } = this.props;
    return (
      <form
        method="POST"
        action={AddCommentRequestUrl}
        ref={form => (this.form = form)}
        onSubmit={this.submitHandle.bind(this)}
      >
        <input
          name="options[slug]"
          type="hidden"
          value={slug.replace(/\//g, "")}
        />
        <input name="fields[slug]" type="hidden" value={slug} />
        {replyId && (
          <input name="fields[parent]" type="hidden" value={replyId} />
        )}
        <label>
          <input name="fields[name]" type="text" required />Name
        </label>
        <label>
          <input name="fields[email]" type="email" required />E-mail
        </label>
        <label>
          <textarea name="fields[message]" required />Message
        </label>
        <button type="submit">Go!</button>
      </form>
    );
  }
}
