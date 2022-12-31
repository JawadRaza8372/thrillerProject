import React from "react";
import "./term-links.styles.scss";

export const TermLinks = () => {
  return (
    <div className="term-links-container">
      <a className="term_link_a" href="/about">
        ABOUT
      </a>
      <p className="term_link_p">|</p>
      <a className="term_link_a" href="/privacy">
        PRIVACY
      </a>
      <p className="term_link_p">|</p>
      <a className="term_link_a" href="/terms">
        TERMS
      </a>
      <p className="term_link_p">|</p>
      <a className="term_link_a" href="/faq">
        FAQ
      </a>
      <p className="term_link_p">|</p>
      <a className="term_link_a" href="/contact">
        CONTACT US
      </a>
    </div>
  );
};
