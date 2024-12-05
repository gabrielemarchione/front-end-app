import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { popolaEventi } from "../redux/actions/index";
import { Card, Container, Row, Col } from "react-bootstrap";

const Home = () => {
    const dispatch = useDispatch();
    const eventi = useSelector((state) => state.eventi.items);

    useEffect(() => {
        const fetchEventi = async () => {
            try {
                const response = await fetch("http://localhost:3001/evento", {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer ",
                        "Content-Type": "application/json",
                    },
                });
        
                if (!response.ok) {
                    throw new Error(`Errore HTTP: ${response.status} - ${response.statusText}`);
                }
        
                const data = await response.json();
                console.log("Dati ricevuti dalla fetch:", data);
        
                if (!data.content || !Array.isArray(data.content)) {
                    throw new Error("La risposta del server non contiene un array valido nella proprietà 'content'");
                }
        
                dispatch(popolaEventi(data.content)); // Passa solo `content` al Redux Store
            } catch (error) {
                console.error("Errore nel recupero degli eventi:", error.message);
            }
        };
        
        

        fetchEventi();
    }, [dispatch]);

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Eventi Disponibili</h1>
            {!eventi || eventi.length === 0 ? (
                <p className="text-center">Non ci sono eventi disponibili.</p>
            ) : (
                <Row>
                    {eventi.map((evento) => (
                        <Col key={evento.eventoId} md={4} className="mb-4">
                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={
                                        evento.organizzatore.avatarUrl ||
                                        "https://via.placeholder.com/150"
                                    }
                                />
                                <Card.Body>
                                    <Card.Title>{evento.titolo}</Card.Title>
                                    <Card.Text>
                                        <strong>Descrizione:</strong> {evento.descrizione}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Data:</strong> {new Date(evento.data).toLocaleDateString()}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Luogo:</strong> {evento.luogo}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Costo:</strong> €{evento.costo.toFixed(2)}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Posti Disponibili:</strong> {evento.postiDisponibili} /{" "}
                                        {evento.postiMassimi}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Categoria:</strong> {evento.categoriaEvento}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Organizzatore:</strong>{" "}
                                        {`${evento.organizzatore.nome} ${evento.organizzatore.cognome}`}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Home;


