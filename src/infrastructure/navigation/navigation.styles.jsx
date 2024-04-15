import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
  background: #000;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem calc((100vw - 1200px) / 2);
  z-index: 10;
`;
export const StyledTitle = styled.h1`
  margin-left: 20px;
  font-size: 1.5em;
  line-height: 1.4;
  color: white;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  position: absolute;
  float: right;
  gap: 0.8em;
  white-space: nowrap;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 0.5rem;
  height: 100%;
  width: max-content;
  cursor: pointer;
  &.active {
    color: #15cdfc;
  }
`;
