window.onload = async function () {
    try {
        const btnEditCategory = document.getElementById("editCategory")
        btnEditCategory.addEventListener("click", editCategoryData)
        const url = "http://localhost:3000/";
        const categoryDescription = document.getElementById("tblCategoryInfo");
        const discription = await fetch(url + 'category/category')
        const descriptionRes = await discription.json();
        console.log(descriptionRes);
        let txt = '';
        for (let x = 0; x < descriptionRes.length; x++) {
            txt += '<tr>';
            txt += '<td>' + Number(x + 1) + '</td>';
            txt += '<td>' + descriptionRes[x].name + '</td>';
            txt += "<td><img id='photo' src = 'http://localhost:3000/" + descriptionRes[x].imageName + "' type='file' accept='image/*' width='100px' height='100px'/></td>";
            txt += '<td><div style = "width:2px; word-wrap: break-word"><a class="btn btn-success " ';
            txt += 'data-value="' + descriptionRes[x]._id + '" ';
            txt += 'data-toggle="modal" data-target="#addClassModal" onclick ="editCategory(`' + descriptionRes[x]._id + '`)">';
            txt += 'Edit';
            txt += '</a></div></td>';
            txt += '<td><div style = "width:2px; word-wrap: break-word"><a class="btn btn-success " ';
            txt += 'data-value="' + descriptionRes[x]._id + '" ';
            txt += 'data-toggle="modal" onclick ="deleteCategory(`' + descriptionRes[x]._id + '`)">';
            txt += 'Delete';
            txt += '</a></div></td>';
            txt += '</tr>';
            categoryDescription.innerHTML = txt;
        }

        async function editCategoryData(event) {
            try {
                const categoryName = document.getElementById("categoryName")
                const closebtn = document.getElementById("close")
                const imgFile = document.getElementById("photo")
                const photo = document.getElementById("file-input").files[0];
                document.getElementById("file-input").innerText = "";
                var file ='';
                const formdata = new FormData();
                const photoform = formdata.append('imageFile', photo);
                if(photo!=null){
                    const send = await fetch("http://localhost:3000/upload", {
                        method: 'POST',
                        body: formdata
                    })
                    const photoJSON = await send.json();
                        file = photoJSON.filename
                        // console.log(file)
                    }else{
                        function remove_character(str_to_remove, str) {
                        let reg = new RegExp(str_to_remove)
                        return str.replace(reg, '')
                      }
                        file = remove_character('http://localhost:3000/',imgFile.src)
                    }
                const data = await fetch("http://localhost:3000/category/" + closebtn.value, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: categoryName.value,
                        imageName: file,
                    })
                });
                const jsonData = await data.json();
                console.log(jsonData)
                if(jsonData.nModified==1){
                    alert("Category Edited")
                }
            }

            catch (err) {
                alert(err)
            }
        }

    }

    catch (err) {
        alert(err)
    }
}