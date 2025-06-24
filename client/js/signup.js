const form = document.querySelector('form');

form.addEventListener('submit', checkDetails);

async function checkDetails(event) {
    try {
        event.preventDefault();
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        console.log(email,password);
    
        let newUser= {
            name:name,
            email:email,
            password:password
        }
    
        await axios.post(`http://localhost:3000/api/user/create`, newUser).then((result) => {
            console.log(result);
            alert("signup successful")
            window.location.href = 'http://localhost:3000/app/dashboard.html';
        }).catch((err)=>{
            alert(err);
        })
        
    } catch (error) {
        console.log(error);
    }
    

}