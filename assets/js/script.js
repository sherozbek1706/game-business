const loginBtn = document.querySelector("#login__btn");
const loginText = document.querySelector("#login__text");
const passwordBtn = document.querySelector("#password__btn");
const passwordText = document.querySelector("#password__text");

const renderUser = () => {
  let login = localStorage.getItem("login") || "User not login";
  let password = localStorage.getItem("password") || "User not login";
  loginText.textContent = login;
  passwordText.textContent = password;
};
renderUser();

loginBtn.addEventListener("click" ,)


