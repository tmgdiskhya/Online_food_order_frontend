window.onload = function (){
    const login = document.getElementById("signIn")
    const username = document.getElementById("username")
    const pass = document.getElementById("pass")
    const url = "http://localhost:3000/user/login"

    login.addEventListener('click', signIn);

    async function signIn(event){
        const user = username.value;
        const password = pass.value;

        const data = await fetch (url,{
            method:'POST',
            headers:{
                'Content-type':'Application/JSON'
            },
            body:JSON.stringify({
                username:user,
                password:password
            })
        })
        const jsonData = await data.json();
        console.log(jsonData)
        const token = jsonData.token;
        localStorage.setItem('Token',token);
        localStorage.setItem('userId',jsonData._id);
        if(jsonData.message == "Login Successful"){
            alert(jsonData.message)
            document.location.href='./index.html';
        }
    }
}