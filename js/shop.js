window.onload = async function (){
    try{
    const categoryList = document.getElementById("categoryList")

    const url = "http://localhost:3000/category/category"
    const data = await fetch(url) 
    const jsonData = await data.json();
    console.log(jsonData[0].name)
    var txt = "";
    for (var x = 0; x <jsonData.length; x++){
        console.log(jsonData[x].name)
        txt+="<li><a onclick='viewData(`"+ jsonData[x]._id +"`)'>"+jsonData[x].name +"</a></li>"
    }
    categoryList.innerHTML = txt    
    }
    catch(err){
        alert(err)
    }
    
}