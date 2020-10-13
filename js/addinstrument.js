window.onload = async function (){
    try{
    const categoryList = document.getElementById("select_category")
    const addCategory = document.getElementById("addInstrument");
    const instrumentName = document.getElementById("instrumentName");
    const instrumentPrice = document.getElementById("instrumentPrice");
    const description = document.getElementById("description");
    addCategory.addEventListener("click", addInstrument);

    const url = "http://localhost:3000/category/category"
    const data = await fetch(url) 
    const jsonData = await data.json();
    console.log(jsonData[0].name)
    for (let i = 0; i < jsonData.length; i++) {
        const option = document.createElement('OPTION'),
            txt = document.createTextNode(jsonData[i].name);
        option.appendChild(txt);
        option.setAttribute("value", jsonData[i]._id);
        categoryList.insertBefore(option, categoryList.lastChild);
    }
    
    async function addInstrument(event){
        const catValue = categoryList.selectedIndex;
        const categoryVal = categoryList.options[catValue].value;
        const photo = document.getElementById("file-input").files[0];
        document.getElementById("file-input").innerText = "";
        const formdata = new FormData();
        formdata.append('imageFile', photo);
        const send = await fetch("http://localhost:3000/upload", {
            method: 'POST',
            body: formdata
        })
        const photoJSON = await send.json();
        try {
            const data = await fetch("http://localhost:3000/instruments/instruments/"+categoryVal, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    categoryid:categoryVal,
                    name:instrumentName.value,
                    price: instrumentPrice.value,
                    description:description.value,
                    photo: photoJSON.filename
                })
            })
            const dataJSON = await data.json();
            console.log(dataJSON)
            if (dataJSON.status == true) {
                alert("Successfully Added");
            }
            else{
                alert("Cannot Add Right Now")
            }
        }
        catch(err){
            alert(err)
        }
    }
    }
    catch(err){
        alert(err)
    }
    
}