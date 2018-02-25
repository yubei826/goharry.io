import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import throttle from "lodash.throttle";
import styled from "styled-components";
import Button from "../Button";

const DisqusComment = styled.div`
  padding-top: 1rem;
`;

const CommentPlaceHolder = styled.div`
  margin-top: 1.5rem;
  padding-bottom: 1rem;
  display: flex;
`;

const ErrorTip = styled.div`
  color: #999;
`;

const ErrorMessage = styled.div`
  position: relative;
  &:after {
    content: "";
    position: absolute;
    height: 2px;
    background: red;
    top: -5px;
    left: 0;
    width: 2rem;
  }
`;

export default class DisqusThreadComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      errMessage: ""
    };
    this.active = false;
    this.el = undefined;
    this.eventAttached = false;
    this.onScrollHandle = throttle(this.scrollHandle.bind(this), 300);
  }

  static propTypes = {
    shortname: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    identifier: PropTypes.string.isRequired
  };

  componentDidMount() {
    // if (this.isInViewport()) {
    //   this.loadScript();
    //   return;
    // }
    // window.addEventListener("scroll", this.onScrollHandle);
    // this.eventAttached = true;
  }

  componentWillUnmount() {
    // if (this.eventAttached) {
    //   window.removeEventListener("scroll", this.onScrollHandle);
    // }
  }

  activeComment() {
    this.setState({ active: true });
    this.loadScript();
  }

  scrollHandle() {
    if (this.active) return;
    if (!this.isInViewport()) return;
    this.active = true;
    this.loadScript();
    window.removeEventListener("scroll", this.onScrollHandle);
    this.eventAttached = false;
  }

  isInViewport() {
    const html = document.documentElement;
    const r = this.el.getBoundingClientRect();

    return (
      !!r &&
      r.bottom >= 0 &&
      r.right >= 0 &&
      r.top <= html.clientHeight &&
      r.left <= html.clientWidth
    );
  }

  loadScript() {
    const config = this.props;
    if (!window.DISQUS) {
      window.disqus_config = function() {
        this.page.url = window.document.location.href;
        this.page.identifier = config.identifier;
        this.page.title = config.title;
      };
      const script = document.createElement("script");
      script.src = `//${config.shortname}.disqus.com/embed.js`;
      script.setAttribute("data-timestamp", +new Date());
      script.onerror = () => this.setState({ errMessage: "Network Error" });
      document.body.appendChild(script);
    } else {
      window.DISQUS.reset({
        reload: true,
        config: function() {
          this.page.url = window.document.location.href;
          this.page.identifier = config.identifier;
          this.page.title = config.title;
        }
      });
    }
  }

  render() {
    return (
      <DisqusComment innerRef={el => (this.el = el)}>
        <div id="disqus_thread">
          <CommentPlaceHolder>
            {this.state.active && this.state.errMessage ? (
              <ErrorMessage>
                {this.state.errMessage}
                <ErrorTip>Caution: Disqus is unavailable in China</ErrorTip>
              </ErrorMessage>
            ) : (
              <Button
                size="large"
                onClick={this.activeComment.bind(this)}
                processing={this.state.active}
                block
              >
                Start Discuss
              </Button>
            )}
          </CommentPlaceHolder>
        </div>
      </DisqusComment>
    );
  }
}
