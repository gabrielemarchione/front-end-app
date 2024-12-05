const initialState = {
    items: [], // Contiene gli eventi
};

const eventiReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'POPOLA_EVENTI':
            return {
                ...state,
                items: action.payload, 
            };
            case "AGGIUNGI_EVENTO":
    return {
        ...state,
        items: [...state.items, action.payload],
    };

        default:
            return state; 
    }
};

export default eventiReducer;

