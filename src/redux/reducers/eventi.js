const initialState = {
    items: [], // Contiene gli eventi
  };
  
  const eventiReducer = (state = initialState, action) => {
    switch (action.type) {
      case "POPOLA_EVENTI":
        return { ...state, items: [...action.payload] }; // Nuovo array
      case "AGGIUNGI_EVENTO":
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      case "DELETE_EVENT":
        return {
          ...state,
          items: state.items.filter((event) => event.id !== action.payload),
        };
      case "UPDATE_EVENT":
        return {
          ...state,
          items: state.items.map((event) =>
            event.id === action.payload.id ? action.payload : event
          ),
        };
      default:
        return state;
    }
  };
  
  export default eventiReducer;
  