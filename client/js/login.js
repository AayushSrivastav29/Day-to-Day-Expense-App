const form = document.querySelector("form");

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
      window.location.href = "/app/dashboard.html";
    //window.location.href = "http://localhost:3000/app/dashboard.html";
    })
    .catch((err) => {
      console.log(err);
    });
}
