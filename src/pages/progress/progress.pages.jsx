import React from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;
const Text = styled.div`
  margin-bottom: 20px;
  font-size:20px;
  line-height:1.4;
  cursor: pointer;
`;

export const Progress =()=> {
  const flashcards = useSelector(state => state.flashcards.flashcards);
  
  const totalCards = flashcards.length;
  const masteredCards = flashcards.filter(flashcard => flashcard.status === 'mastered').length;
  const learningCards = flashcards.filter(flashcard => flashcard.status === 'learning').length;

  return (
    <Container>
      <h2>Progress</h2>
      <Text>Total number of cards: {totalCards}</Text>
      <Text>Number of mastered cards: {masteredCards}</Text>
      <Text>Number of learning cards: {learningCards}</Text>
    </Container>
  );
}
