// Flashcard.js

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { knowFlashcard, didntKnowFlashcard } from './features/flashcards/flashcardsSlice';
import styled from 'styled-components';

// Styled components
const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#4CAF50' : '#f44336'};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

const Phrase = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const MeaningCard = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

function Flashcard() {
  const allFlashcards = useSelector(state => state.flashcards.flashcards);
  const learningFlashcards = allFlashcards.filter(flashcard => flashcard.status === 'learning');
  const dispatch = useDispatch();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  const shuffledFlashcards = shuffle(learningFlashcards);

  const handleKnowClick = () => {
    dispatch(knowFlashcard({ id: shuffledFlashcards[currentCardIndex].id }));
    if (currentCardIndex === shuffledFlashcards.length - 1) {
      setCurrentCardIndex(0);
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handleDidntKnowClick = () => {
    dispatch(didntKnowFlashcard({ id: shuffledFlashcards[currentCardIndex].id }));
    if (currentCardIndex === shuffledFlashcards.length - 1) {
      setCurrentCardIndex(0);
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handleMeaningClick = () => {
    setShowMeaning(!showMeaning);
  };

  if (shuffledFlashcards.length === 0) {
    return <div>No more flashcards to learn!</div>;
  }

  return (
    <Card>
      <Phrase>{shuffledFlashcards[currentCardIndex].nepaliPhrase}</Phrase>
      <Button primary onClick={handleKnowClick}>I knew it</Button>
      <Button onClick={handleDidntKnowClick}>I didn't know it</Button>
      <MeaningCard show={showMeaning} onClick={handleMeaningClick}>
        {shuffledFlashcards[currentCardIndex].status === 'learning' ? 'Click to reveal English meaning' : shuffledFlashcards[currentCardIndex].englishMeaning}
      </MeaningCard>
    </Card>
  );
}

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default Flashcard;
