class Storage {

    static getSearchedUsersFromStorage(){
        //tüm kullanıcıları al

        let users;
        if(localStorage.getItem("searched") === null){
            users = [];
        } 
        else {
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }
    static addSearchedUsersToStorage(username){
        //Kullanıcı Ekle
        let users = this.getSearchedUsersFromStorage();
        //IndexOf
        if(users.indexOf(username)=== -1 ){ // usernamei users arrayinde var mı diye kontrol eder yoksa bura çalışır
            users.push(username);
        }
        localStorage.setItem("searched",JSON.stringify(users));




    }
    static clearAllSearchedUsersFromStorage(){
        //Tüm kullanıcıları sil
        localStorage.removeItem("searched");
    }
}