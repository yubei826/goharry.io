import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../Button";
import ShareActionSheet from "./Share";
import { ShareIcon } from "../Icons";

const ShareButton = styled.button`
  background: none;
  border: none;
  outline: 0;
  display: inline-flex;
  align-items: center;
  margin: 0;
  padding: 5px;
  background: #eceff1;
  border-radius: 50%;
  cursor: pointer;
`;

export default class Share extends PureComponent {
  constructor(props) {
    super(props);
    this.shareSheet = undefined;
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  };

  share() {
    if (navigator.share) {
      const { url, title } = this.props;
      navigator.share({
        url,
        title,
        text: title
      });
      return;
    }
    this.shareSheet.toggle();
  }

  render() {
    return (
      <div>
        <ShareButton onClick={this.share.bind(this)}>
          <ShareIcon size="24" color="#607d8b" />
        </ShareButton>
        <ShareActionSheet
          {...this.props}
          ref={shareSheet => (this.shareSheet = shareSheet)}
        />
      </div>
    );
  }
}
