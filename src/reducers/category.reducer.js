/* eslint-disable import/no-anonymous-default-export */
import { categoryConstants } from "../actions/constants";
import Category from "../containers/Category";

const initState = {
	categories: [],
	loading: false,
	error: null,
};

//Actualiza las categorias mostradas en pantalla añadiendo la nueva agregada
const buildNewCategories = (parentId, categories, category) => {
	let myCategories = [];
	//En caso de que la categoria añadida no tenga una categoria padre
	if (!parentId) {
		return [
			...categories,
			{
				_id: category._id,
				name: category.name,
				slug: category.slug,
				children: [],
			},
		];
	}
	//En caso de que la categoria añadida si tenga una categoria padre
	for (let cat of categories) {
		if (cat._id === parentId) {
			const newCategory = {
				_id: category._id,
				name: category.name,
				slug: category.slug,
				parentId: category.parentId,
				children: [],
			};
			myCategories.push({
				...cat,
				children:
					cat.children > 0 ? [...cat.children, newCategory] : [newCategory],
			});
		} else {
			myCategories.push({
				...cat,
				children:
					cat.children && cat.children.length > 0
						? buildNewCategories(parentId, cat.children, category)
						: [],
			});
		}
	}
	return myCategories;
};

export default (state = initState, action) => {
	switch (action.type) {
		case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
			state = {
				...state,
				categories: action.payload.categories,
			};
			break;
		case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
			state = {
				...state,
				error: action.payload.error,
			};
			break;
		case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;
		case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
			const category = action.payload.category;
			const updatedCategories = buildNewCategories(
				category.parentId,
				state.categories,
				category
			);
			console.log(updatedCategories);

			state = {
				...state,
				categories: updatedCategories,
				loading: false,
			};
			break;
		case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
			state = {
				...state,
				loading: false,
			};
			break;
		default:
			console.log("");
			break;
	}
	return state;
};
