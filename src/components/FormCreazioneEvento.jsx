import React, { useState } from "react";
import { useSelector } from "react-redux";
import { navigate } from "react-router-dom";

const FormCreazioneEvento = () => {
    const [titolo, setTitolo] = useState("");
    const [descrizione, setDescrizione] = useState("");
    const [data, setData] = useState("");
    const [luogo, setLuogo] = useState("");
    const [costo, setCosto] = useState("");
    const [postiMassimi, setPostiMassimi] = useState("");

    const token = useSelector((state) => state.auth.token); 
    const ruoliUtente = useSelector((state) => state.auth.ruoliUtente); 


    if (!ruoliUtente.includes("ADMIN") && !ruoliUtente.includes("ORGANIZZATORE")) {
        return <p>Non sei autorizzato a creare un evento.</p>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuovoEvento = {
            titolo,
            descrizione,
            data,
            luogo,
            costo: parseFloat(costo),
            postiMassimi: parseInt(postiMassimi),
        };

        try {
            const response = await fetch("http://localhost:3001/evento", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, 
                },
                body: JSON.stringify(nuovoEvento),
            });

            if (!response.ok) {
                throw new Error("Errore nella creazione dell'evento");
            }

            navigate("/"); 
        } catch (error) {
            console.error("Errore:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Titolo:</label>
                <input
                    type="text"
                    value={titolo}
                    onChange={(e) => setTitolo(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Descrizione:</label>
                <textarea
                    value={descrizione}
                    onChange={(e) => setDescrizione(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Data:</label>
                <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Luogo:</label>
                <input
                    type="text"
                    value={luogo}
                    onChange={(e) => setLuogo(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Costo:</label>
                <input
                    type="number"
                    value={costo}
                    onChange={(e) => setCosto(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Posti Massimi:</label>
                <input
                    type="number"
                    value={postiMassimi}
                    onChange={(e) => setPostiMassimi(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Crea Evento</button>
        </form>
    );
};

export default FormCreazioneEvento;

