const Db = require("../models/db.js");
const assignment = require("../models/assignment.js");

exports.sendAssignmentById = function (req, res) {
	var new_id = Db.getAll.length;
	var new_obj;
	assignmentId = new_id;
	studentId = req.body.studentId;
	assignmentType = req.body.assignment_type;
	assignmentContent= req.body.assignment_content;
 	new_obj = new assignment(assignmentId, studentId, assignmentType, assignmentContent);
 	//console.log("NODE: " + JSON.stringify(new_obj));
	Db.insert(new_obj);
	return res.json("Assignment aggiunto");
};

exports.getAllAssignments = function(req, res) {
	var all = Db.getAll();
	if(req.query.studentid !== undefined){
		var id = req.query.studentid;
		var list = [];
		for(i = 0; i < all.length; i++)
			if(all[i]['studentId'] == id)
				list.push(all[i]);
		return res.json(list);
	} else 
		return res.json(all);
};

exports.getAssignmentById = function(req, res) {
	var id = req.params.id;
	var found = Db.getById(id);
	if (found !== undefined)
		return res.json(Db.getById(id));
	else
		return res.json("Assignment non trovato");
};

exports.removeAssignmentById = function(req, res) {
	var id = req.params.id;
	var found = Db.getById(id);
	if (found !== undefined){
		Db.removeById(id);
		return res.json("Assignment " + id + " eliminato");
	}else
		return res.json("Assignment non trovato");
};

exports.updateAssignmentById = function(req, res) {	
	var id = req.params.id;
	var found = Db.getById(id);
	if (found !== undefined){
		studentId = req.body.studentId;
		assignmentType = req.body.assignment_type;
		assignmentContent= req.body.assignment_content;
		obj = new assignment(id, studentId, assignmentType, assignmentContent);
		Db.updateById(id, obj);
		return res.json("Assignment " + id + " aggiornato");
	}else
		return res.json("Assignment non trovato");
};