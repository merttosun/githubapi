// Elementleri seçme

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");

const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();
eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);

}

function getData(e){
    let username = nameInput.value.trim();

    if(username === ""){
        alert("Lütfen Geçerli Bir Kullanıcı Adı Girin");
    } 
    else {
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                ui.showError("Kullanıcı Bulunamadı");
            }else { 
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUsersToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
            
        })
        .catch(err => ui.showUserInfo(err));
    }
    ui.clearInput(); // ınput temizleme
    e.preventDefault();
}

function clearAllSearched(){
    //Tüm arananları temizle
    if(confirm("Emin misiniz ?")){
        //Silme
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();

    }

}

function getAllSearched(){
    //Arananları Storagedan al ui a ekle
    let users = Storage.getSearchedUsersFromStorage();
    let result ="";
    //<li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`;
    });

    lastUsers.innerHTML = result;
}