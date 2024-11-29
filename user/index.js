import readline from "readline-sync"; //the variable name is readline
import fs from "fs/promises";


async function readFile() {
  let read = await fs.readFile();
  return read;
}

async function registerUser() {
  // step 1:
  let db = await fs.readFile("./db.json", "utf-8");
  console.log(db);

  let final = JSON.parse(db);
  console.log(final);

  //step 2:
  let userName = readline.question("Enter your userName : ");
  let password = readline.question("Enter your password : ");
  console.log(userName, password);

  // if the user Name is already exist
  let check = final.users.some((x) => x.username === userName);
  if (check) {
    console.log("the user name all ready exist");
    return;
  }

  //step 3:
  let topush = { username: userName, password: password };
  final.users.push(topush);

  let send = JSON.stringify(final);

  await fs.writeFile("./db.json", send);

  // conformation
  console.log("You are succusfully Login ");
}

function Login() {
  console.log("You have Login");
}
export { registerUser, Login };
