import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  to: string;
  name: string;
};

export default function StyledLink({ to, name }: Props) {
  return (
    <NavLink
      className={({ isActive, isPending }) =>
        isActive ? "active" : isPending ? "pending" : ""
      }
      to={`/${to}`}
    >
      {name}
    </NavLink>
  );
}
