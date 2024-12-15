import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const MyFooter = () => {
  return (
    <footer className=" text-white py-4 mt-auto footer-fixed">
      <Container>
        <Row>
          <Col md={4} sm={12} className="mb-3">
            <h5>Chi sono</h5>
            <p>
            Sono un organizzatore di eventi dedicato alla comunità di Palermo e provincia.  <br /> <br />Il mio obiettivo è creare esperienze su misura, pensate per unire le persone e valorizzare le tradizioni del territorio.            </p>
          </Col>
          <Col md={4} sm={12} className="mb-3">
            <h5>Link Utili</h5>
            <ul className="list-unstyled">
              <li><a href="#faq" className="text-white text-decoration-none">FAQ</a></li>
              <li><a href="#assistenza" className="text-white text-decoration-none">Contatta Assistenza</a></li>
              <li><a href="#accessibilita" className="text-white text-decoration-none">Accessibilità</a></li>
              <li><a href="#cookie" className="text-white text-decoration-none">Cookie</a></li>
              <li><a href="#termini" className="text-white text-decoration-none">Termini</a></li>
              <li><a href="#privacy" className="text-white text-decoration-none">Privacy</a></li>
            </ul>
          </Col>
          <Col md={4} sm={12} className="mb-3 text-center text-md-start">
            <h5>Seguimi</h5>
            <div className="d-flex justify-content-md-start justify-content-center gap-3">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
              <a href="https://github.com/gabrielemarchione" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="fab fa-github fa-2x"></i>
              </a>
            </div>
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
