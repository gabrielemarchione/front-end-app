import { SET_TOKEN } from "../actions";

const initialState = {
    token: null, // Stato iniziale senza token
};

const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload.token, // Salva solo il token
            };
        default:
            return state;
    }
};

export default tokenReducer;

