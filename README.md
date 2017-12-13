### Nodejs skeleton API
Sample application to demonstrate how to **develop** an **API service**

### Steps to start the application
- git clone https://github.com/lore-masc/API-skeleton.git
- npm install
- node start.js

### HOW TO USE API ASSIGNMENT
***Parameters*** (*required*)
- student ID
- assignment ID
- assignment type
- assignment-content

***URLs***
- leggere tutti gli assignment (GET - /assignment)
- leggere tutti gli assignment di uno student ID  	(GET - /assignment?studentid=:id)
- leggere uno specifico assignment 					(GET - /assignment/:id)
- consegnare un assignment 							(POST - /assignment/)
- modificare assignment 								(PUT - /assignment/:id)
- rimuovere assignment 								(DELETE - /assignment/:id)

***More details***
Read Apiary documentation in https://assignmentapi1.docs.apiary.io/