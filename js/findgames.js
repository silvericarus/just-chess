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
            cellId.textContent = doc.id;
            cell.textContent = data["state"];
            row.append(cellId,cell);
            gamestable.append(row);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}
findGames();
