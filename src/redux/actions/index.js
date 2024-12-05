export const SET_TOKEN = 'SET_TOKEN'
export const ADD_RUOLO = 'ADD_RUOLO'
export const POPOLA_EVENTI = 'POPOLA_EVENTI'
export const SET_USER_ROLE = 'SET_USER_ROLE'

export const SetTokenAction = (token) => ({
    type: "SET_TOKEN",
    payload: token ,
});


export const popolaEventi = (evento) => ({
    type: POPOLA_EVENTI,
    payload: evento,
})

export const aggiungiEvento = (evento) => ({
    type: "AGGIUNGI_EVENTO",
    payload: evento,
});

export const AddRuoloAction = (ruolo) => {
    return {
        type: ADD_RUOLO,
        payload: ruolo
    }
}

;

