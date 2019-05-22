let config = {
    apiKey: "AIzaSyAnZ0IricAJ4V6jOsuencf86dri8RPVqgQ",
    authDomain: "databasepatdem.firebaseapp.com",
    databaseURL: "https://databasepatdem.firebaseio.com",
    projectId: "databasepatdem",
    storageBucket: "databasepatdem.appspot.com",
    messagingSenderId: "227792349888"
};
firebase.initializeApp(config);





$(document).ready(function () {
    let db = firebase.firestore();   
    let listid = undefined;
    let lists = document.querySelector("#lists");
    let listidArray = [];
    let listname;

    db.collection("Lists").get().then(function (querySnapshot) {  //tworzenie divow z bazy danych
        querySnapshot.forEach(function (doc) {
            let newDiv = document.createElement("div");
            listname = doc.data().listname;
            listIdString = doc.id.replace(/\D/g, ''); //usuwanie "list" z doc.id
            listid = parseInt(listIdString);
            listidArray.push(listid);            
            newDiv.id = doc.id;            
            lists.appendChild(newDiv);  
            $('#list' + listid).addClass('list').html(listname); 
        });
    });
    console.log(listidArray);

    
  
 
    $('#addListButton').on('click', function () {
        const buttonID = 'createButton' + Math.random().toString(36).substr(2) 
        $('#listNameAdding').html('List name: <br> <input id=newlistname /> <button id=' + buttonID + '>Create</button>');      
        $('#listNameAdding').toggle(true)

        $('#' + buttonID).on('click', function () {         
            listname = document.querySelector("#newlistname").value;              
            listid = 0;     
            let y = false;
            while (y == false)
            {                                                
                if (listidArray.includes(listid) == false)
                {
                    let newDiv = document.createElement("div");
                    listidArray.push(listid);
                    newDiv.id = "list" + listid;
                    lists.appendChild(newDiv);     
                    y = true;
                    createListDB(listid, listname);   //dodawanie listy do firebase
                }              
                else 
                    listid++;  
            }                 
            $('#listNameAdding').toggle(false);       
            //$('#list' + listid).on('click', function () { showTasks(listname); });  //pokazywanie zadan z listy
            $('#list' + listid).on('click', function () { alert(listid); });  //pokazywanie zadan z listy       TUTAJ PROBLEM, JS NIE WIDZI LIST PO ZA TYM PRZYCISKIEM !!!!!!!!!!!!
            $('#list' + listid).addClass('list').html(listname);              
      });

    });
    






    function showTasks(listname) {      // dodac pokazywanie zadan z listy           
            $('#listContent').html('<h1>' + listname + '</h1>');

    }

    function createListDB(listid, listname) {  //dodawanie listy do firebase
        db.collection("Lists").doc("list" + listid).set({
            listname: listname
        })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });         
    }
   

    


    
    
    




















































})