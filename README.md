# node-todo-sql-driver-experimanet
This project was made as a test/playground for some of the more popular sql driver choices with node.js.

## How to run
each folder in the rood directory represents an sql project. running `npm install` and `npm run dev` in each of these files will run the server. 

## rest routes
All rest routes are the same across the project. 

### POST /api/todos/create
creates a new todo list

### GET /api/todos/list
gets a list ofa all todo lists including their todo items

### GET /api/todos/:todoId
uses the id of a tode list and retrieves only that list

### PUT /api/todos/update/:todoId
takes a parameter `title` which is a string

### DELETE /api/todos/remove/:todoId
deletes a todo list based on the id passed in the url

### POST /api/todos/create/:todoId/items
creates a todo item and assigns it to a todo list based on the id based in the url. 
This route also requires a string `content` to be bassed in to the body as a json object

### PUT /api/todos/update/:todoId/:todoItemId
allows you to update todo items individually. This route can take two parameters in it's body. `content` and `complete`.

`content` is a string which is the title of the todo item. 
`complete` is a boolean value. True means the item is complete and false means the item is not yet complete

### DELETE /api/todos/remove/:todoId/:todoItemId
allows removal of a todo item as long as the correct `todoId` and `todoItemId` are given in the url
