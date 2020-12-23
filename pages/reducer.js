export const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const newWords = [...state.wordsList, action.payload];
    return {
      ...state,
      wordsList: newWords,
    };
  }
};
