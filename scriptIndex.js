const url = "https://sleepy-citadel-35442.herokuapp.com/assignment/";
//const url = "http://localhost:3000/assignment/";

insertAssignment = function (){
    var studentId = document.getElementById('stdIdInvia').value;    
    var assignmentType = document.getElementById('asTypeInvia').value;
    var assignmentContent = document.getElementById('asContInvia').value;

    fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                studentId: studentId,
                assignmentType: assignmentType,
                assignmentContent: assignmentContent
            })
        })
    .then(function(response) { return response.json(); })
    .then(function(data) {
        alert(data.message);
    });

}
//creare un alert di conferma avvenuto inserimento o di errore (quest'ultimo anche nelle altre fun)

visualizzaAssignment = function (){
    console.log("visualizzo assignment");
    const ul = document.getElementById('studenti');
    fetch(url)
        .then((response) =>  {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            while (ul.hasChildNodes())
                ul.removeChild(ul.childNodes[0]);
            
            for (var i = 0; i < data.length; i++) {            
                let li = document.createElement('li'); //  Create the elements we need
                let span = document.createElement('span');
                span.innerHTML = `${data[i].assignmentId} ${data[i].studentId} ${data[i].assignmentType} ${data[i].assignmentContent}`;
                // Append all our elements
                li.appendChild(span);
                ul.appendChild(li);
            }
        });
}

visualizzaAssignmentId = function(){
    let assignmentId = document.getElementById('assIdsel').value;
    var newUrl = url + assignmentId;
    const ul = document.getElementById('assignmentId');

    fetch(newUrl)
        .then ((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            if(data.assignmentId !== undefined){
                let li = document.createElement('li'); //  Create the elements we need
                let span = document.createElement('span');
                span.innerHTML = `${data.assignmentId} ${data.studentId} ${data.assignmentType}`; // Make the HTML of our span to be the first and last name of our author
                // Append all our elements
                li.appendChild(span);
                if (ul.hasChildNodes()) {
                    ul.removeChild(ul.childNodes[0]);
                } 
                ul.appendChild(li);
            }else{
                alert(data.message);
            }
        });
}

eliminaAssignmentById = function () {
    assignmentId = document.getElementById('elminaAssId').value;
    var newUrl = url + assignmentId;

    fetch(newUrl, {
        method: "DELETE",
        mode : 'cors',
        headers: {
        Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(function(response) { return response.json(); })
    .then(function(data) {
        alert(data.message);
    });
}

updateAssignmentById = function (){
    var studentId = document.getElementById('upStudId').value;
    var assignmentId = document.getElementById('upAssId').value;
    var assignmentType = document.getElementById('upAsstype').value;
    var assignmentContent = document.getElementById('upAssContent').value;
    var newUrl = url + assignmentId;

    fetch(newUrl, {
        method: "PUT",
        mode: 'cors',
        headers: {
        Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            studentId: studentId,
            assignmentId: assignmentId,
            assignmentType: assignmentType,
            assignmentContent : assignmentContent
        })
    }).then((response) => {
        alert("aggiornato");
    });
}