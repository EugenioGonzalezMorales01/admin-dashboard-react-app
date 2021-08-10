import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/privateRoute";
import { useDispatch, useSelector } from "react-redux";
import { getInitialData, isUserLoggedIn } from "./actions/index";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Category from "./containers/Category";

function App() {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	// Si el administrador esta logeado le mando los datos iniciales y es capaz de ir a home,
	// de lo contrario	lo manda a logearse.
	useEffect(() => {
		if (!auth.authenticate) {
			dispatch(isUserLoggedIn());
		}
		dispatch(getInitialData());
	}, []);

	return (
		<div class="App">
			<Switch>
				<PrivateRoute path="/" exact component={Home} />
				<PrivateRoute
					path="/products"
					exact
					component={Products}
				></PrivateRoute>
				<PrivateRoute path="/orders" component={Orders}></PrivateRoute>
				<PrivateRoute path="/category" component={Category}></PrivateRoute>
				<PrivateRoute path="/Product" component={Products}></PrivateRoute>
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
			</Switch>
		</div>
	);
}

export default App;
