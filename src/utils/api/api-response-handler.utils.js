const responseCode = require("../../constants/api_res_code/api.res.code");
const {API_RES_CODE} = responseCode;
const error = (res, error) => {
	return res.status(API_RES_CODE.BAD_REQUEST).json({
		status: API_RES_CODE.VALIDATION_ERROR,
		message: error,
	});
};

const success = (res, message, data = []) => {
	return res.status(API_RES_CODE.SUCCESS).json({
		status: API_RES_CODE.SUCCESS,
		message: message,
		data: data,
	});
};

module.exports = {
	error,
	success,
};
