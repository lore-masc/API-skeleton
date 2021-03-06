const Db = require("../models/db.js");
const assignment = require("../models/assignment.js");

exports.sendAssignmentById = function (req, res) {
	var new_id = Db.getAll().length;
	var new_obj, studentId, assignmentId, assignmentType, assignmentContent;
	assignmentId = new_id;
	studentId = req.body.studentId;
	assignmentType = req.body.assignmentType;
	assignmentContent= req.body.assignmentContent;
 	new_obj = new assignment(assignmentId, studentId, assignmentType, assignmentContent);
 	if(studentId == undefined || assignmentType == undefined || assignmentContent == undefined){
 		return res.status(500).json({message: 'Assignment non aggiunto'});
 	}else{
		Db.insert(new_obj);
		return res.status(200).json({message: 'Assignment aggiunto', assignmentId: assignmentId});
	}
};

exports.getAllAssignments = function(req, res) {
	var all = Db.getAll();
	if(req.query.studentid !== undefined){
		var id = req.query.studentid;
		var list = [];
		for(i = 0; i < all.length; i++)
			if(all[i]['studentId'] == id)
				list.push(all[i]);
		if(list.length == 0){
			return res.status(500).json({message: 'Student Id non trovato'});
		}else{
			return res.status(200).json(list);
		}
	} else {
		return res.status(200).json(all);
	}
};

exports.getAssignmentById = function(req, res) {
	var id = req.params.id;
	var found = Db.getById(id);
	if (found !== undefined){
		return res.status(200).json(Db.getById(id));
	} else {
		return res.status(500).json({message: 'Assignment non trovato'});
	}
};

exports.removeAssignmentById = function(req, res) {
	var id = req.params.id;
	var found = Db.getById(id);
	if (found !== undefined){
		Db.removeById(id);
		return res.status(200).json({message: 'Assignment ' + id + ' eliminato'});
	} else {
		return res.status(500).json({message: 'Assignment non trovato'});
	}
};

exports.updateAssignmentById = function(req, res) {	
	var id = req.params.id;
	var found = Db.getById(id);
	if (found !== undefined){
		studentId = req.body.studentId;
		assignmentType = req.body.assignmentType;
		assignmentContent= req.body.assignmentContent;
		obj = new assignment(id, studentId, assignmentType, assignmentContent);
		Db.updateById(id, obj);
		return res.status(200).json({message: 'Assignment ' + id + ' aggiornato'});
	} else {
		return res.status(500).json({message: 'Assignment non trovato'});
	}
};