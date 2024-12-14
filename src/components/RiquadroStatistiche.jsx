import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const RiquadroStatistiche = () => {
  return (
    <Container className="my-5">
      <Row className="text-center">
        <Col md={4} xs={12} className="mb-4">
          <Card className="statistiche-card">
            <Card.Body>
              <Card.Title className="display-6 ">150+</Card.Title>
              <Card.Text>Eventi Organizzati</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} xs={12} className="mb-4">
        <Card className="statistiche-card">
            <Card.Body>
              <Card.Title className="display-6">10,000+</Card.Title>
              <Card.Text>Partecipanti</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} xs={12} className="mb-4">
        <Card className="statistiche-card">
            <Card.Body>
              <Card.Title className="display-6">98%</Card.Title>
              <Card.Text>Recensioni Positive</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RiquadroStatistiche;
