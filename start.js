/*
    Project: Sample API for manage student assignments
    Author: lorenzomasciullo@outlook.it
*/

const express   = require("express"),
	app         = express(),
	bodyParser  = require("body-parser"),
	assignmentRouter  = express.Router(),
	assignmentRoutes  = require("./route/assignmentRoutes.js")

// Body-parser (To parse the request body)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* 
    Add to avoid cross origin access.
    Access-Control-Allow-Origin is set to '*' so that server REST APIs are accessible for all the domains.
    By setting domain name to some value, the API access can be restricted to only the mentioned domain. 
    Eg, Access-Control-Allow-Origin: 'mywebsite.com'
*/
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "content-type");
	next();
});

// Set the port no
app.set("port", process.env.PORT || 3000);

assignmentRouter.route('/')
  .get(assignmentRoutes.getAllAssignments)
  .post(assignmentRoutes.sendAssignmentById);
assignmentRouter.route('/:id')
  .get(assignmentRoutes.getAssignmentById)
  .put(assignmentRoutes.updateAssignmentById)
  .delete(assignmentRoutes.removeAssignmentById);

app.use("/assignment", assignmentRouter);

// Start the service
app.listen(app.get("port"));
console.log("Sample node server Started @ " + new Date() + " Running on port no: " + app.get("port"));