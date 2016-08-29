import React, { Component } from 'react';
import Helmet from "react-helmet";

const App = ({ children }) => {
  return (
      <div>
        <Helmet
            titleTemplate="Welcome to my website - %s"
            script={[ {
                "type": "application/ld+json",
                innerHTML: `{
                  "@context": "http://schema.org",
                  "@type": "WebSite"
                }`
              } ]}
            />

        <header>
          <h1>Welcome!</h1>
        </header>

        {children}

        <footer>
          <small>Thanks for checking out this example.</small>
        </footer>
      </div>
  );
};

export default App;
