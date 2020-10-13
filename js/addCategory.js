window.onload = function (){
    try{
    const addCategory = document.getElementById("addCategory")
    const categoryName = document.getElementById("categoryName")
    const pass = document.getElementById("pass")
    const url = "http://localhost:3000/category/category"
    const upload = "http://localhost:3000/upload"

    addCategory.addEventListener('click', newDescription);

    async function newDescription(event){
        const cName = categoryName.value;
        const photo = document.getElementById("file-input").files[0];
            // document.getElementById("file-input").innerText = "";
            const formdata = new FormData();
            formdata.append('imageFile', photo);
            const send = await fetch(upload, {
                method: 'POST',
                body: formdata
            })
            const photoJSON = await send.json();
            try {
                const data = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: cName,
                        imageName: photoJSON.filename
                    })
                })
                const dataJSON = await data.json();
                console.log(dataJSON)
                if (dataJSON.status == true) {
                    alert(dataJSON.message);
                }
                else{
                    alert('Something is wrong')
                }
            }
            catch (err) {
                alert(err);
            }
        }
    }
    catch(err){
        alert(err)
    }
    
}