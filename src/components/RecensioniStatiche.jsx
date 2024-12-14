import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const reviews = [
  {
    name: "Aldo Baglio",
    comment: "Un evento fantastico, organizzato alla perfezione!",
    rating: 5,
  },
  {
    name: "Giovanni Storti",
    comment: "Esperienza incredibile, ci tornerò sicuramente.",
    rating: 4,
  },
  {
    name: "Giacomo Poretti",
    comment: "Tutto perfetto, dall'organizzazione ai partecipanti!",
    rating: 5,
  },
];

const RecensioniStatiche = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Recensioni degli Utenti</h2>
      <Row>
        {reviews.map((review, index) => (
          <Col md={4} xs={12} key={index} className="mb-4">
            <Card className="statistiche-card">
              <Card.Body>
                <Card.Title>{review.name}</Card.Title>
                <Card.Text>{review.comment}</Card.Text>
                <Card.Text>
                  <strong>Valutazione:</strong> {review.rating}⭐
                  
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RecensioniStatiche;
