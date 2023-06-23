const employeeRoutes = require("./employee/employee.routes");
const hrRoutes = require("./hr/hr.routes");
const managementRoutes = require("./management/management.routes");

const routes = (app) => {
	app.use("/api", employeeRoutes);
	app.use("/api", hrRoutes);
	app.use("/api", managementRoutes);
};

module.exports = routes;
