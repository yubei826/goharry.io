import React, { PureComponent } from "react";
import ActionSheet from "../ActionSheet";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FacebookIcon, GoogleIcon, TwitterIcon, WeiboIcon } from "../Icons";

const SHARE_PROVIDERS = ["facebook", "twitter", "google", "weibo"];

let shareWindowReference = null;
let lastActiveShareProvider = "";

const ShareProviders = styled.div`
  display: flex;
`;

export default class ShareActionSheet extends PureComponent {
  constructor(props) {
    super(props);
    this.actionSheet = undefined;
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  };

  toggle() {
    this.actionSheet.toggle();
  }

  render() {
    return (
      <ActionSheet ref={sheet => (this.actionSheet = sheet)}>
        <ShareProviders>
          {SHARE_PROVIDERS.map(provider => (
            <ShareProvider provider={provider} key={provider} {...this.props} />
          ))}
        </ShareProviders>
      </ActionSheet>
    );
  }
}

const SocialProviderItem = styled.a`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const ProviderLabel = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  color: #333;
  text-transform: capitalize;
`;

function ShareProvider({ provider, title, url }) {
  const shareUrl = generateShareUrl(
    provider,
    encodeURIComponent(url),
    encodeURIComponent(title)
  );
  const clickHandle = e => {
    e.preventDefault();
    openShareWindow(shareUrl, provider);
  };
  return (
    <SocialProviderItem href={shareUrl} onClick={clickHandle}>
      <ProviderIcon provider={provider} />
      <ProviderLabel>{provider}</ProviderLabel>
    </SocialProviderItem>
  );
}

function ProviderIcon({ provider }) {
  switch (provider) {
    case "facebook":
      return <FacebookIcon size="48" />;
    case "google":
      return <GoogleIcon size="48" />;
    case "twitter":
      return <TwitterIcon size="48" />;
    case "weibo":
      return <WeiboIcon size="48" />;
  }
}

function generateShareUrl(provider, url, title) {
  switch (provider) {
    case "facebook":
      return `https://www.facebook.com/sharer.php?u=${url}&title=${title}`;
    case "google":
      return `https://plus.google.com/share?url=${url}&title=${title}`;
    case "twitter":
      return `https://twitter.com/intent/tweet?url=${url}&title=${title}`;
    case "weibo":
      return `http://service.weibo.com/share/share.php?title=${title}&url=${url}`;
  }
}

function openShareWindow(url, provider) {
  if (
    shareWindowReference == null ||
    shareWindowReference.closed ||
    provider !== lastActiveShareProvider
  ) {
    shareWindowReference = window.open(
      url,
      "ShareWindow",
      "resizable,scrollbars,status, width=600, height=600"
    );
    lastActiveShareProvider = provider;
  } else {
    console.log(shareWindowReference);
    shareWindowReference.focus();
  }
}
