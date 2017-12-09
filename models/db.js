const assignment = require("./assignment.js");
const db = new Array();

exports.getAll = function(){
	return db;
};

exports.getById = function(id){
	return db[search(id)];
};

exports.removeById = function(id){
	var index = search(id);

	if (index > -1) 
	    db.splice(index, 1);
};

exports.insert = function(node){
	db.push(node);
};

exports.updateById = function(id, node){
	var index = search(id);
	if(index > -1)
		db[index] = node;
};

var search = function(id){
	var index = -1;
	for(i = 0; i < db.length; i++)
		if(db[i]["assignmentId"] == id)
			index = i;
	return index;
}