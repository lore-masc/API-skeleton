const root = 'https://sleepy-citadel-35442.herokuapp.com'
const fetch = require("node-fetch")
const assignmentsRoot = root+'/assignment/'
const exampleAssignment =  {
    "studentId": "544",
    "assignmentId": "12",
    "assignmentType": "text",
    "assignmentContent": "minim"
}

const postAssignments = function (newAssignment) {
    return fetch(assignmentsRoot, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newAssignment)
    })
}

const putAssignments = function (assignment, assignmentID) {
    return fetch(assignmentsRoot+'/'+assignmentID, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(assignment)
    })
}

const deleteAssignments = function (assignmentID) {
    return fetch(assignmentsRoot+'/'+assignmentID, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
}


const getManyAssignments = function () {
    return fetch(assignmentsRoot, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
    })
}

const getOneAssignment = function (assignmentID) {
    return fetch(assignmentsRoot+'/'+assignmentID, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
    })
}

test('basic post and get', () => {
    return postAssignments(exampleAssignment)
        .then(postResponse => { return postResponse.json() })
        .then(postResponseJson => {
            exampleAssignment.assignmentId = postResponseJson.assignmentId
            return getOneAssignment(exampleAssignment.assignmentId)
        })
        .then(getResponse => {return getResponse.json()})
        .then(jsonResponse => {expect(jsonResponse.assignmentContent).toEqual(exampleAssignment.assignmentContent)})
        //.catch(e => {console.log(e)})
});

test('basic update and get', () => {
    exampleAssignment.assignmentContent = "after update";
    return putAssignments(exampleAssignment, exampleAssignment.assignmentId)
        .then(postResponse => { return postResponse.json() })
        .then(postResponseJson => {
            return getOneAssignment(exampleAssignment.assignmentId)
        })
        .then(getResponse => {return getResponse.json()})
        .then(jsonResponse => {expect(jsonResponse.assignmentContent).toEqual(exampleAssignment.assignmentContent)})
        //.catch(e => {console.log(e)})
});
  
test('delete by assignmentID - basic response', () => {
    return deleteAssignments(exampleAssignment.assignmentId)
        .then(getResponse => {return getResponse.json()})
        .then(jsonResponse => {expect(jsonResponse.message).toEqual("Assignment " + exampleAssignment.assignmentId + " eliminato") })
        //.catch(e => {console.log(e)})
});

test('delete by assignmentID - item actually deleted', () => {
    return getOneAssignment(exampleAssignment.assignmentID)
        .then(getResponse => {return getResponse.json()})
        .then(jsonResponse => {expect(jsonResponse.message).toBe("Assignment non trovato")})
        //.catch(e => {console.log(e)})
});