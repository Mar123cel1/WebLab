let config = {
    apiKey: "AIzaSyAnZ0IricAJ4V6jOsuencf86dri8RPVqgQ",
    authDomain: "databasepatdem.firebaseapp.com",
    databaseURL: "https://databasepatdem.firebaseio.com",
    projectId: "databasepatdem",
    storageBucket: "databasepatdem.appspot.com",
    messagingSenderId: "227792349888"
};
firebase.initializeApp(config);
let db = firebase.firestore();

$(document).ready(function () {
    let myusername, mypassword;
    let login = db.collection("Login").doc("user1");
    

    login.get().then(function (doc) {
        if (doc.exists) {
            console.log("Document exist")
            let usernamepassword = doc.data();
            myusername = usernamepassword.username;
            mypassword = usernamepassword.password;
        } else {
            console.log("No document");
        }
    }).catch(function (error) {
        console.log("Error", error);
    });

    $('#logbutton').on('click', function () {   
        let username = document.querySelector("#username").value;
        let password = document.querySelector("#password").value;

        if (username == myusername && password == mypassword) {
            location.href = "./index.html";
        }
        else {
            document.getElementById("wrong").innerHTML = "Wrong login or password.";

        }
    });
});
