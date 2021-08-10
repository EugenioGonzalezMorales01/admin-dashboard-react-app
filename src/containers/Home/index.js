import React, { useEffect } from "react";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "../../actions";
import { NavLink } from "react-router-dom";
/**
 * @author
 * @function Home
 **/

const Home = (props) => {
	return (
		<Layout sidebar>
			{/*<Jumbotron
				style={{ margin: "4rem", background: "#ffff" }}
				className="text-center"
			>
				<h1>Admin Dashboard</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
					vulputate quam justo, vitae rhoncus ligula finibus eget. Sed luctus at
					nisi at porttitor. Cras vitae ex dictum orci tristique convallis.
					Maecenas eleifend commodo ipsum non consectetur. Praesent luctus
					dapibus cursus. Suspendisse facilisis urna et ex aliquet, id laoreet
					augue faucibus. Duis aliquet euismod velit, quis porttitor tortor
					mollis ac. Cras a est a nisi hendrerit ultrices sit amet nec
					nunc.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
					vulputate quam justo, vitae rhoncus ligula finibus eget. Sed luctus at
					nisi at porttitor. Cras vitae ex dictum orci tristique convallis.
					Maecenas eleifend commodo ipsum non consectetur. Praesent luctus
					dapibus cursus. Suspendisse facilisis urna et ex aliquet, id laoreet
					augue faucibus. Duis aliquet euismod velit, quis porttitor tortor
					mollis ac. Cras a est a nisi hendrerit ultrices sit amet nec nunc.
				</p>
			</Jumbotron>*/}
		</Layout>
	);
};

export default Home;
