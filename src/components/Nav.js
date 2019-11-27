import React from "react";
import PropTypes from "prop-types";

const Nav = ({ title }) => {
  return (
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo left">
          {title}
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
Nav.defaultProps = {
  title: "Movie Finder"
};
Nav.propTypes = {
  title: PropTypes.string.isRequired
};

export default Nav;
