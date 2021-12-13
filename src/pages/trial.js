import React from "react";
import loadable from "@loadable/component";
import Layout from "../components/layout/Layout";
import Seo from "../components/layout/SEO";
import { movieData } from "../constants/movieData";

const ItemCards = loadable(() => import("../components/items/ItemCards"));

const Trial = () => {
  return (
    <Layout>
      <Seo title="Trending" />
      <div className="main-page">
        <h2>Hello</h2>
        <ItemCards content={movieData.results} />
      </div>
    </Layout>
  );
};

export default Trial;
