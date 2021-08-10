import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Header from "../Header";
import "./style.css";
/**
 * @author
 * @function Layout
 **/

const Layout = (props) => {
	return (
		<>
			<Header />
			{props.sidebar ? (
				<Container fluid>
					<Row>
						<Col md={2} className="sidebar">
							<ul>
								<li>
									<NavLink to={"/category"}>Categorias</NavLink>
								</li>
								<li>
									<NavLink to={"/products"}>Productos</NavLink>
								</li>
								{/* <li>
									<NavLink to={"/orders"}>Orders</NavLink>
								</li> */}
							</ul>
						</Col>
						<Col md={10} className="content">
							{props.children}
						</Col>
					</Row>
				</Container>
			) : (
				props.children
			)}
		</>
	);
};

export default Layout;
