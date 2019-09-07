function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function startGame(id){
    window.location = "./index.html";
    setCookie("gameId",id,1);
}

function findGames(){
    var gamestable = document.getElementById("gamestable");
    gamestable.innerHTML = "";

    db.collection("games").where("state", "==", "waiting")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var data = doc.data();
            var row = document.createElement("tr");
            var cellId = document.createElement("td");
            var cell = document.createElement("td");
            var cellBtn = document.createElement("td");
            var btn = document.createElement("button");
            btn.classList.add("button","primary");
            btn.addEventListener("click",function(){
                startGame(doc.id);
            });
            cellId.textContent = data["name"];
            cell.textContent = data["state"];
            cellBtn.appendChild(btn);
            row.append(cellId,cell,cellBtn);
            gamestable.append(row);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}
findGames();
