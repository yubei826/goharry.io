import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import throttle from "lodash.throttle";
import styled from "styled-components";

const DisqusComment = styled.div`
  padding-top: 2rem;
`;

export default class DisqusThreadComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.active = false;
    this.el = undefined;
    this.eventAttached = false;
    this.onScrollHandle = throttle(this.scrollHandle.bind(this), 100);
  }

  static propTypes = {
    shortname: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    identifier: PropTypes.string.isRequired
  };

  componentDidMount() {
    if (this.isInViewport()) {
      this.loadScript();
      return;
    }
    window.addEventListener("scroll", this.onScrollHandle);
    this.eventAttached = true;
  }

  componentWillUnmount() {
    if (this.active) {
      window.removeEventListener("scroll", this.onScrollHandle);
    }
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
        <div id="disqus_thread" />
      </DisqusComment>
    );
  }
}
