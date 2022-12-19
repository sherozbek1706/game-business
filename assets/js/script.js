const registerSection = document.querySelector("#register__section");
const registerBtn = document.querySelector("#register__btn");
const loginBtn = document.querySelector("#login__btn");
const loginText = document.querySelector("#login__text");
const passwordBtn = document.querySelector("#password__btn");
const passwordText = document.querySelector("#password__text");
const LogOutSection = document.querySelector("#LogOut__section");
const LogOutBtn = document.querySelector("#LogOut__btn");
const BalanceSection = document.querySelector("#Balance__section");
const BalanceBtn = document.querySelector("#Balance__btn");
const BalanceText = document.querySelector("#Balance__text");
const spinner = document.querySelector("#spinner");
const spinnerTitle = document.querySelector("#spinner__title");

const setUsers =
  JSON.parse(localStorage.getItem("allUser")) ||
  localStorage.setItem("allUser", JSON.stringify([]));

const allUser = setUsers || JSON.parse(localStorage.getItem("allUser"));

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
    registerSection.classList.remove("d-none");
    BalanceSection.classList.add("d-none");
  } else {
    loginBtn.disabled = true;
    BalanceSection.classList.remove("d-none");
    registerSection.classList.add("d-none");
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
  let balance = localStorage.getItem("balance");
  loginText.textContent =
    login == "User not login"
      ? "User not login"
      : `@${login.split(" ").join("_").toLocaleLowerCase()}`;
  passwordText.textContent = hashedPassword;
  BalanceText.textContent = `${balance} $`
};
renderUser();

registerBtn.addEventListener("click", () => {
  let login = prompt("Uzingiz uchun bir login kiriting...");
  let isAlreadyLogin = true;
  while (!login) {
    login = prompt("Xatolik! Login kiriting...");
  }

  while (isAlreadyLogin) {
    if (!(allUser == false)) {
      for (let i = 0; i < allUser.length; i++) {
        if (login == allUser[i]?.login) {
          login = prompt("Xatolik! Bu Login allaqachon  kiritilgan...");
        } else {
          isAlreadyLogin = false;
        }
      }
    } else {
      isAlreadyLogin = false;
    }
  }

  let password = prompt("Parol kiriting...");
  while (!(password.length >= 6)) {
    alert("Parolda 6 ta simvol bo'lishi kerak!");
    password = prompt("Boshidan!  Parol kiriting...?");
  }

  const newUser = {
    user__id: Math.floor(Math.random() * 100000),
    login: login,
    password: password,
    user__balance: 0,
  };
  allUser.push(newUser);
  localStorage.setItem("allUser", JSON.stringify(allUser));
  spinnerTitle.textContent = `${login} - yangi profil ochganiz bilan tabriklaymiz!😊😊`;
  restTime(renderUser);
});

loginBtn.addEventListener("click", () => {
  let isHaveLogin = false;
  let login = prompt("What is your login ?");
  while (!login) {
    login = prompt("Xatolik! What is your login ?");
  }
  let ThisUser;
  while (!isHaveLogin) {
    if (allUser.length) {
      let isHave;
      for (let i = 0; i < allUser.length; i++) {
        if (login == allUser[i]?.login) {
          ThisUser = allUser[i];
          isHaveLogin = true;
          isHave = true;
        } else {
          isHave = isHave || false;
        }
      }
      if (!isHave) {
        login = prompt("Xatolik! Bu Login Ro'yxatdan o'tmagan...");
      }
    } else {
      isHaveLogin = true;
    }
  }
  console.log(ThisUser.user__balance);
  let isPasswordCorrect = false;
  let password = prompt("What is your password ?");
  while (!(password.length >= 6)) {
    alert("Parolda 6 ta simvol bo'lishi kerak!");
    password = prompt("again! What is your password ?");
  }
  while (password !== ThisUser.password) {
    password = prompt(`${ThisUser.login}! Bu parol Xato!`);
  }
  let balance = ThisUser.user__balance;
  localStorage.setItem("login", login);
  localStorage.setItem("password", password);
  localStorage.setItem("balance", balance);
  spinnerTitle.textContent = `${ThisUser.login} - profilga kirganiz bilan tabriklaymiz!😊😊`;
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
  localStorage.removeItem("balance");
  spinnerTitle.textContent = "Saytdan foydalanganingiz uchun Raxmat👋👋";
  restTime(renderUser);
});
