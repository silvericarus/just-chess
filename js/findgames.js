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

    setCookie("gameId",id,1);
    db.collection("games").doc(id).get().then(function(doc) {
        if (doc.exists) {
            var data = doc.data();
        } else {
            console.error("No such document!");
        }
    
        if(!data.playersConnected){
            db.collection("games").doc(id).update({"playersConnected":1}).then(function(){
                console.log("Document successfully updated!");
                window.location = "./chess.html";
            }).catch(function(error) {
                console.error("Error updating document: ", error);
            });  
        }else if(data["playersConnected"] == 1){
            db.collection("games").doc(id).update({"playersConnected":2}).then(function(){
            	db.collection("games").doc(id).update({state:"ready"}).then(function(){
            		console.log("Document successfully updated!");
                    window.location = "./chess.html";
            	}).catch(function(error) {
                console.error("Error updating document: ", error);
            }); 
            }).catch(function(error) {
                console.error("Error updating document: ", error);
            }); 
        }
    }).catch(function(error){
        console.error("Error");
    });   
    
}

function findGames(){
    var gamestable = document.getElementById("gamestable");
    gamestable.innerHTML = "";

    db.collection("games").where("state", "==", "waiting")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
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
