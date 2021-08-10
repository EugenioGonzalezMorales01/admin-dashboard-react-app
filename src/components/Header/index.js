import React, { useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { isUserLoggedIn, signout } from "../../actions";
/**
 * @author
 * @function Header
 **/

const Header = (props) => {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const logOut = () => {
		dispatch(signout());
	};

	const renderLoginInUp = () => {
		return (
			<Nav>
				{/*<Nav.Link href="#deets">Log in</Nav.Link>*/}
				<li className="nav-item">
					<NavLink to="/login" className="nav-link">
						Log In
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to="/signup" className="nav-link">
						Iniciar Sesión
					</NavLink>
				</li>
			</Nav>
		);
	};

	const renderLogOut = () => {
		return (
			<Nav>
				{/*<Nav.Link href="#deets">Log in</Nav.Link>*/}
				<li className="nav-item">
					<span className="nav-link" onClick={logOut}>
						Cerrar Sesión
					</span>
				</li>
			</Nav>
		);
	};
	return (
		<Navbar
			collapseOnSelect
			fixed="top"
			expand="lg"
			bg="dark"
			variant="dark"
			style={{ zIndex: 1 }}
		>
			<Container fluid>
				{/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
				<Link to="/" className="navbar-brand">
					Dashboard
				</Link>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						{/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
            </NavDropdown>*/}
					</Nav>
					{auth.authenticate ? renderLogOut() : renderLoginInUp()}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
