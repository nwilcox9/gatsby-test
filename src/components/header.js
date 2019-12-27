import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <StyledLink to={props.to} activeStyle={props.activeStyle}>
      {props.children}
    </StyledLink>
  </li>
);

const StyledLink = styled(Link)`
  color: white;
  font-family: sans-serif;
  text-decoration: none;
`;

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#208dcd`,
      marginBottom: `1.45rem`
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
        display: `flex`
      }}
    >
      <h2 style={{ margin: 0, flex: 1 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`
          }}
        >
          {siteTitle}
        </Link>
      </h2>
      <div style={{ maxHeight: 30, alignSelf: "flex-end" }}>
        <ul style={{ listStyle: `none`, float: `right` }}>
          <ListLink to="/" activeStyle={{ color: "#9bcdeb" }}>
            Superheros
          </ListLink>
          <ListLink to="/space/" activeStyle={{ color: "#9bcdeb" }}>
            Space
          </ListLink>
        </ul>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
