import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentList from "./list";
import CommentForm from "./form";

export default class PostComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyId: undefined,
      comments: props.comments
    };
  }
  static propTypes = {
    slug: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired
  };

  replyHandle(id) {
    if (this.state.replyId === id) {
      this.setState({ replyId: undefined });
    } else {
      this.setState({ replyId: id });
    }
  }

  addComment(comment) {
    this.setState({ comments: this.state.comments.concat(comment) });
    if (this.state.replyId) {
      this.replyHandle();
    }
  }

  render() {
    const { replyId } = this.state;
    return (
      <div>
        <CommentList
          comments={this.state.comments}
          reply={this.replyHandle.bind(this)}
          slug={this.props.slug}
          replyId={replyId}
          form={replyId => (
            <CommentForm
              slug={this.props.slug}
              addComment={this.addComment.bind(this)}
              replyId={replyId}
            />
          )}
        />
        {!replyId && (
          <CommentForm
            slug={this.props.slug}
            addComment={this.addComment.bind(this)}
          />
        )}
      </div>
    );
  }
}
