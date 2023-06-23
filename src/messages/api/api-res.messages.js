const API_MESSAGE = {
	API_SUCCESS: "API executed successfully",
	SERVER_ERROR: "Something went wrong",
	NOT_FOUND: "Resource trying to access, not found",
	REQUEST_TIMEOUT: "Request Timeout",
	UNAUTHORIZED: "Unauthorized access",
	LOGIN: {
		USER_ALREADY_EXIST: "User Already Exists",
		USER_NOT_FOUND: "User not found",
		INVALID_PASSWORD: "Invalid Password",
		LOGIN_SUCCESS: "User login successfully",
		USER_NOT_EXISTS: "User does not exists..please signup",
		TOKEN_NOT_EXISTS: "Token does not exists",
		TOKEN_EXPIRED: "Token expired",
	},
	SIGNUP: {
		USER_ALREADY_EXIST: "User Already Exists",
		SIGNUP_SUCCESS: "User account created successfully",
		PASSWORD_UPDATED: "Password updated successfully",
		TOKEN_EXPIRED: "Token expired",
		USER_UPDATE: "User account updated successfully",
	},
};

module.exports = {
	API_MESSAGE,
};