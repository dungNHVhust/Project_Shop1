// ChangeStatus
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonsChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");

    // console.log(path)


    buttonsChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");

            let statusChange = statusCurrent == "active" ? "inactive" : "active";
            // console.log(statusChange);
            // console.log(statusCurrent);
            // console.log(id);
            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action=action;
            formChangeStatus.submit();
        })
    })
}
// End changeStatus

//Checkbox-Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");
    
    inputCheckAll.addEventListener("click", () => {
        if(inputCheckAll.checked) {
            // console.log("Check tat ca");
            inputsId.forEach(input => {
                input.checked = true;
            })
        } else {
            // console.log("Bo check tat ca");
            inputsId.forEach(input => {
                input.checked = false;
            })
        } 
    })

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const coutChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            // console.log(coutChecked);
            // console.log(inputsId.length);
            if(coutChecked == inputsId.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        })
    })
}
//End checkbox-Multi

// Form Change Multi
const formCHangeMulti = document.querySelector("[form-change-multi]");
// console.log(formCHangeMulti);
if(formCHangeMulti){
    formCHangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        // console.log(e);
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
        // console.log(inputsChecked);
        if(inputsChecked.length > 0){
            let ids = [];
            const inputIds = formCHangeMulti.querySelector("input[name='ids']");

            inputsChecked.forEach(input => {
                const id = input.value;
                ids.push(id);
            })
            // console.log(ids.join(", "));
            inputIds.value=ids.join(", ");
            formCHangeMulti.submit();
        }else {
            alert("Vui lòng chọn ít nhất 1 bản ghi !!!");
        }
    });
}
// End Form Change Multi 