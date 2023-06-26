const signUpBtnEl = document.getElementById("signUpBtn");
const logInBtnEl = document.getElementById("login");

async function handleLogIn(username, password){
    const nameVal = document.getElementById("username").value
    const passVal = document.getElementById("password").value

    const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: nameVal, password: passVal })
    });
    
      if (response.ok) {
        window.location = "/dashboard";
      } else {
        console.error("Failed to log in:", response.status);
      }
}


logInBtnEl.addEventListener("click", handleLogIn);