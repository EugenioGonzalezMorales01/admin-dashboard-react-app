const urlBase = process.env.API || "https://dashboard-rest.herokuapp.com";
export const api = `${urlBase}/api`;
export const generatePublicUrl = (fileName) => {
	return `${urlBase}/public/${fileName}`;
};
