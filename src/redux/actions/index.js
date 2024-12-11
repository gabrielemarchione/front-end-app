export const SET_TOKEN = 'SET_TOKEN'
export const ADD_RUOLO = 'ADD_RUOLO'
export const POPOLA_EVENTI = 'POPOLA_EVENTI'
export const UPDATE_ROLES = 'UPDATE_ROLES'
export const CLEAR_TOKEN = "CLEAR_TOKEN";
export const DELETE_EVENT = "DELETE_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";


export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token, 
});

export const clearToken = () => ({
  type: CLEAR_TOKEN,
});


export const popolaEventi = (evento) => ({
    type: POPOLA_EVENTI,
    payload: evento,
})

export const aggiungiEvento = (evento) => ({
    type: "AGGIUNGI_EVENTO",
    payload: evento,
});

export const UpdateRolesAction = (ruoli) => ({
    type: "UPDATE_ROLES",
    payload: { ruoli },
});



export const updateEventAction = (updatedEvent) => ({
  type: UPDATE_EVENT,
  payload: updatedEvent,
});

export const deleteEventAction = (id) => ({
  type: DELETE_EVENT,
  payload: id,
});

;

