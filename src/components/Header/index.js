import React, { Component } from "react";
import Link from "gatsby-link";
import styled, { className, css } from "styled-components";
import throttle from "lodash.throttle";
import SearchBox, { SearchIcon } from "./search";

const HEADER_HEIGHT = 52;

const HeaderWrapper = styled.div`
  background: #fff;
  border-bottom: solid 1px #ddd;
  height: 52px;
  position: fixed;
  top: 0;
  z-index: 9;
  width: 100%;
  box-sizing: border-box;
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
  opacity: 0;
  transition: opacity 0.2s;
  ${props =>
    props.active &&
    css`
      opacity: 1;
    `};
`;

const Brand = styled.h1`
  color: #418eb4;
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
  margin-right: 1.5rem;
  text-transform: uppercase;
  &:hover {
    color: #607d8b;
  }
  &.${props => props.activeClassName} {
    color: #607d8b;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      height: 3px;
      left: 0;
      right: 0;
      bottom: -1px;
      background: #607d8b;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  height: 28px;
  color: #fff;
  display: inline-flex;
  align-items: center;
  padding: 0 0.5rem;
  border-radius: 3px;
  margin: 0;
  border: 1px solid #607d8b;
  color: #607d8b;
  background: transparent;
  font-size: 14px;
  box-sizing: border-box;
  margin-left: 0.5rem;
  cursor: pointer;
  &:hover {
    background: #607d8b;
    color: #fff;
  }
`;

const SubscribeButton = Button.withComponent("a");

const HeaderSearchBox = styled.div`
  height: 51px;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 1rem;
  box-sizing: border-box;
  width: 100%;
  background: #fff;
  opacity: 0;
  transform: translateX(100%);
  visibility: hidden;
  transition: none;
  ${props =>
    props.active &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translateX(0);
      transition: opacity 0.5s 0.1s, transform 0.5s 0.1s;
    `};
`;

const CancelButton = Button.extend`
  opacity: 0;
  transition: all 0.2s;
  transform: scale(0);
  ${props =>
    props.active &&
    css`
      opacity: 1;
      transform: scale(1);
      transition: transform 0.2s 0.5s, opacity 0.2s 0.5s;
    `};
`;

const SearchForm = styled.div`
  flex: 1;
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      activeSearch: false
    };
    this.scrollY = 0;
    this.onScrollHandler = throttle(this.scrollHandle.bind(this), 100);
    this.searchBox = undefined;
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScrollHandler);
  }

  toggleSearch() {
    this.setState({ activeSearch: !this.state.activeSearch }, () => {
      if (this.state.activeSearch) {
        this.searchBox.focus();
      }
    });
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
        <div className="content" style={{ position: "relative" }}>
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
          <HeaderContent active={!this.state.activeSearch}>
            <Menu>
              <NavLink to="/" exact activeClassName="active">
                Home
              </NavLink>
              <NavLink to="/contact" activeClassName="active">
                contact
              </NavLink>
            </Menu>
            <Buttons>
              <SearchIcon size="22" onClick={this.toggleSearch.bind(this)} />
              <SubscribeButton href="/rss.xml">Subscribe</SubscribeButton>
            </Buttons>
          </HeaderContent>
          <HeaderSearchBox active={this.state.activeSearch}>
            <SearchForm>
              <SearchBox
                toggleSearch={this.toggleSearch.bind(this)}
                ref={searchBox => (this.searchBox = searchBox)}
              />
            </SearchForm>
            <CancelButton
              active={this.state.activeSearch}
              onClick={this.toggleSearch.bind(this)}
            >
              Cancel
            </CancelButton>
          </HeaderSearchBox>
        </div>
      </HeaderWrapper>
    );
  }
}

export default Header;
