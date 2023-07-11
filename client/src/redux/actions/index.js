// 1. Action (Just a name or description)
export const increment = () => {
  return {
    type: "INCREMENT",
  };
};

export const decrement = () => {
  return {
    type: "DECREMENT",
  };
};

export const selectCount = (state) => state.allReducers.counter;
