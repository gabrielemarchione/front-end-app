import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const ProfiloUtente = () => {
  const [utente, setUtente] = useState({});
  const [modifica, setModifica] = useState(false);
  const [modificaPassword, setModificaPassword] = useState(false);
  const [modificaFoto, setModificaFoto] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    const fetchProfiloUtente = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/utente/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Errore nel caricamento del profilo.");
        const data = await response.json();
        setUtente(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiloUtente();
  }, [token]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/utente/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(utente),
      });
      if (!response.ok) throw new Error("Errore durante il salvataggio.");
      const updatedUtente = await response.json();
      setUtente(updatedUtente);
      setSuccess(true);
      setModifica(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmNewPassword) {
      setError("Tutti i campi della password sono obbligatori.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setError("Le nuove password non coincidono.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        passwordAttuale: passwords.currentPassword,
        nuovaPassword: passwords.newPassword,
        confermaNuovaPassword: passwords.confirmNewPassword,
      };

      const response = await fetch("http://localhost:3001/utente/me/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Errore dal server:", errorDetails); // Debug dettagliato
        throw new Error(errorDetails.message || "Errore durante la modifica della password.");
      }

      setSuccess(true);
      setModificaPassword(false);
      setPasswords({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeFoto = async () => {
    if (!foto) {
      setError("Nessuna foto selezionata.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("foto", foto);

      const response = await fetch("http://localhost:3001/utente/me/avatar", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Errore durante la modifica della foto profilo.");

      const updatedUtente = await response.json();
      setUtente(updatedUtente);
      setSuccess(true);
      setModificaFoto(false);
      setFoto(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <div className="profilo-utente">
      <h1>Profilo Utente</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Operazione completata con successo!</Alert>}

      <div className="foto-profilo">
        <img
          src={utente.fotoProfilo || "https://via.placeholder.com/150"}
          alt="Foto Profilo"
          className="mb-3"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
        {!modificaFoto && (
          <Button
            variant="secondary"
            onClick={() => setModificaFoto(true)}
            className="mb-3"
          >
            Modifica Foto Profilo
          </Button>
        )}
      </div>

      {modificaFoto && (
        <Form onSubmit={(e) => e.preventDefault()} className="mb-3">
          <Form.Group controlId="fotoProfilo">
            <Form.Label>Carica Nuova Foto</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setFoto(e.target.files[0])}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleChangeFoto}>
            Salva Foto
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setModificaFoto(false);
              setFoto(null);
            }}
            className="mt-3"
          >
            Annulla
          </Button>
        </Form>
      )}

      {!modificaPassword && (
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group controlId="nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={utente.nome || ""}
              onChange={(e) => setUtente({ ...utente, nome: e.target.value })}
              disabled={!modifica}
            />
          </Form.Group>
          <Form.Group controlId="cognome">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              type="text"
              value={utente.cognome || ""}
              onChange={(e) => setUtente({ ...utente, cognome: e.target.value })}
              disabled={!modifica}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={utente.email || ""}
              onChange={(e) => setUtente({ ...utente, email: e.target.value })}
              disabled={!modifica}
            />
          </Form.Group>

          {modifica ? (
            <Button variant="primary" onClick={handleSave}>
              Salva
            </Button>
          ) : (
            <Button variant="warning" onClick={() => setModifica(true)}>
              Modifica
            </Button>
          )}

          <Button
            variant="secondary"
            onClick={() => {
              setModificaPassword(true);
              setSuccess(false);
              setError(null);
            }}
            className="mt-3"
          >
            Modifica Password
          </Button>
        </Form>
      )}

      {modificaPassword && (
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group controlId="currentPassword">
            <Form.Label>Password Attuale</Form.Label>
            <Form.Control
              type="password"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Label>Nuova Password</Form.Label>
            <Form.Control
              type="password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="confirmNewPassword">
            <Form.Label>Conferma Nuova Password</Form.Label>
            <Form.Control
              type="password"
              value={passwords.confirmNewPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmNewPassword: e.target.value })}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleChangePassword}>
            Salva Nuova Password
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setModificaPassword(false);
              setPasswords({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
              setError(null);
              setSuccess(false);
            }}
            className="mt-3"
          >
            Annulla
          </Button>
        </Form>
      )}
    </div>
  );
};

export default ProfiloUtente;
