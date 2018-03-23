import React from "react";
import Page from "../components/Page";
import Button from "../components/Button";

const NotFoundPage = () => (
  <Page title="NOT FOUND">
    <p>You just hit a page that doesn&#39;t exist... the sadness.</p>
    <Button to="/search" style={{ marginRight: "0.5rem" }}>
      Search
    </Button>
    <Button to="/">Home</Button>
  </Page>
);

export default NotFoundPage;
