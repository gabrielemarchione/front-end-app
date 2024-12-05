import { Navbar, Container, Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const OurNavbar = () => {
    const ruoli = useSelector((state) => state.token.ruoli || []);
    return (
        <Navbar expand="lg" className="bg-black mb-3">
            <Container>
                <Link href="#home" className='text-white navbar-brand' to={"/home"}>Appalermo</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={"/evento"} className='nav-link text-white'>Crea evento</Link>
                        <Link to={"/login"} className='nav-link text-white'>Login</Link>
                        {
                            ruoli.some(ruolo => ruolo === 'ADMIN') && <Link to={"/utente"} className='nav-link text-white'>Utente</Link>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default OurNavbar