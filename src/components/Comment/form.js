import React, { PureComponent } from "react";
import axios from "axios";
import serialize from "form-serialize";
import styled from "styled-components";
import Button from "../../components/Button";

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
  @media (max-width: 700px) {
    display: block;
    padding-bottom: 0;
  }
`;

const Input = styled.input`
  width: 31%;
  box-sizing: border-box;
  border: solid 1px #ddd;
  padding: 0.5rem;
  border-radius: 4px;
  outline: 0;
  background: #fff;
  @media (max-width: 700px) {
    width: 100%;
    margin-bottom: 1rem;
  }
  &:focus {
    border-color: #607d8b;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 8rem;
  box-sizing: border-box;
  padding: 0.5rem;
  border: solid 1px #ddd;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 0.5rem;
  outline: 0;
  &:focus {
    border-color: #607d8b;
  }
`;

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
    if (this.state.requestStatus === RequestStatusEnum.PENDING) return;
    const data = serialize(event.target);
    this.setState({ requestStatus: RequestStatusEnum.PENDING });
    axios
      .post(AddCommentRequestUrl, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
      .then(({ data }) => {
        if (data && data.success) {
          this.form.reset();
          this.props.addComment(data.fields);
          this.setState({ requestStatus: RequestStatusEnum.SUCCESS });
        } else {
          this.setState({ requestStatus: RequestStatusEnum.FAIL });
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
        <InputGroup>
          <Input name="fields[name]" type="text" required placeholder="name" />
          <Input
            name="fields[email]"
            type="email"
            required
            placeholder="email"
          />
          <Input
            name="fields[url]"
            type="url"
            placeholder="website(optional)"
          />
        </InputGroup>
        <TextArea name="fields[message]" required />
        <div>
          <Button
            size="large"
            type="submit"
            processing={this.state.requestStatus === RequestStatusEnum.PENDING}
          >
            Submit
          </Button>
        </div>
      </form>
    );
  }
}
