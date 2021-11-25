import * as React from "react";
import MovieSearch from "../components/MovieSearch";
import Layout from "../components/layout/Layout";

const IndexPage = () => {
  return (
    <Layout>
      <h1 className="title">Movie Handbook</h1>
      <MovieSearch />
    </Layout>
  );
};

export default IndexPage;
