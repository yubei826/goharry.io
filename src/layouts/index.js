import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "styled-components";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "./index.css";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  padding-top: 53px;
  flex: 1;
`;

const TemplateWrapper = ({ children, data }) => {
  const { siteMetadata } = data.site;
  return (
    <Wrapper>
      <Content>
        <Helmet
          title={siteMetadata.title}
          meta={[
            { name: "description", content: siteMetadata.description },
            { name: "keywords", content: siteMetadata.keywords.join(", ") }
          ]}
        />
        <Header {...siteMetadata} />
        {children()}
      </Content>
      <Footer {...siteMetadata} />
    </Wrapper>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;

export const pageQuery = graphql`
  query SiteQuery {
    site {
      siteMetadata {
        title
        description
        keywords
      }
    }
  }
`;
