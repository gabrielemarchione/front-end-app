import { SET_TOKEN, CLEAR_TOKEN } from "../actions";
import { jwtDecode } from "jwt-decode";

const initialState = {
  token: null,
  ruoli: [], // Stato per i ruoli utente
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      const token = action.payload;
      try {
        const decoded = jwtDecode(token); // Decodifica il token JWT
        return {
          ...state,
          token, // salva il token
          ruoli: decoded.ruoli || [], // salva i ruoli dal token decodificato
          nome: decoded.nome || "", //savla il nome utente
        };
      } catch (error) {
        console.error("Errore nella decodifica del token", error);
        return {
          ...state,
          token: null,
          ruoli: [],
        };
      }
    case CLEAR_TOKEN:
      return {
        ...initialState, // Resetta lo stato
      };
    default:
      return state;
  }
};

export default tokenReducer;

