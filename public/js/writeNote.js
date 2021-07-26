let googleUser = null;

window.onload = () => { //can also use addEventListener "window"
    firebase.auth().onAuthStateChanged(user => {
        if (user){
            //code runs if user is logged in
            console.log("logged in as ", user.displayName);
            googleUser = user;
        } else {
            //runs if user isn't logged in
             console.log("not logged in");
        }
    })

    const createNoteButton = document.querySelector("#createNoteButton");
    createNoteButton.addEventListener("click", () => {
        const noteTitle = document.querySelector("#noteTitle").value;
        const noteText = document.querySelector("#noteText").value;

        //write values to database
        firebase.database().ref(`/users/${googleUser.uid}`).push({
            title: noteTitle,
            text: noteText,
        }).then(()=>{
            console.log("database write successful");
            document.querySelector("#noteTitle").value = "";
            document.querySelector("#noteText").value = "";
        }).catch(error => {
            console.log("error when writing note: ", error);
        })
    })
}