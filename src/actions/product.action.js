import { Form } from "react-bootstrap";
import axios from "../helpers/axios";

export const addProduct = (form) => {
	return async (dispatch) => {
		const res = await axios.post("/product/create", form);
		if (res.status === 201) {
			return true;
		}
	};
};

export const updateProduct = (product) => {
	console.log("2----");
	console.log(product);
	const form = new FormData();
	form.append("_id", product._id);
	form.append("name", product.name);
	form.append("price", product.price);
	form.append("quantity", product.quantity);
	form.append("category", product.category._id);
	form.append("description", product.description);
	return async (dispatch) => {
		const res = await axios.post("/product/updateProduct", form);
		if (res.status === 201) {
			return true;
		}
	};
};
export const deleteProduct = (_id) => {
	console.log(_id);
	return async (dispatch) => {
		const res = await axios.post("/product/deleteProduct", { payload: _id });
		console.log(res);
		if (res.status === 201) {
			return true;
		}
	};
};
