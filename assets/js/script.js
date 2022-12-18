const loginBtn = document.querySelector("#login__btn");
const loginText = document.querySelector("#login__text");
const passwordBtn = document.querySelector("#password__btn");
const passwordText = document.querySelector("#password__text");
const LogOutSection = document.querySelector("#LogOut__section");
const LogOutBtn = document.querySelector("#LogOut__btn");
const spinner = document.querySelector("#spinner");
const spinnerTitle = document.querySelector("#spinner__title");

const restTime = (renderUser) => {
  setTimeout(() => {
    spinner.classList.add("d-none");
    renderUser();
  }, 2000);
  spinner.classList.remove("d-none");
};

const renderUser = () => {
  let login = localStorage.getItem("login") || "User not login";
  let password = localStorage.getItem("password") || "";
  let hashedPassword;
  if (login == "User not login") {
    loginBtn.disabled = false;
    LogOutSection.classList.add("d-none");
  } else {
    loginBtn.disabled = true;
    LogOutSection.classList.remove("d-none");
  }
  if (password) {
    let passwordlength = password.split("").length;
    hashedPassword = "";
    for (let i = 1; i <= passwordlength; i++) {
      hashedPassword += "*";
    }
    passwordBtn.disabled = false;
    passwordBtn.textContent = "Change Password!";
  } else {
    hashedPassword = "User not login";
    passwordBtn.disabled = true;
  }

  loginText.textContent = login;
  passwordText.textContent = hashedPassword;
};
renderUser();

loginBtn.addEventListener("click", () => {
  let login = prompt("What is your login ?");
  while (!login) {
    login = prompt("Xatolik! What is your login ?");
  }
  let password = prompt("What is your password ?");
  while (!(password.length >= 6)) {
    alert("Parolda 6 ta simvol bo'lishi kerak!");
    password = prompt("again! What is your password ?");
  }
  localStorage.setItem("login", login);
  localStorage.setItem("password", password);
  spinnerTitle.textContent = `${login} - yangi profil ochganiz bilan tabriklaymiz!😊😊`
  restTime(renderUser);
});

passwordBtn.addEventListener("click", () => {
  let isAgree = confirm("Do you really agree to change you password ?");

  while (isAgree) {
    let password = localStorage.getItem("password");
    let chance = 5;
    let oldPassword = prompt(`Your chance ${chance}! Enter you old Password!`);
    let removeUser = false;
    while (+password !== +oldPassword && !removeUser) {
      chance = chance - 1;
      oldPassword = prompt(`Your chance ${chance}! Enter you old Password!`);
      if (!chance) {
        removeUser = true;
        localStorage.removeItem("login");
        localStorage.removeItem("password");
      }
    }
    if (!removeUser) {
      let newPassword = prompt(`Enter you new Password! 🆕🆕🆕`);
      while (!(newPassword.length >= 6)) {
        alert("Parolda 6 ta simvol bo'lishi kerak!");
        newPassword = prompt("again! Enter you new Password! 🆕🆕🆕");
      }
      localStorage.setItem("password", newPassword);
      isAgree = false;
      spinnerTitle.textContent = "Parol Muvoffaqiyatli o'zgardi! 🎉🎉🎉";
      restTime(renderUser);
    } else {
      isAgree = false;
      spinnerTitle.textContent =
        "Sayt sizdan shubhalanmoqda, siz bloklandingiz ❌❌❌";
      restTime(renderUser);
    }
  }
});

LogOutBtn.addEventListener("click", () => {
  localStorage.removeItem("login");
  localStorage.removeItem("password");
  spinnerTitle.textContent = "Saytdan foydalanganingiz uchun Raxmat👋👋";
  restTime(renderUser);
});
