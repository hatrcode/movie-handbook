import * as React from "react";
import Layout from "../components/layout/Layout";
import Seo from "../components/layout/SEO";
import { Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Movie Handbook" />
      <div className="main-page">
        <Typography variant="h3" component="h2" gutterBottom>
          Movie Handbook
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Search your favorite movies.
        </Typography>
        <div style={{ marginTop: "1rem" }}>
          <SearchBar />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
