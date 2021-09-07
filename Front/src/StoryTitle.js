import React from "react";
import { Link } from "react-router-dom";

export default function StoryTitle({ children, href }) {
  return (
    <h1>
      <Link to={href}>{children}</Link>
    </h1>
  );
}
