const form = document.querySelector("form");
const message = document.querySelector("#message");

form.addEventListener("submit", loginDetails);

async function loginDetails(event) {
  event.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  console.log(email, password);

  let userDetails = {
    email,
    password,
  };

  await axios
    .post(`http://localhost:3000/api/user/find`, userDetails)
    .then((result) => {
      console.log(result);
      alert(result.data);
      window.location.href = "/";
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response.data);
      const failedText = document.createElement("p");
      failedText.textContent = `${err.response.data}`;
      message.appendChild(failedText);
    });
}
