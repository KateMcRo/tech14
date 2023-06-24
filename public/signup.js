const signUpBtnEl = document.getElementById("signUpBtn");
const logInBtnEl = document.getElementById("login");

async function handleSignUp(){
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const validate = document.getElementById("validate").value
    const errorMsg = "Passwords Do Not Match"

    if (password !== validate) {
        console.error(errorMsg)
    } else {
        const response = await fetch("/api/users/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        })
        if (response.ok){
            window.location = "/dashboard"
        }
    }
}


signUpBtnEl.addEventListener("click", handleSignUp);
