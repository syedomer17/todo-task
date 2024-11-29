import readline from "readline-sync";
import { registerUser,Login } from "./user/index.js";

async function task() {
  console.clear();
  console.log("-----------------");
  console.log("----todo-task----");
  console.log("*****************");

  const options = [
    "Exit",
    "Register",
    "Login",
    "Add Task",
    "Update Task",
    "Delete Task",
    "Delete user",
  ];
  options.map((Element, index) => {
    console.log(`${index}.${Element}`);
  });

  const userInput = readline.questionInt("Enter your options : ");
  console.log(userInput);

  switch (userInput) {
    case 0:
      console.log("Exit");
      break;
    case 1:
      console.log("Register");
      await registerUser();
      break;
    case 2:
      console.log("Login");
      Login();
      break;
    case 3:
      console.log("Add Task");
      break;
    case 4:
      console.log("Update Task");
      break;
    case 5:
      console.log("Delete Task");
      break;
    case 6:
      console.log("Delete user");

    default:
      console.log("Enter valide number");
      break;
  }
}
task();
