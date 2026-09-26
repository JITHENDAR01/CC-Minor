export const URL = "http://localhost:80/";
export const IF = "http://localhost:80/uploads/" //IF stands for image folder , we are not getting that image so we fetch it like this
export const imageUrl = (photo) => {
	if (!photo) return "";
	return /^https?:\/\//i.test(photo) ? photo : IF + photo;
};