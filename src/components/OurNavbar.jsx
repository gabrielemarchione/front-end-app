import { Navbar, Container, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearToken } from "../redux/actions";

const OurNavbar = () => {
    const ruoli = useSelector((state) => state.token.ruoli);
    const token = useSelector((state) => state.token.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearToken());
        navigate("/home");
    };

    return (
        <Navbar expand="lg" className="bg-black mb-3">
            <Container>
                <Link className="text-white navbar-brand" to="/home">Appalermo</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="w-100 justify-content-evenly">
                        {ruoli.some((ruolo) => ["ADMIN", "ORGANIZZATORE", "USER"].includes(ruolo)) && (
                            <Link to="/profilo" className="nav-link text-white">Il mio profilo</Link>
                        )}
                        {ruoli.some((ruolo) => ["ADMIN", "ORGANIZZATORE"].includes(ruolo)) && (
                            <Link to="/evento" className="nav-link text-white">Crea evento</Link>
                        )}
                        {ruoli.some((ruolo) => ["ORGANIZZATORE"].includes(ruolo)) && (
                            <Link to="/myevents" className="nav-link text-white">I Miei Eventi</Link>
                        )}
                        {ruoli.some((ruolo) => ["ORGANIZZATORE", "USER"].includes(ruolo)) && (
                            <Link to="/mybookings" className="nav-link text-white">Prenotazioni</Link>
                        )}
                        {ruoli.some((ruolo) => ["ADMIN"].includes(ruolo)) && (
                            <Link to="/admin" className="nav-link text-white">Pannello Admin</Link>
                        )}
                    </Nav>
                    <Nav className="ms-auto">
                        {token ? (
                            <span className="nav-link text-white" style={{ cursor: "pointer" }} onClick={handleLogout}>
                                Logout
                            </span>
                        ) : (
                            <Link to="/login" className="nav-link text-white">Login/Registrati</Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default OurNavbar;
