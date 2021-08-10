import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	addCategory,
	getAllCategory,
	updateCategories,
	deleteCategories as deleteCategoriesAction,
} from "../../actions";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
	BsCheckCircle,
	BsCircle,
	BsCheckBox,
	BsFillCaretRightFill,
	BsFillCaretDownFill,
} from "react-icons/bs";

/**
 * @author
 * @function Category
 **/

const Category = (props) => {
	const category = useSelector((state) => state.category);
	const dispatch = useDispatch();
	//Controla el estado de la ventana emergente
	const [show, setShow] = useState(false);
	//Variables para el Modal
	const [categoryName, setCategoryName] = useState("");
	const [parentCategoryId, setParentCategoryId] = useState("");
	const [categoryImage, setCategoryImage] = useState("");
	//Variables de estado del check three
	const [checked, setChecked] = useState([]);
	const [expanded, setExpanded] = useState([]);
	const [checkedArray, setCheckedArray] = useState([]);
	const [expandedArray, setExpandedArray] = useState([]);
	//Variables de estado para eliminar categorias
	const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
	//Variables para actualizar las categorias
	const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
	//Manejadores de eventos
	const handleClose = () => {
		const form = new FormData();
		//Agregar los datos de la ventana emergente al request-form
		form.append("name", categoryName);
		form.append("parentId", parentCategoryId);
		form.append("categoryImage", categoryImage);
		//Enviar la peticion al API REST
		dispatch(addCategory(form));
		//Limpiar los campos de la ventana emergente
		setCategoryName("");
		setParentCategoryId("");
		//Cerrar la ventana emergente
		setShow(false);
	};
	const handleShow = () => setShow(true);

	//Cargar categorias y subcategorias en forma de lista
	const renderCategories = (categories) => {
		let myCategories = [];
		for (let category of categories) {
			myCategories.push({
				label: category.name,
				value: category._id,
				children:
					category.children.length > 0 && renderCategories(category.children),
			});
		}
		return myCategories;
	};
	//Cargar la lista de categorias y subcategorias en la ventana flotante
	const createCategoryList = (categories, options = []) => {
		for (let category of categories) {
			options.push({
				value: category._id,
				name: category.name,
				parentId: category.parentId,
			});
			if (category.children.length > 0) {
				createCategoryList(category.children, options);
			}
		}
		return options;
	};
	//Manejador de la imagen en la ventana flotante
	const handleCategoryImage = (e) => {
		setCategoryImage(e.target.files[0]);
	};
	//Manejar la ventana flotante de actualizacion de categoria
	const updateCategory = () => {
		updateCkeckedAndExpandedCategories();
		setUpdateCategoryModal(true);
	};
	const updateCkeckedAndExpandedCategories = () => {
		const categories = createCategoryList(category.categories);
		const checkedArray = [];
		const expandedArray = [];
		checked.length > 0 &&
			checked.forEach((categoryId, index) => {
				const category = categories.find(
					(category, _index) => categoryId == category.value
				);
				category && checkedArray.push(category);
			});
		expanded.length > 0 &&
			expanded.forEach((categoryId, index) => {
				const category = categories.find(
					(category, _index) => categoryId == category.value
				);
				category && expandedArray.push(category);
			});
		setCheckedArray(checkedArray);
		setExpandedArray(expandedArray);
		console.log({ checked, expanded, categories, checkedArray, expandedArray });
	};

	const handleCategoryInput = (key, value, index, type) => {
		if (type == "checked") {
			const updatedCheckArray = checkedArray.map((item, _index) =>
				index == _index ? { ...item, [key]: value } : item
			);
			setCheckedArray(updatedCheckArray);
		} else if (type == "expanded") {
			const updatedExpandedArray = expandedArray.map((item, _index) =>
				index == _index ? { ...item, [key]: value } : item
			);
			setExpandedArray(updatedExpandedArray);
		}
	};
	const updateCategoriesForm = () => {
		const form = new FormData();
		expandedArray.forEach((item, index) => {
			form.append("_id", item.value);
			form.append("name", item.name);
			form.append("parentId", item.parentId ? item.parentId : "");
			form.append("type", item.type);
		});
		checkedArray.forEach((item, index) => {
			form.append("_id", item.value);
			form.append("name", item.name);
			form.append("parentId", item.parentId ? item.parentId : "");
			form.append("type", item.type);
		});
		dispatch(updateCategories(form)).then((result) => {
			if (result) {
				dispatch(getAllCategory());
			}
		});
		setUpdateCategoryModal(false);
	};
	const renderUpdateCategoriesModal = () => {
		return (
			<Modal
				show={updateCategoryModal}
				handleClose={updateCategoriesForm}
				modalTitle={"Editar Categorias"}
				size="lg"
			>
				<Row>
					<Col>
						<h6>Expandido</h6>
					</Col>
				</Row>
				{expandedArray.length > 0 &&
					expandedArray.map((item, index) => (
						<Row key={index}>
							<Col>
								<Input
									value={item.name}
									placeholder={"Categoria"}
									onChange={(e) =>
										handleCategoryInput(
											"name",
											e.target.value,
											index,
											"expanded"
										)
									}
								/>
							</Col>
							<Col>
								<select
									className="form-control"
									value={item.parentId}
									onChange={(e) =>
										handleCategoryInput(
											"parentId",
											e.target.value,
											index,
											"expanded"
										)
									}
								>
									<option>Seleccionar Categoria</option>
									{createCategoryList(category.categories).map((option) => (
										<option key={option.value} value={option.value}>
											{option.name}
										</option>
									))}
								</select>
							</Col>
							<Col>
								<select className="form-control">
									<option value="">Tipo</option>
									<option value="store">Tienda</option>
									<option value="product">Producto</option>
									<option value="page">Pagina</option>
								</select>
							</Col>
						</Row>
					))}
				{/* para el checked */}
				<h6>Seleccionadas</h6>
				{checkedArray.length > 0 &&
					checkedArray.map((item, index) => (
						<Row key={index}>
							<Col>
								<Input
									value={item.name}
									placeholder={"Categoria"}
									onChange={(e) =>
										handleCategoryInput(
											"name",
											e.target.value,
											index,
											"checked"
										)
									}
								/>
							</Col>
							<Col>
								<select
									className="form-control"
									value={item.parentId}
									onChange={(e) =>
										handleCategoryInput(
											"parentId",
											e.target.value,
											index,
											"checked"
										)
									}
								>
									<option>Seleccionar Categoria</option>
									{createCategoryList(category.categories).map((option) => (
										<option key={option.value} value={option.value}>
											{option.name}
										</option>
									))}
								</select>
							</Col>
							<Col>
								<select className="form-control">
									<option value="">Tipo</option>
									<option value="store">Tienda</option>
									<option value="product">Producto</option>
									<option value="page">Pagina</option>
								</select>
							</Col>
						</Row>
					))}

				{/* <input
				type="file"
				name="categoryImage"
				onChange={handleCategoryImage}
			></input> */}
			</Modal>
		);
	};

	const renderAddCategoryModal = () => {
		return (
			<Modal
				show={show}
				handleClose={handleClose}
				modalTitle={"Agregar Categoria"}
			>
				<Input
					value={categoryName}
					placeholder={"Category Name"}
					onChange={(e) => setCategoryName(e.target.value)}
				/>

				<select
					className="form-control"
					value={parentCategoryId}
					onChange={(e) => setParentCategoryId(e.target.value)}
				>
					<option>Seleccionar Categoria</option>
					{createCategoryList(category.categories).map((option) => (
						<option key={option.value} value={option.value}>
							{option.name}
						</option>
					))}
				</select>
				<input
					type="file"
					name="categoryImage"
					onChange={handleCategoryImage}
				></input>
			</Modal>
		);
	};

	const renderDeleteCategoryModal = () => {
		return (
			<Modal
				modalTitle={"Confimar"}
				show={deleteCategoryModal}
				handleClose={() => setDeleteCategoryModal(false)}
				buttons={[
					{
						label: "No",
						color: "primary",
						onClick: () => {
							alert("No");
						},
					},
					{
						label: "Si",
						color: "danger",
						onClick: deleteCategories,
					},
				]}
			>
				<h5>Expandidos</h5>
				{expandedArray.map((item, index) => (
					<span key={index}>{item.name}</span>
				))}

				<h5>Seleccionados</h5>
				{checkedArray.map((item, index) => (
					<span key={index}>{item.name}</span>
				))}
			</Modal>
		);
	};
	const deleteCategory = () => {
		updateCkeckedAndExpandedCategories();
		setDeleteCategoryModal(true);
	};
	const deleteCategories = () => {
		//Tomar solo e id del Array de categorias seleccionados y expandidos
		const checkedIdsArray = checkedArray.map((item, index) => ({
			_id: item.value,
		}));
		const expandedIdsArray = expandedArray.map((item, index) => ({
			_id: item.value,
		}));
		//Unir las dos variables anteriores
		const idsArray = expandedIdsArray.concat(checkedIdsArray);
		dispatch(deleteCategoriesAction(idsArray)).then((result) => {
			if (result) {
				dispatch(getAllCategory());
				setDeleteCategoryModal(false);
			}
		});
	};
	return (
		<Layout sidebar>
			<Container>
				<Row>
					<Col md={12}>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<h3>Categorias</h3>
							<button onClick={handleShow}>Añadir</button>
						</div>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						{/* <ul>{renderCategories(category.categories)}</ul> */}
						<CheckboxTree
							nodes={renderCategories(category.categories)}
							checked={checked}
							expanded={expanded}
							onCheck={(checked) => setChecked(checked)}
							onExpand={(expanded) => setExpanded(expanded)}
							icons={{
								check: <BsCheckBox />,
								uncheck: <BsCircle />,
								halfCheck: <BsCheckCircle />,
								expandClose: <BsFillCaretRightFill />,
								expandOpen: <BsFillCaretDownFill />,
							}}
						/>
					</Col>
				</Row>

				<Row>
					<button onClick={deleteCategory}>Eliminar</button>
					<button onClick={updateCategory}>Editar</button>
				</Row>
			</Container>
			{renderAddCategoryModal()}
			{renderUpdateCategoriesModal()}
			{renderDeleteCategoryModal()}
		</Layout>
	);
};

export default Category;
