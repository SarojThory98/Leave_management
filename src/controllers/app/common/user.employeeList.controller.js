const response = require("../../../utils/api/api-response-handler.utils");
const {User} = require("../../../models/user/user.model");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");
const {USER_KEYS} = require("../../../constants/models/employee/employee.model.key");
const {USER_TYPE_ENUM} = require("../../../constants/models/Enums/signUpEnums");

const employeeList = async (req, res) => {
	try {
		const allEmployeeList = await User.find({[USER_KEYS.TYPE]: USER_TYPE_ENUM.EMPLOYEE});
		if (allEmployeeList && allEmployeeList.length) {
			return response.success(res, API_MESSAGE.EMPLOYEE_LIST.GET_EMPLOYEE_SUCCESS, allEmployeeList);
		}
		return response.error(res, API_MESSAGE.EMPLOYEE_LIST.NO_EMPLOYEE);
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	employeeList,
};
