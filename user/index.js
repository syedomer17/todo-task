import readline from "readline-sync"; // Import readline-sync
import fs from "fs/promises"; // Import fs for file operations


// Register user function
async function registerUser() {
  // Step 1: Read the db.json file
  let db = await fs.readFile("./db.json", "utf-8");
  console.log(db);

  let final = JSON.parse(db);
  console.log(final);

  // Step 2: Get user credentials
  let userName = readline.question("Enter your userName: ");
  let password = readline.questionNewPassword("Enter your password: ");
  console.log(userName, password);

  // Step 3: Check if username already exists
  let check = final.users.some((x) => x.username === userName);
  if (check) {
    console.log("The user name already exists");
    return;
  }

  // Step 4: Add new user
  let newUser = { username: userName, password: password };
  final.users.push(newUser);

  // Step 5: Write updated users back to db.json
  let send = JSON.stringify(final, null, 2); // Formatting the JSON nicely
  await fs.writeFile("./db.json", send);

  // Confirmation
  console.log("You have successfully registered.");
}

// Login function
function Login() {
  console.log("You have logged in");
}

// Add task function
async function Addtask() {
  
    // Step 1: Read tasks from tasks.json
    let TasksDB = await fs.readFile("./tasks.json", "utf-8");
    let tasks = JSON.parse(TasksDB);

    // Step 2: Ask user for task details
    let taskName = readline.question("Enter task name: ");
    let taskdiscrip = readline.question("Enter the description: ");
    let taskdue = readline.question("Enter the due date (yyyy-mm-dd): ");

    // Step 3: Create new task object
    let newTask = {
      taskName,
      taskdiscrip,
      taskdue,
      status: "pending", // initial task status
    };

    // Step 4: Add the new task to the tasks array
    tasks.tasks.push(newTask); // Add new task directly to tasks array

    // Step 5: Write the updated tasks array back to tasks.json
    await fs.writeFile("./tasks.json", JSON.stringify(tasks, null, 2)); // Format the JSON nicely

    if(Addtask){
      console.log("Task added successfully!");
    }else{
      console.log("error hai",error);
    }

}



// adding update task 



async function updateTask() {
  // Step 1: Read the tasks from tasks.json
  const taskDB = await fs.readFile("./tasks.json", "utf-8");
  const tasks = JSON.parse(taskDB);

  // Step 2: Check that the tasks array exists
  if (!Array.isArray(tasks.tasks)) {
    console.log("No tasks available.");
    return;
  }

  // Step 3: Display the tasks
  console.log("Select the task to update:");
  tasks.tasks.forEach((task, index) => { // Correct the forEach syntax
    console.log(`${index + 1}. ${task.taskName} - ${task.status}`);
  });

  const taskIndex = readline.questionInt("Enter the number of the task you want to update: ") - 1; // Adjust for 0-based index

  // Check if the selected task is valid
  if (taskIndex < 0 || taskIndex >= tasks.tasks.length) {
    console.log("Invalid task selection.");
    return;
  }


  const taskToUpdate = tasks.tasks[taskIndex]; // Select the task based on user input
  console.log(`You selected task: ${taskToUpdate.taskName}`);

  // Step 4: Prompt user for new task details
  const newTaskName = readline.question(`Enter the new task name (current: ${taskToUpdate.taskName}): `);
  const newTaskDescription = readline.question(`Enter the new description (current: ${taskToUpdate.taskdiscrip}): `);
  const newTaskDueDate = readline.question(`Enter the new due date (current: ${taskToUpdate.taskdue}): `);

  // Step 5: Update the task properties with new values
  taskToUpdate.taskName = newTaskName || taskToUpdate.taskName; // If no new name, keep the old one
  taskToUpdate.taskdiscrip = newTaskDescription || taskToUpdate.taskdiscrip; // If no new description, keep the old one
  taskToUpdate.taskdue = newTaskDueDate || taskToUpdate.taskdue; // If no new due date, keep the old one

  // Step 6: Save the updated tasks back to tasks.json
  await fs.writeFile("./tasks.json", JSON.stringify(tasks)); // Write to file with formatted JSON

  console.log("Task updated successfully!");
}

async function DeleteTask() {
  // Step 1: Read and parse the tasks.json file
  const taskDB = await fs.readFile("./tasks.json", "utf-8");
  const tasks = JSON.parse(taskDB);

  // Step 2: Ensure that the tasks exist and it is an array
  if (!Array.isArray(tasks.tasks)) {
    console.log("No tasks available.");
    return;
  }

  // Step 3: Show the tasks and ask the user for the task to delete
  console.log("Select the task to delete:");
  tasks.tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.taskName} - ${task.status}`);
  });

  // Step 4: Get the user's input and validate it
  const taskIndex = readline.questionInt("Enter the task number to delete: ") - 1; // Adjust for 0-based index

  // Validate the user's input
  if (taskIndex < 0 || taskIndex >= tasks.tasks.length) {
    console.log("Invalid task selection.");
    return;
  }

  // Step 5: Remove the selected task from the array
  tasks.tasks.splice(taskIndex, 1);

  // Step 6: Save the updated tasks back to tasks.json
  await fs.writeFile("./tasks.json", JSON.stringify(tasks)); // Pretty-print JSON

  console.log("Task has been successfully deleted the task.");
}

// Export the functions
export { registerUser, Login, Addtask, updateTask, DeleteTask };
