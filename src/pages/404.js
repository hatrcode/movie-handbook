import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "gatsby";
import Seo from "../components/layout/SEO";

const Error = () => {
  return (
    <Layout>
      <Seo title="Page Not Found" />
      <main className="error-page">
        <div className="error-container">
          <h1>404 Page</h1>
          <p>Sorry. We couldn’t find what you were looking for.</p>
          <Link to="/" className="btn">
            Back to Homepage
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default Error;
