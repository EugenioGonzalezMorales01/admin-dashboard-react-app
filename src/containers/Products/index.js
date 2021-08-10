import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct, deleteProduct } from "../../actions/";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import { generatePublicUrl } from "../../urlConfig";
import "./style.css";
/**
 * @author
 * @function Products
 **/

const Products = (props) => {
	let productData;
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	dispatch(getAllProducts());
	// }, []);
	//Variables de producto para la tabla
	const product = useSelector((state) => state.product);
	//Variables de producto para la ventana emergente de detalles
	const [productDetailModal, setProductDetailModal] = useState(false);
	const [productDetails, setProductDetails] = useState(null);
	//Variables de producto para la ventana emergente de agregar producto
	const [name, setName] = useState("");
	const [quantity, setQuantity] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [productPictures, setProductPictures] = useState([]);
	//Categoria
	const category = useSelector((state) => state.category);
	//Controla el estado de la ventana emergente
	const [show, setShow] = useState(false);
	//Manejadores de eventos de la ventana emergente
	const handleClose = () => {
		const form = new FormData();
		//agregar los campos y valores al form
		form.append("name", name);
		form.append("quantity", quantity);
		form.append("price", price);
		form.append("description", description);
		form.append("category", categoryId);
		//agregar cada foto al array
		for (let pic of productPictures) {
			form.append("productPicture", pic);
		}
		//Subir los datos del form al servidor
		dispatch(addProduct(form)).then((result) => {
			if (result) {
				//cerrar la ventana flotante
				setShow(false);
				window.location.replace("");
			}
		});
	};
	const handleShow = () => setShow(true);
	//Cargar la lista de categorias y subcategorias en la ventana flotante
	const createCategoryList = (categories, options = []) => {
		for (let category of categories) {
			options.push({ value: category._id, name: category.name });
			if (category.children.length > 0) {
				createCategoryList(category.children, options);
			}
		}
		return options;
	};
	//Manejar la imagen del producto
	const handleProductPictures = (e) => {
		setProductPictures([...productPictures, e.target.files[0]]);
	};

	const renderProducts = () => {
		return (
			<Table responsive="sm">
				<thead>
					<tr>
						<th>#</th>
						<th>Nombre</th>
						<th>Precio</th>
						<th>Stock</th>
						<th>Categoria</th>
					</tr>
				</thead>
				<tbody>
					{product.products.length > 0
						? product.products.map((product) => (
								<tr
									onClick={() => showProductDetailsModal(product)}
									key={product._id}
								>
									<td>1</td>
									<td>{product.name}</td>
									<td>{product.price}</td>
									<td>{product.quantity}</td>
									<td>{product.category.name}</td>
								</tr>
						  ))
						: null}
				</tbody>
			</Table>
		);
	};
	const renderAddProductModal = () => {
		return (
			<Modal
				show={show}
				modalTitle={"Agregar Producto"}
				handleClose={handleClose}
			>
				<Input
					value={name}
					placeholder={"Product Name"}
					onChange={(e) => setName(e.target.value)}
				></Input>
				<Input
					value={quantity}
					placeholder={"Product Quantity"}
					onChange={(e) => setQuantity(e.target.value)}
				></Input>
				<Input
					value={price}
					placeholder={"Product Price"}
					onChange={(e) => setPrice(e.target.value)}
				></Input>
				<Input
					value={description}
					placeholder={"Product Description"}
					onChange={(e) => setDescription(e.target.value)}
				></Input>
				<select
					className="form-control"
					value={categoryId}
					onChange={(e) => setCategoryId(e.target.value)}
				>
					<option>Select Category</option>
					{createCategoryList(category.categories).map((option) => (
						<option key={option.value} value={option.value}>
							{option.name}
						</option>
					))}
				</select>
				{productPictures.length > 0
					? productPictures.map((pic, index) => (
							<div key={index}>{pic.name}</div>
					  ))
					: null}
				<input
					type="file"
					name="producPicture"
					onChange={handleProductPictures}
				></input>
			</Modal>
		);
	};

	const handleCloseProductDetailsModal = () => {
		setProductDetailModal(false);
	};

	const showProductDetailsModal = (product) => {
		setProductDetails(product);
		setProductDetailModal(true);
	};

	const updateProductTrigger = () => {
		productData.name = document.getElementById("name").value;
		productData.price = document.getElementById("price").value;
		productData.quantity = document.getElementById("quantity").value;
		const select = document.getElementById("category");
		const selectValue = select.options[select.selectedIndex].value;
		productData.category._id = selectValue;
		productData.description = document.getElementById("description").value;
		createCategoryList(category.categories).map((cat) => {
			if (cat.value == productData.category._id) {
				productData.category.name = cat.name;
			}
		});
		dispatch(updateProduct(productData)).then((result) => {
			if (result) {
				setProductDetailModal(false);
			}
		});
	};
	const deleteProductTrigger = () => {
		productData._id = productDetails._id;
		dispatch(deleteProduct(productData._id)).then((result) => {
			if (result) {
				setProductDetailModal(false);
				window.location.replace("");
			}
		});
	};
	const renderProductDetailsModal = () => {
		if (!productDetails) {
			return null;
		}
		productData = productDetails;
		productData.category.name = productDetails.category.name;
		productData.category._id = productDetails.category._id;
		return (
			<Modal
				show={productDetailModal}
				handleClose={handleCloseProductDetailsModal}
				modalTitle={"Detalles del Producto"}
				size="lg"
				buttons={[
					{
						label: "Eliminar",
						color: "danger",
						onClick: deleteProductTrigger,
					},
					{
						label: "Guardar Cambios",
						color: "primary",
						onClick: updateProductTrigger,
					},
				]}
			>
				<Row>
					<Col md="6">
						<label className="key">Nombre</label>
						{/* <p className="value">{productDetails.name}</p> */}
						<Input id={"name"} defaultValue={productDetails.name}></Input>
					</Col>
					<Col md="6">
						<label className="key">Precio</label>
						{/* <p className="value">{productDetails.price}</p> */}
						<Input id={"price"} defaultValue={productDetails.price}></Input>
					</Col>
				</Row>
				<Row>
					<Col md="6">
						<label className="key">Stock</label>
						{/* <p className="value">{productDetails.quantity}</p> */}
						<Input
							id={"quantity"}
							defaultValue={productDetails.quantity}
						></Input>
					</Col>
					<Col md="6">
						<label className="key">Categoria</label>
						{/* <p className="value">{productDetails.category.name}</p> */}
						<select className="form-control" id={"category"}>
							<option>{productDetails.category.name}</option>
							{createCategoryList(category.categories).map(
								(option) =>
									option.value !== productDetails.category.name && (
										<option key={option.value} value={option.value}>
											{option.name}
										</option>
									)
							)}
						</select>
					</Col>
				</Row>
				<Row>
					<Col md="6">
						<label className="key">Descripcion</label>
						{/* <p className="value">{productDetails.description}</p> */}
						<Input
							id={"description"}
							defaultValue={productDetails.description}
						></Input>
					</Col>
				</Row>
				<Row>
					<Col>
						<label className="key">Imagenes</label>
						<div style={{ display: "flex" }}>
							{productDetails.productPictures.map((picture) => (
								<div className="productImgContainer">
									<img src={generatePublicUrl(picture.img)}></img>
								</div>
							))}
						</div>
					</Col>
				</Row>
			</Modal>
		);
	};
	return (
		<Layout sidebar>
			<Container>
				<Row>
					<Col md={12}>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<h3>Productos</h3>
							<button onClick={handleShow}>Añadir</button>
						</div>
					</Col>
				</Row>
				<Row>
					<Col>{renderProducts()}</Col>
				</Row>
			</Container>
			{renderAddProductModal()}
			{renderProductDetailsModal()}
		</Layout>
	);
};

export default Products;
