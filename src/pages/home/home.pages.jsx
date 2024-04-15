import React, { useState } from "react";
import styled from "styled-components";
import { Flashcard } from "../../components/flashcard/flashcard.component";


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;
const Title = styled.h2`
  margin-bottom: 20px;
  cursor: pointer;
`;

export const Home = () => {
  return <Container><Flashcard /></Container>;
};
