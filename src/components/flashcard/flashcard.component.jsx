import React, { useEffect, useState,useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { knowFlashcard,didntKnowFlashcard } from '../../store/flashcardsSlice';
import styled from 'styled-components';
import { fetchFlashcards } from '../../store/flashcardsSlice';
import { Progress } from '../../pages/progress/progress.pages';

// Styled components
const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin: 20px 50px;
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
  margin: 0;
  padding:0;
`;
const Category = styled.h5`
  font-size: 16px;
  background-color:grey;
  width:fit-content;
  padding: 5px;
  color: white;
  margin: 5px 0 10px 0;
`;

const MeaningCard = styled.div`
  border: 1px solid #ccc;
  margin: 20px;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
`;

export const Flashcard=()=> {
  //const shuffledFlashcards = useSelector(state => state.flashcards.flashcards);
  const { flashcards:shuffledFlashcards, status, error } = useSelector(state => state.flashcards);
  const dispatch = useDispatch();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const handleKnowClick = () => {
    console.log('know click')
    dispatch(knowFlashcard({ id: shuffledFlashcards[currentCardIndex].id }));
    if (currentCardIndex === shuffledFlashcards.length - 1) {
      setCurrentCardIndex(0);
    } else {
      setCurrentCardIndex(Math.floor(Math.random() * shuffledFlashcards.length));
      console.log(currentCardIndex)
    }
  };

  const handleDidntKnowClick = () => {
    console.log('know nt click')
    dispatch(didntKnowFlashcard({ id: shuffledFlashcards[currentCardIndex].id }));
    if (currentCardIndex === shuffledFlashcards.length - 1) {
      setCurrentCardIndex(0);
    } else {
      setCurrentCardIndex(Math.floor(Math.random() * shuffledFlashcards.length));
      console.log(currentCardIndex)
    }
  };

  const handleMeaningClick = () => {
    setShowMeaning(!showMeaning);
  };

  // if (shuffledFlashcards.length === 0) {
  //   return <div>No more flashcards to learn!</div>;
  // }


  // useEffect(()=>{
  //   if (shuffledFlashcards) console.log('resolved')
  // },[shuffledFlashcards])

  useEffect(() => {
    if (!dataFetched) {
      dispatch(fetchFlashcards());
      setDataFetched(true);
    }
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  if (!shuffledFlashcards){
    return <div>Error</div>
  }

  return (
    <>
        <Card>
        <Phrase>{shuffledFlashcards.length>0 && shuffledFlashcards[currentCardIndex].nepaliPhrase}</Phrase>
        <Category>{shuffledFlashcards.length>0 &&shuffledFlashcards[currentCardIndex].status}</Category>
        <MeaningCard onClick={handleMeaningClick}>
          {showMeaning ? shuffledFlashcards.length>0 && shuffledFlashcards[currentCardIndex].englishMeaning : 'Click to see/hide meaning'}
        </MeaningCard>
        <Button primary={"true"} onClick={handleKnowClick}>I knew it</Button>
        <Button onClick={handleDidntKnowClick}>I didn't know it</Button>
    </Card>
    <Progress />
    </>
  
  );
}
