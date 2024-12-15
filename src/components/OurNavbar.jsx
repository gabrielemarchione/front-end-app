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
        <Navbar expand="lg" className="navbar bg-3 sticky-navbar">
            <Container>
                {/* Logo a sinistra */}
                <Link className="navbar-brand" to="/home">
                    APPALERMO
                </Link>
                {/* Toggle per l'hamburger */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {/* Navbar Links */}
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    {/* Layout Desktop */}
                    <Nav className="w-100 justify-content-evenly d-lg-flex d-none">
                        {ruoli.some((ruolo) => ["ADMIN", "ORGANIZZATORE", "USER"].includes(ruolo)) && (
                            <Link to="/profilo" className="nav-link text-center">
                                <i className="fa fa-user fa-2x mb-1"></i>
                                <span>Profilo</span>
                            </Link>
                        )}
                        {ruoli.some((ruolo) => ["ADMIN", "ORGANIZZATORE"].includes(ruolo)) && (
                            <Link to="/evento" className="nav-link text-center">
                                <i className="fa fa-calendar-plus fa-2x mb-1"></i>
                                <span>Crea evento</span>
                            </Link>
                        )}
                        {ruoli.some((ruolo) => ["ORGANIZZATORE"].includes(ruolo)) && (
                            <Link to="/myevents" className="nav-link text-center">
                                <i className="fa fa-list fa-2x mb-1"></i>
                                <span>I Miei Eventi</span>
                            </Link>
                        )}
                        {ruoli.some((ruolo) => ["ORGANIZZATORE", "USER"].includes(ruolo)) && (
                            <Link to="/mybookings" className="nav-link text-center">
                                <i className="fa fa-book fa-2x mb-1"></i>
                                <span>Prenotazioni</span>
                            </Link>
                        )}
                        {ruoli.some((ruolo) => ["ADMIN"].includes(ruolo)) && (
                            <Link to="/admin" className="nav-link text-center">
                                <i className="fa fa-cogs fa-2x mb-1"></i>
                                <span>Pannello Admin</span>
                            </Link>
                        )}
                        {/* Logout per Desktop */}
                        {token ? (
                            <span
                                className="nav-link text-center d-flex align-items-center justify-content-center"
                                style={{ cursor: "pointer" }}
                                onClick={handleLogout}
                            >
                                <i className="fa fa-sign-out-alt fa-2x mb-1 me-2"></i>
                                <span>Logout</span>
                            </span>
                        ) : (
                            <Link to="/login" className="ms-auto nav-link text-center d-flex align-items-center justify-content-center">
                                <i className="fa fa-sign-in-alt fa-2x mb-1 me-2"></i>
                                <span>Login / Registrati</span>
                            </Link>
                        )}
                    </Nav>
                    {/* Layout Mobile */}
                    <Nav className="d-lg-none flex-column align-items-end mt-3">
                        {ruoli.some((ruolo) => ["ADMIN", "ORGANIZZATORE", "USER"].includes(ruolo)) && (
                            <Link to="/profilo" className="nav-link text-end">
                                <i className="fa fa-user me-2"></i> Il mio profilo
                            </Link>
                        )}
                        {ruoli.some((ruolo) => ["ADMIN", "ORGANIZZATORE"].includes(ruolo)) && (
                            <Link to="/evento" className="nav-link text-end">
                                <i className="fa fa-calendar-plus me-2"></i> Crea evento
                            </Link>
                        )}
                        {ruoli.some((ruolo) => ["ORGANIZZATORE"].includes(ruolo)) && (
                            <Link to="/myevents" className="nav-link text-end">
                                <i className="fa fa-list me-2"></i> I Miei Eventi
                            </Link>
                        )}
                        {ruoli.some((ruolo) => ["ORGANIZZATORE", "USER"].includes(ruolo)) && (
                            <Link to="/mybookings" className="nav-link text-end">
                                <i className="fa fa-book me-2"></i> Prenotazioni
                            </Link>
                        )}
                        {ruoli.some((ruolo) => ["ADMIN"].includes(ruolo)) && (
                            <Link to="/admin" className="nav-link text-end">
                                <i className="fa fa-cogs me-2"></i> Pannello Admin
                            </Link>
                        )}
                        {/* Logout / Login per Mobile */}
                        {token ? (
                            <span className="nav-link text-end" style={{ cursor: "pointer" }} onClick={handleLogout}>
                                <i className="fa fa-sign-out-alt me-2"></i> Logout
                            </span>
                        ) : (
                            <Link to="/login" className="nav-link text-end">
                                <i className="fa fa-sign-in-alt me-2"></i> Login / Registrati
                            </Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default OurNavbar;
