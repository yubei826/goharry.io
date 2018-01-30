import React, { Component } from "react";
import Link from "gatsby-link";
import styled, { className, css } from "styled-components";
import throttle from "lodash.throttle";

const HEADER_HEIGHT = 52;

const HeaderWrapper = styled.div`
  background: #fff;
  border-bottom: solid 1px #ddd;
  height: 52px;
  position: fixed;
  top: 0;
  z-index: 9;
  width: 100%;
  transform: translateY(-53px);
  transition: transform 0.1s;
  ${props =>
    props.active &&
    css`
      transform: translateY(0);
    `};
`;

const HeaderContent = styled.div`
  display: flex;
  height: 52px;
  align-items: center;
`;

const Brand = styled.h1`
  color: #663399;
  text-transform: uppercase;
  font-size: 1.3rem;
  font-weight: 500;
  margin: 0;
`;

const Menu = styled.nav`
  flex: 1;
`;

const NavLink = styled(Link)`
  color: #333;
  display: inline-flex;
  height: 52px;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  &:hover {
    color: #663399;
  }
  &.${props => props.activeClassName} {
    color: #663399;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      height: 3px;
      left: 0;
      right: 0;
      bottom: -1px;
      background: #663399;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

const SubscribeButton = styled.a`
  height: 28px;
  color: #fff;
  display: inline-flex;
  align-items: center;
  padding: 0 0.5rem;
  border-radius: 3px;
  margin: 0;
  border: 1px solid #663399;
  color: #663399;
  background: transparent;
  font-size: 14px;
  &:hover {
    background: #663399;
    color: #fff;
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true
    };
    this.scrollY = 0;
    this.onScrollHandler = throttle(this.scrollHandle.bind(this), 100);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScrollHandler);
  }

  scrollHandle() {
    const scrollY = window.pageYOffset;
    const { active } = this.state;
    if (scrollY <= HEADER_HEIGHT) {
      if (!active) {
        this.setState({ active: true });
      }
    } else if (scrollY < this.scrollY) {
      // scroll up
      if (!active) {
        this.setState({ active: true });
      }
    } else if (scrollY > this.scrollY) {
      // scroll down
      if (active) {
        this.setState({ active: false });
      }
    }
    this.scrollY = scrollY;
  }

  render() {
    return (
      <HeaderWrapper active={this.state.active}>
        <div className="content">
          <HeaderContent>
            {/* <Brand>
          <Link
            to="/"
            style={{
              color: "#663399"
            }}
          >
            {title}
          </Link>
        </Brand> */}
            <Menu>
              <NavLink to="/" exact activeClassName="active">
                Home
              </NavLink>
            </Menu>
            <Buttons>
              <SubscribeButton href="/rss.xml">subscribe</SubscribeButton>
            </Buttons>
          </HeaderContent>
        </div>
      </HeaderWrapper>
    );
  }
}

export default Header;
