import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { NavigationContainer, StyledTitle,NavLink } from "./navigation.styles";
import styled from "styled-components";


const Navigation = () => {
  const navigate = useNavigate();
   
 
  return (
    <Fragment>
      <NavigationContainer>
        <NavLink to={'/'}>Home</NavLink>
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
