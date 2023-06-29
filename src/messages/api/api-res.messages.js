const API_MESSAGE = {
	API_SUCCESS: "API executed successfully",
	SERVER_ERROR: "Something went wrong",
	NOT_FOUND: "Resource trying to access, not found",
	REQUEST_TIMEOUT: "Request Timeout",
	UNAUTHORIZED: "Unauthorized access",
	NOT_EXIST_TOKEN: "Authorization token is not provided",
	LOGIN: {
		USER_ALREADY_EXIST: "User Already Exists",
		USER_NOT_FOUND: "User not found",
		INVALID_PASSWORD: "Invalid Password",
		LOGIN_SUCCESS: "User login successfully",
		USER_NOT_EXISTS: "User does not exists..please signup",
		TOKEN_NOT_EXISTS: "Token does not exists",
		STATUS_NOT_APPROVED: "User status is not approved",
		TOKEN_EXPIRED: "Token expired",
	},
	SIGNUP: {
		USER_ALREADY_EXIST: "User Already Exists",
		SIGNUP_SUCCESS: "User account created successfully",
		PASSWORD_UPDATED: "Password updated successfully",
		TOKEN_EXPIRED: "Token expired",
		USER_UPDATE: "User account updated successfully",
		REMOVE_USER_SUCCESS: "Employee removed successfully",
		REMOVE_USER_ERROR: "No document matched the filter, nothing was deleted",
	},
	LOGOUT: {
		LOGOUT_SUCCESS: "User logout successfully",
		LOGOUT_ERROR: "User logout error",
	},
	UPDATE_EMPLOYEE_STATUS: {
		UPDATE_STATUS_SUCCESSS: "Employee status updated successfully",
		UPDATE_STATUS_ERROR: "Employee status updation error",
	},
	UPDATE_USER_INFORMATION: {
		UPDATION_SUCCESS: "User information successfully updated",
		UPDATION_ERROR: "User information updation error",
	},
	LEAVE_REQUEST: {
		LEAVE_SUCCESS: "Leave request apllied successfully",
		PENDING_REQUEST: "Past request pending. You can apply new leave when past request will approve",
		PAST_LEAVE_SUCCESS: "Successfully get user all leave requests",
		NO_LEAVE_REQUEST: "User didn't apply any leave",
		EXCEEDED_LEAVE_LIMIT: "Leave days can't be grater than 2",
		EXCEEDED_LEAVE_BANK_LIMIT: "Leave bank has lower limit",
	},
	EMPLOYEE_LIST: {
		GET_EMPLOYEE_SUCCESS: "Successfully get all employee list",
		NO_EMPLOYEE: "There is no employee in the list",
	},
	UPDATE_LEAVE_STATUS: {
		UPDATE_LEAVE_STATUS_SUCCESS: "Successfully updated leave request status",
		UPDATE_LEAVE_STATUS_ERROR: "Failed to update leave request status",
		EMPLOYEE_USER_TYPE: "User not found or does not have the employee type",
		HR_USER_TYPE: "User not found or does not have the HR type",
		SAME_STATUS: "Past leave status is already same",
	},
	PUBLIC_HOLIDAY: {
		ADD_HOLIDAY_SUCCESS: "Successfully public holiday added",
		HOLIDAY_ALREADY_EXIST: "Holiday date already added",
		UPDATE_SUCCESS: "Public holiday updated successfully",
		UPDATE_ERROR: "Public holiday updation error",
		DELETE_SUCCESS: "Public holiday deleted successfully",
		DELETE_ERROR: "Public holiday deletion error",
		GET_PUBLIC_HOLIDAY_SUCCESS: "Holiday list get successfully",
		GET_PUBLIC_HOLIDAY_ERROR: "No public holiday",
	},
	LEAVE_BANK: {
		LEAVE_BANK_ADD_SUCCESS: "User leave bank added successfully",
		LEAVE_BANK_EXIST: "User leave bank already exist",
		LEAVE_BANK_DELETE: "User leave bank deleted successfully",
		NO_RESPONSE: "leave-bank already exist",
	},
};

module.exports = {
	API_MESSAGE,
};
