const form = document.querySelector("form");
const message = document.querySelector("#message");

form.addEventListener("submit", checkDetails);

async function checkDetails(event) {
  try {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    console.log(email, password);

    let newUser = {
      name: name,
      email: email,
      password: password,
    };

    const result = await axios.post(
      `http://localhost:3000/api/user/create`,
      newUser
    );
    console.log(result);
    alert(result.data);
    window.location.href = ".../view/dashboard.html";

    //window.location.href = "/app/dashboard.html"; // Redirect on success
  } catch (err) {
    console.log(err.response.data);
      const failedText = document.createElement("p");
      failedText.textContent = `${err.response.data}`;
      message.appendChild(failedText);
  }
}
