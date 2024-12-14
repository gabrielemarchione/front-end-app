
import MyEvents from "./MyEvents";
import PrenotazioniAdmin from "./PrenotazioniAdmin";
import { Container, Nav, Tab } from "react-bootstrap";

const AdminPanel = () => {
    return (
        <Container className="mt-5">
            <h1>Pannello Admin</h1>
            <Tab.Container defaultActiveKey="eventi">
                <Nav variant="tabs" className="mb-3 admin-panel-nav d-flex gap-2" >
                    <Nav.Item>
                        <Nav.Link eventKey="eventi">Gestione Eventi</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="prenotazioni">Gestione Prenotazioni</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="eventi">
                        <MyEvents />
                    </Tab.Pane>
                    <Tab.Pane eventKey="prenotazioni">
                        <PrenotazioniAdmin />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Container>
    );
};

export default AdminPanel;
