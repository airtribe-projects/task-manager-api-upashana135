TASK-MANAGER-API-UPASHANA135
---------------------------------------
This project has a list of task in task.json. In the project, different api endpoints are created to create a new task, get all the tasks, delete a task and update a task. 

📌 Features
Get all tasks: Fetch a list of all tasks.
Get a specific task: Retrieve details of a single task by ID.
Get a task based on completed status: Retrive details of all the tasks if completed is true or false.
Get a task based on priority: Retrive details of allthe tasks based on the priority (low/medium/high) of the task.
Create a task: Add a new task to the list.
Update a task: Modify an existing task’s details (e.g., title, description, completed status, priority).
Delete a task: Remove a task from the list.

🚀 Getting Started
1. Install dependencies by "npm install"
2. Run "npm run test" to check the test cases.
3. Run "node app.js" to check the api endpoints in the postman.

API Endpoints
------------------
1. Method: get
   Endpoint: /tasks
   Description: Retrieve all tasks.

2. Method: get
   Endpoint: /tasks?completed=true
   Description: Retrive the tasks where completed is true

3. Method: get
   Endpoint: /tasks/priority/:level
   Description: Retrive tasks as per priority level. "level" values can be high/medium/low.

4. Method: get
   Endpoint: /tasks/:id
   Description: Retrieve a specific task by its ID. Here, :id can be 1, 2, 3, ....

5. Method: post
   Endpoint: /tasks
   Description: Create a new task with the required fields (title, description, completed, priority). Provide a JSON body like, 
   {
        "title": "New Task",
        "description": "New Task Description",
        "completed": false,
        "priority": "high"
    }

6. Method: put
   Endpoint: /tasks/:id
   Description: Update an existing task by its ID. Provide a JSON body with the updated values of the id like,
   {
        "title": "Updated Task",
        "description": "Updated Task Description",
        "completed": true,
        "priority" : "low"
    }

7. Method: delete
   Endpoint: /tasks/:id
   Description: Delete a task by its ID.

🛠 Testing API Endpoints in Postman
1. Open Postman.
2. Enter the API URL as mentioned above.
3. Select the HTTP Method as mentioned above. 
4. Click "Send" to test the request.
5. View Response in the Postman window.