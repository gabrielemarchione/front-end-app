import React, { useEffect, useState } from "react";
import { Table, Alert, Spinner, Button, Form, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { popolaEventi } from "../redux/actions";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // Per il form di modifica
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  

  const token = useSelector((state) => state.token.token);
  const ruoli = useSelector((state) => state.token.ruoli);
  const isAdmin = ruoli.includes("ADMIN");

  const dispatch = useDispatch();

  // Fetch degli eventi
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/evento/imieieventi", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Errore durante il recupero degli eventi");
      }

      const data = await response.json();
      setEvents(data);
      dispatch(popolaEventi(data)); // 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Funzione per cancellare un evento
  const handleDelete = async (eventoId) => {
    try {
      const response = await fetch(`http://localhost:3001/evento/imieieventi/${eventoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Sono presenti delle prenotazioni, non puoi cancellare l'evento!");
      }

      setEvents((prevEvents) => prevEvents.filter((event) => event.eventoId !== eventoId));
      setShowConfirmDelete(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Funzione per salvare l'evento modificato
  const handleSave = async (eventoModificato) => {
    try {
      const response = await fetch(
        `http://localhost:3001/evento/imieieventi/${eventoModificato.eventoId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventoModificato),
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante l'aggiornamento dell'evento");
      }

      const data = await response.json();
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.eventoId === data.eventoId  ? data : event
        )
      );
      setSelectedEvent(null); // Chiudi il form
    } catch (err) {
      setError(err.message);
    }
  };

  // Conferma cancellazione
  const handleShowConfirmDelete = (event) => {
    setEventToDelete(event);
    setShowConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
    setEventToDelete(null);
  };

 

  return (
    <div className="my-events">

      <h1 className="mb-4">Eventi</h1>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && events.length === 0 && (
        <Alert variant="info">Non hai creato eventi.</Alert>
      )}
      {!loading && !error && events.length > 0 && (
        <div className="table-responsive table-stondata mb-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Titolo</th>
              <th>Luogo</th>
              <th>Data e orario</th>
              <th>Posti Massimi</th>
              <th>Posti Disponibili</th>
              
              {isAdmin && <th>Organizzatore</th>}
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event.eventoId}>
                <td>{index + 1}</td>
                <td>{event.titolo}</td>
                <td>{event.luogo}</td>
                <td>{event.orarioInizio}</td>
                <td>{event.postiMassimi}</td>
                <td>{event.postiDisponibili}</td>
                {isAdmin && <td>{event.organizzatore? `${event.organizzatore.nome} ${event.organizzatore.cognome}` : "Non disponibile"}  </td> }
                <td  className="button-group-td">
                  <Button
                  className=" btn-modifica"
                    variant="warning"
                    onClick={() => setSelectedEvent(event)}
                    
                  >
                    Modifica
                  </Button>
                  <Button
                  className="btn-cancella"
                    variant="danger"
                    onClick={() => handleShowConfirmDelete(event)}
                  >
                    Cancella
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      )}

      {/* Modal per confermare la cancellazione */}
      <Modal show={showConfirmDelete} onHide={handleCloseConfirmDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Cancellazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler cancellare l'evento "{eventToDelete?.titolo}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmDelete}>
            Annulla
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(eventToDelete.eventoId)}
          >
            Cancella
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Form di modifica */}
      {selectedEvent && (
        <div className="edit-form">
          <h2>Modifica Evento</h2>
          <Form>
            <Form.Group controlId="titolo">
              <Form.Label>Titolo</Form.Label>
              <Form.Control
                type="text"
                value={selectedEvent.titolo}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, titolo: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="luogo">
              <Form.Label>Luogo</Form.Label>
              <Form.Control
                type="text"
                value={selectedEvent.luogo}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, luogo: e.target.value })
                }
              />
            </Form.Group>
            <Button
            className="btn-modifica me-2 mt-2"
              variant="primary"
              onClick={() => handleSave(selectedEvent)}
            >
              Salva
            </Button>
            <Button variant="secondary" className="mt-2" onClick={() => setSelectedEvent(null)}>
              Annulla
            </Button>
          </Form>
        </div>
      )}

      <Button className="mt-4 btn-modifica" variant="primary" onClick={fetchEvents}>
        Aggiorna
      </Button>
    </div>
  );
};

export default MyEvents;
