const error = (res, error) => {
	return res.status(400).json({
		"status": 400,
		"error": error
	});
};

const success = (res, message, data=[]) => {
	return res.status(201).json({
		"status": 201,
		"message": message,
		"data":data
	});
};

module.exports = {
	error,
	success
};