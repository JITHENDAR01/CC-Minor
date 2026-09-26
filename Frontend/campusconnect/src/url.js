const backendUrl = import.meta.env.PROD ? "/" : "http://localhost:80/";
export const URL = backendUrl;
export const IF = `${backendUrl}uploads/`;
export const imageUrl = (photo) => {
	if (!photo) return "";
	return /^https?:\/\//i.test(photo) ? photo : IF + photo;
};