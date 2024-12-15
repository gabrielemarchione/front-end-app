import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const RiquadroStatistiche = () => {
  const stats = [
    { value: "150+", text: "Eventi Organizzati" },
    { value: "10,000+", text: "Partecipanti" },
    { value: "98%", text: "Recensioni Positive" },
  ];

  return (
    <Container className="my-5">
      <Row className="text-center">
        {stats.map((stat, index) => (
          <Col md={4} xs={12} className="mb-4" key={index}>
            <Card className={`custom-card card-${index + 1}`}>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title className="custom-card-title">{stat.value}</Card.Title>
                <Card.Text className="custom-card-text">{stat.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RiquadroStatistiche;
