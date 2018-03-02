import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import "./index.css";

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="易浩的个人简历" />
    {children()}
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
