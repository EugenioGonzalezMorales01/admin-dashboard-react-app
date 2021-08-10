import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions";
/**
* @author
* @function Signup

**/

const Signup = (props) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const userSignUp = (e) => {
		e.preventDefault();
		const user = {
			firstName,
			lastName,
			email,
			password,
		};
		dispatch(signup(user));
	};

	const auth = useSelector((state) => state.auth);
	if (auth.authenticate) {
		return <Redirect to={"/"} />;
	}
	if (user.loading) {
		return <p>Loading</p>;
	}
	return (
		<Layout>
			<Container>
				<Row style={{ marginTop: "5rem" }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form onSubmit={userSignUp}>
							<Row>
								<Col md={6}>
									<Input
										controlId="formBasicFirstName"
										label="First Name"
										placeholder="First Name"
										value={firstName}
										type="text"
										onChange={(e) => setFirstName(e.target.value)}
									></Input>
								</Col>
								<Input
									controlId="formBasicLastName"
									label="Last Name"
									placeholder="Last Name"
									value={lastName}
									type="text"
									onChange={(e) => setLastName(e.target.value)}
								></Input>
								<Col md={6}></Col>
							</Row>
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

export default Signup;