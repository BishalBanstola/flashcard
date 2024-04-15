import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../firebase/index';

// const initialState = {
//     flashcards : [
//         { id: 1, nepaliPhrase: "नमस्ते", englishMeaning: "Hello", status: "learning" },
//         { id: 2, nepaliPhrase: "धन्यवाद", englishMeaning: "Thank you", status: "learning" },
//         { id: 3, nepaliPhrase: "तपाईंलाई कस्तो छ?", englishMeaning: "How are you?", status: "learning" },
//         { id: 4, nepaliPhrase: "तपाईं कहाँ जानुहुन्छ?", englishMeaning: "Where are you going?", status: "learning" },
//         { id: 5, nepaliPhrase: "के तपाईंलाई म:म चाहिँदछ?", englishMeaning: "Do you like momo?", status: "learning" },
//         { id: 6, nepaliPhrase: "तपाईं कहाँ बाट हुनुहुन्छ?", englishMeaning: "Where are you from?", status: "learning" },
//         { id: 7, nepaliPhrase: "म यो माया गर्छु", englishMeaning: "I love it", status: "learning" },
//         { id: 8, nepaliPhrase: "सुप्रभात", englishMeaning: "Good morning", status: "learning" },
//         { id: 9, nepaliPhrase: "शुभ रात्री", englishMeaning: "Good night", status: "learning" },
//         { id: 10, nepaliPhrase: "तपाईंलाई भेटेर खुसी लाग्यो", englishMeaning: "Nice to meet you", status: "learning" },
//         { id: 11, nepaliPhrase: "के म तपाईंको मित्र हुन सक्छु?", englishMeaning: "Can I be your friend?", status: "learning" },
//         { id: 12, nepaliPhrase: "तपाईं के गरिरहेका हुनुहुन्छ?", englishMeaning: "What are you doing?", status: "learning" },
//         { id: 13, nepaliPhrase: "तपाईंको दिन कस्तो थियो?", englishMeaning: "How was your day?", status: "learning" },
//         { id: 14, nepaliPhrase: "तपाईंको नाम के हो?", englishMeaning: "What is your name?", status: "learning" },
//         { id: 15, nepaliPhrase: "तपाईं कहाँ बस्नुहुन्छ?", englishMeaning: "Where do you live?", status: "learning" },
//         { id: 16, nepaliPhrase: "तपाईं ठीक छिन्?", englishMeaning: "Are you okay?", status: "learning" },
//         { id: 17, nepaliPhrase: "तपाईं राम्रो छिनौ", englishMeaning: "You are beautiful", status: "learning" },
//         { id: 18, nepaliPhrase: "म ठिक छु", englishMeaning: "I am fine", status: "learning" },
//         { id: 19, nepaliPhrase: "बेश", englishMeaning: "Of course", status: "learning" },
//         { id: 20, nepaliPhrase: "यो राम्रो थियो", englishMeaning: "It was good", status: "learning" },
//       ]
// };
const initialState = {
    flashcards: [],
    status: 'idle',
    error: null,
  };

export const fetchFlashcards = createAsyncThunk('flashcards/fetchFlashcards', async () => {
    const flashcardsCollection = await database.collection('flashcards').get();
    const flashcardsData = flashcardsCollection.docs.map(doc => ({
        id: doc.id, // Add id field using the document ID
        ...doc.data(),
        status: 'learning', // Adding 'learning' status to each flashcard
      }));
    return flashcardsData;
});

const flashcardsSlice = createSlice({
  name: 'flashcards',
  initialState,
  reducers: {
    knowFlashcard(state, action) {
      const { id } = action.payload;
      const flashcard = state.flashcards.find(flashcard => flashcard.id === id);
      if (flashcard) {
        if (flashcard.status==='learning') flashcard.status = "mastered";
      }
    },
    didntKnowFlashcard(state, action) {
      const { id } = action.payload;
      const flashcard = state.flashcards.find(flashcard => flashcard.id === id);
      if (flashcard) {
        if (flashcard.status==='mastered') flashcard.status = "learning";
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFlashcards.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchFlashcards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.flashcards = action.payload;
      })
      .addCase(fetchFlashcards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { knowFlashcard, didntKnowFlashcard } = flashcardsSlice.actions;

export default flashcardsSlice.reducer;
