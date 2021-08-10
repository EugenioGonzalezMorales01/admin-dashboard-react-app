import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
/**
 * @author
 * @function Login
 **/

const Login = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const userLogin = (event) => {
		event.preventDefault();
		const user = {
			email,
			password,
		};
		dispatch(login(user));
	};
	if (auth.authenticate) {
		return <Redirect to={"/"} />;
	}
	return (
		<Layout>
			<Container>
				<Row style={{ marginTop: "5rem" }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form onSubmit={userLogin}>
							<Input
								controlId="formBasicEmail"
								label="Email"
								placeholder="Enter email"
								value={email}
								type="email"
								onChange={(e) => setEmail(e.target.value)}
							></Input>

							<Input
								controlId="formBasicPassword"
								label="Password"
								placeholder="Enter password"
								value={password}
								type="password"
								onChange={(e) => setPassword(e.target.value)}
							></Input>
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
};
export default Login;
