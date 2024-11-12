import { useContext } from 'react';
import { Container, Nav, Navbar, Stack} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
    const { user, logoutUser } = useContext(AuthContext)
    
    return ( 
        <Navbar bg="dark" className="mb-4" style={{height:'3.75rem'}}>
            <Container>
                <h2>
                    <Link to="/" className="link-light text-decoration-none">ChatApp</Link>
                </h2>
                {user && (<span className="text-warning">Xin chào {user.name}</span>)}
                <Nav>
                {
                    user && (<>
                        <Stack direction="horizontal" gap={3}>
                            <Link onClick={() => logoutUser()} to="/logout" className="link-light text-decoration-none">
                                Logout
                            </Link>
                        </Stack>
                    </>)
                }
                {
                    !user && (<>
                        <Stack direction="horizontal" gap={3}>
                            <Link to="/register" className="link-light text-decoration-none">Register</Link>
                        </Stack>
                        <Stack direction="">
                            <Link to="/login" className="link-light text-decoration-none">Login</Link>
                        </Stack>
                    </>)
                }
            </Nav>
            </Container>
        </Navbar>
     );
}
 
export default NavBar;