import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const MyFooter = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>Chi siamo</h5>
            <p>
              Un team dedicato all'organizzazione di eventi nella città di Palermo e provincia, il nostro obiettivo è offrire
              esperienze uniche.
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Contatti</h5>
            <p>Email: gabrielemarchione@eventi.com</p>
            <p>Telefono: +39 0123 456 789</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <p className="mb-0">&copy; {new Date().getFullYear()} Appalermo. Tutti i diritti riservati.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MyFooter;
