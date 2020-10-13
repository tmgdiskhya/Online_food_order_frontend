window.onload = async function () {
    try {
        const url = "http://localhost:3000/user/signup"
        const fullname = document.getElementById('fullname');
        const address = document.getElementById('address');
        const phoneno = document.getElementById('phoneno');
        const email = document.getElementById('email');
        const username = document.getElementById('username');
        const password = document.getElementById('pass');
        const conPass = document.getElementById('con-pass');
        const register = document.getElementById('register');

        register.addEventListener('click', registerUser)

        async function registerUser(event) {
            const fname = fullname.value;
            const add = address.value;
            const num = phoneno.value;
            const eAdd = email.value;
            const uName = username.value;
            const cPass = conPass.value;
            const pass = password.value;

            if (cPass === pass) {
                const data = await fetch(url, {
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        fullname: fname,
                        address: add,
                        phone: num,
                        username: uName,
                        email: eAdd,
                        password: pass,
                    })
                })
                const jsonData = await data.json();
                if(jsonData.message == "Register Successful"){
                    alert(jsonData.message)
                    console.log(jsonData.data)
                }
            }
            else {
                alert("Password Doesn't Match")
            }
        }

    }
    catch (err) {
        alert(err)
    }
}