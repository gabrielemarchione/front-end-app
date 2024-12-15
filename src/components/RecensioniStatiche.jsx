import React from "react";
import { Container, Card } from "react-bootstrap";

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
      <div className="text-center mb-4 titoloSezione">
      <h2 >Feedbacks</h2>
      </div>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {reviews.map((review, index) => (
          <Card
            key={index}
            className={`flex-grow-1 recensione-card text-center card-${index + 1}`}
          >
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title className="fw-bold">{review.name}</Card.Title>
              <Card.Text className="text-center">{review.comment}</Card.Text>
              <Card.Text>
                <strong>Valutazione:</strong> {review.rating}⭐
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default RecensioniStatiche;
