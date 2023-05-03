document.querySelector("#displayModal").addEventListener('click', () => {
    document.querySelector('#containerForm').style.display = 'flex';
    displayForm();
    displayModal();
});

function getUsers() {
    let users = fetch(`http://146.59.242.125:3001/users`)
        .then(data => {
            data.json()
                .then(res => {
                    displayUsers(res);
                })
        })
};

function displayUsers(users) {
    let parent = document.querySelector('.card-container');
    parent.innerHTML = ""
    users.forEach(elem => {
        let container = document.createElement('div')
        container.classList.add('user-card', 'col');
        parent.appendChild(container);
        let sectionCard = document.createElement('section');
        sectionCard.classList.add('user_card');
        container.appendChild(sectionCard);
        let imgUser = document.createElement('h3');
        imgUser.classList.add('text-center', 'text-primary');
        imgUser.innerHTML = elem.name;
        sectionCard.appendChild(imgUser);
        let spanName = document.createElement('span');
        spanName.classList.add('span_card', 'name');
        spanName.innerText = elem.firstname;
        sectionCard.appendChild(spanName);
        let spanMail = document.createElement('span');
        spanMail.classList.add('span_card', 'mail');
        spanMail.innerText = elem.mail;
        sectionCard.appendChild(spanMail);
        let divBtn = document.createElement('div');
        divBtn.classList.add('button-wrapper');
        sectionCard.appendChild(divBtn);
        let btnUpdate = document.createElement('button');
        btnUpdate.classList.add("btn", "outline");
        btnUpdate.innerText = "UPDATE";
        divBtn.appendChild(btnUpdate);
        let btnDelete = document.createElement('button');
        btnDelete.classList.add("btn", "fill");
        btnDelete.innerText = "DELETE";
        divBtn.appendChild(btnDelete);

        btnUpdate.addEventListener('click', () => {
            document.querySelector("#containerForm").style.display = 'none';
           displayForm();
            displayModalUpdate(elem._id);
        });
        btnDelete.addEventListener('click', () => {
            deleteUser(elem._id);
            getUsers();
        });
    });
}

async function postUser() {
    // creation de l'objet, on peut recuperer la valeur des elements input pour le creer
    let obj = {
        name: document.querySelector('#name').value,
        firstname: document.querySelector('#firstName').value,
        mail: document.querySelector('#mail').value,
        password: document.querySelector('#password').value
    }
    let user = await fetch('http://146.59.242.125:3001/user', {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj) //creation d'un json a partir d'un objet javascript
    })
}

async function deleteUser(id) {
    let user = await fetch(`http://146.59.242.125:3001/user/${id}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        }
    })
}

async function updateUser(id){
    let existObj = {
        name: document.querySelector("#updateName").value,
        firstname: document.querySelector("#updateFirstName").value,
        mail: document.querySelector("#updateMail").value,
        password: document.querySelector("#updatePassword").value
    }
    let user = await fetch(`http://146.59.242.125:3001/user/${id}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(existObj) //creation d'un json a partir d'un objet javascript
    })
}

function displayModal() {
    //Create User
    document.querySelector("#containerForm").innerHTML += `
        <div>
            <form>
                <div id="close_Form" class="close-container">
                    <div class="leftright"></div>
                    <div class="rightleft"></div>
                    <label  class="close">close</label>
                </div>
            <p>Create User :</p>
            <input id="name" class="name" type="text" placeholder="name" ><br>
                <input id="firstName" class="firstName" type="text" placeholder="first Name" ><br>
                <input id="mail" class="mail" type="mail" placeholder="mail""><br>
                <input id="password" class="password" type="password" placeholder="password"><br>
                <input id="submit" class="submit" type="button" value="Submit"><br>
            </form>

            <div class="drops">
                <div class="drop drop-1"></div>
                <div class="drop drop-2"></div>
                <div class="drop drop-3"></div>
                <div class="drop drop-4"></div>
                <div class="drop drop-5"></div>
            </div>
        </div>`
    //CLOSE FORM ANYTIME WITH 'X'
    document.querySelector('#close_Form').addEventListener('click', () => {
        this.closeform();
    })
    //SUBMIT OPTION FOR CREATE CARD
    document.querySelector("#submit").addEventListener('click', () => {
        postUser();
        getUsers();
        this.closeform();
    })
}
async function displayModalUpdate(item) {
    console.log(item);
    let updateUser = await fetch(`http://146.59.242.125:3001/user/${item}`)
    let userSetting = await updateUser.json();
    //Update User
    document.querySelector("#containerFormUpdate").innerHTML +=
        ` <div>
        <form>
            <div id="close_FormUpdate" class="close-container">
                <div class="leftright"></div>
                <div class="rightleft"></div>
                <label  class="close">close</label>
            </div>
        <p>update User :</p>
        <input id="updateName" class="name" type="text" placeholder="name" value="${userSetting.name}"><br>
            <input id="updateFirstName" class="firstName" type="text" placeholder="first Name" value="${userSetting.firstname}"><br>
            <input id="updateMail" class="mail" type="mail" placeholder="mail" value="${userSetting.mail}"><br>
            <input id="updatePassword" class="password" type="password" placeholder="password"value="${userSetting.password}"><br>
            <input id="updateSubmit" class="submit" type="button" value="Submit"><br>
        </form>

        <div class="drops">
            <div class="drop drop-1"></div>
            <div class="drop drop-2"></div>
            <div class="drop drop-3"></div>
            <div class="drop drop-4"></div>
            <div class="drop drop-5"></div>
        </div>
    </div>`;
    //CLOSE FORM ANYTIME WITH 'X'
    document.querySelector('#close_FormUpdate').addEventListener('click', () => {
        this.closeform();
    });
    //SUBMIT BUTTON OF UPDATED FORM 
    document.querySelector("#updateSubmit").addEventListener('click', () => {
        this.updateUser(item);
        this.closeform();
        getUsers();
    });
}

function displayForm() {
    document.querySelector('#containerForm').innerHTML = ""
    document.querySelector('#containerFormUpdate').innerHTML = ""
    document.querySelector("#mainContainer").style.display = "block"
    document.querySelector("#mainContainer").style.position = "absolute"
    document.querySelector("#users").style.position = "none"
    document.querySelector("#users").style.display = "none"
    document.querySelector("header").style.display = "none"
}
//METHOD FOR HIDE THE FORM
function closeform() {
    document.querySelector('#containerForm').innerHTML = ""
    document.querySelector('#containerFormUpdate').innerHTML = ""
    document.querySelector("#mainContainer").style.display = "none"
    document.querySelector("#mainContainer").style.position = "relative"
    document.querySelector("#users").style.position = "block"
    document.querySelector("#users").style.display = "block"
    document.querySelector("header").style.display = "block"
}
getUsers();