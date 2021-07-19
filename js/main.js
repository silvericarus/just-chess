var whitePawnsMovements = new Array();
var blackPawnsMovements = new Array();

function genWhitePawns() {
	for (var i = 1; i <= 8; i++) {
		let celda = document.getElementById("7,"+i);
		var pawn = new Pawn("white","drag(event)");
		var img = pawn.genPiece(i);
		celda.appendChild(img);
		
	}
}

function genBlackPawns() {
	for (var i = 1; i <= 8; i++) {
		let celda = document.getElementById("2,"+i);
		var pawn = new Pawn("black","drag(event)");
		var img = pawn.genPiece(i);
		celda.appendChild(img);
	}
}

function genWhiteRooks(){
	let celda1 = document.getElementById("8,1");
	let celda2 = document.getElementById("8,8");

	let rook1 = new Rook("white","drag(event)");
	let rook2 = new Rook("white","drag(event)");

	var img1 = rook1.genPiece("1");
	var img2 = rook2.genPiece("8");

	celda1.appendChild(img1);
	celda2.appendChild(img2);
}

function genBlackRooks(){
	let celda1 = document.getElementById("1,1");
	let celda2 = document.getElementById("1,8");

	let rook1 = new Rook("black","drag(event)");
	let rook2 = new Rook("black","drag(event)");

	var img1 = rook1.genPiece("1");
	var img2 = rook2.genPiece("8");

	celda1.appendChild(img1);
	celda2.appendChild(img2);
}

function genWhiteBishops() {
	let celda1 = document.getElementById("8,3");
	let celda2 = document.getElementById("8,6");

	let bishop1 = new Bishop("white","drag(event)");
	let bishop2 = new Bishop("white","drag(event)");

	var img1 = bishop1.genPiece("3");
	var img2 = bishop2.genPiece("6");

	celda1.appendChild(img1);
	celda2.appendChild(img2);
}


function genBlackBishops() {
	let celda1 = document.getElementById("1,3");
	let celda2 = document.getElementById("1,6");

	let bishop1 = new Bishop("black","drag(event)");
	let bishop2 = new Bishop("black","drag(event)");

	var img1 = bishop1.genPiece("3");
	var img2 = bishop2.genPiece("6");

	celda1.appendChild(img1);
	celda2.appendChild(img2);
}
function genWhiteKnights() {
	let celda1 = document.getElementById("8,2");
	let celda2 = document.getElementById("8,7");

	let knight1 = new Knight("white","drag(event)");
	let knight2 = new Knight("white","drag(event)");

	var img1 = knight1.genPiece("2");
	var img2 = knight2.genPiece("7");

	celda1.appendChild(img1);
	celda2.appendChild(img2);
}
function genBlackKnights() {
	let celda1 = document.getElementById("1,2");
	let celda2 = document.getElementById("1,7");

	let knight1 = new Knight("black","drag(event)");
	let knight2 = new Knight("black","drag(event)");

	var img1 = knight1.genPiece("2");
	var img2 = knight2.genPiece("7");

	celda1.appendChild(img1);
	celda2.appendChild(img2);
}
function genQueens(){
	let celda1 = document.getElementById("8,4");
	let celda2 = document.getElementById("1,5");

	let queen1 = new Queen("white","drag(event)");
	let queen2 = new Queen("black","drag(event)");

	var img1 = queen1.genPiece("8");
	var img2 = queen2.genPiece("1");

	celda1.appendChild(img1);
	celda2.appendChild(img2);
}

function genKings(){
	let celda1 = document.getElementById("8,5");
	let celda2 = document.getElementById("1,4");

	let king1 = new King("white","drag(event)");
	let king2 = new King("black","drag(event)");

	var img1 = king1.genPiece("8");
	var img2 = king2.genPiece("1");

	celda1.appendChild(img1);
	celda2.appendChild(img2);
}

function drag(e) {
	e.dataTransfer.setData("text", e.target.id);
}

function allowDrag(e) {
	e.preventDefault();
}

function colourCellYellow(initialElement, pieceId){
	let coordinates = initialElement.parentNode.getAttribute("id")
	if (initialElement.classList.contains("pawn")) {
		let y = parseInt(coordinates.charAt(0));
		let x = parseInt(coordinates.charAt(2));
		if(document.getElementsByClassName('has-background-warning').length < 1){
			if(initialElement.classList.contains("black")){
				let pos_c1 = y+1;
				let cell1 = document.getElementById(pos_c1+","+x);
				cell1.setAttribute("class","has-background-warning");
				if(blackPawnsMovements[pieceId] < 1){
					//In the first movement colour another position ahead
					let pos_c2 = pos_c1+1;
					let cell2 = document.getElementById(pos_c2+","+x);
					cell2.setAttribute("class","has-background-warning");
				}
			}else if(initialElement.classList.contains("white")){
				let pos_c1 = y-1;
				let cell1 = document.getElementById(pos_c1+","+x);
				cell1.setAttribute("class","has-background-warning");
				if(whitePawnsMovements[pieceId] < 1){
					//In the first movement colour another position ahead
					let pos_c2 = pos_c1-1;
					let cell2 = document.getElementById(pos_c2+","+x);
					cell2.setAttribute("class","has-background-warning");
				}
			}
		}
	}
}

document.ondrag = function onMovement(e) {
	let pieceId = e.target.getAttribute('id');
	let initialElement = document.getElementById(pieceId);

	colourCellYellow(initialElement, pieceId);
}

function dbPostMovement(team,piece,origCoord,newCoord){
	db.collection("games").doc(id).update(
		{
			mov: {
				team:team,
				piece:piece,
				origCoord:origCoord,
				newCoord:newCoord
			}
		}).then(function() {
			console.log("Movement logged.");
		}).catch();
}


function dbCheckDestruction() {
	db.collection("games").doc(id).onSnapshot(function(doc) {
		var data = doc.data();
		var destruction = data["destruction"];
		if (destruction != undefined && destruction.size > 0) {
			var team = destruction.team;
			var piece = destruction.piece;
			var origCoord = destruction.origCoord;
			var newCoord = destruction.newCoord;
			var cell = document.getElementById(origCoord);
		if(team == "white"){
			var graveyard = document.getElementById("whitegrave");
		}else{
			var graveyard = document.getElementById("blackgrave");
		}

		let img = document.createElement("img");

		img.setAttribute("src",piece);
	
		img.classList.add(color);
	
		graveyard.appendChild(img);

		cell.removeChild(piece);

		}else{
			return false;
		}
		
	});
}

function dbCheckMovement() {
		db.collection("games").doc(id).onSnapshot(function(doc) {
			var data = doc.data();
			var movement = data["mov"];
			if(movement!==undefined){
				var movtable = document.getElementById("movtable");
				var oldCell = document.getElementById(movement.origCoord);
				var newCell = document.getElementById(movement.newCoord);
				if(typeof oldCell.children[0]==='object'){
					newCell.appendChild(oldCell.children[0]);
					var tr = document.createElement("tr");
					var tdOrigCoord = document.createElement("td");
					var tdNewCoord = document.createElement("td");
					var tdTeam = document.createElement("td");
					var tdPiece = document.createElement("td");
					tdOrigCoord.innerHTML = movement.origCoord;
					tdNewCoord.innerHTML = movement.newCoord;
					tdTeam.innerHTML = movement.team;
					tdPiece.innerHTML = movement.piece;
					tr.append(tdOrigCoord,tdNewCoord,tdTeam,tdPiece);
					movtable.appendChild(tr);
				}
			}
			
			
		});
}
function drop(event){
	event.preventDefault();
	let yellowCells = document.getElementsByClassName("has-background-warning");
	for(var i = 1 ; i = yellowCells.length ; i++){
		let coordinates = yellowCells[i-1].id;
		let y = parseInt(coordinates.charAt(0));
		let x = parseInt(coordinates.charAt(2));
		if((x%2) == (y%2)){
			document.getElementById(coordinates).setAttribute("class","white_cell cell");
		}else{
			document.getElementById(coordinates).setAttribute("class","black_cell cell");
		}
	}
	let data = event.dataTransfer.getData("text");
	let elementdata = document.getElementById(data);
	if (elementdata.classList.contains("pawn")) {
		if(elementdata.classList.contains("black")){
			var pawn = new Pawn("black","drag(event)");
		}else{
			var pawn = new Pawn("white","drag(event)");
		}
		
		if (pawn.checkMove(elementdata.parentNode.getAttribute("id"),event.target.id)) {
			dbPostMovement(pawn.color,"pawn",elementdata.parentNode.getAttribute("id"),event.target.id);
			event.target.appendChild(elementdata);
			let pieceClass = elementdata.classList;
			if(pieceClass.contains("white")){
				whitePawnsMovements[elementdata.getAttribute("id")]++;
			}else if(pieceClass.contains("black")){
				blackPawnsMovements[elementdata.getAttribute("id")]++;
			}
		}
	}else if(elementdata.classList.contains("rook")){
		if(elementdata.classList.contains("black")){
			var rook = new Rook("black","drag(event)");
		}else{
			var rook = new Rook("white","drag(event)");
		}
		
		if (rook.checkMove(elementdata.parentNode.getAttribute("id"),event.target.id)) {
			dbPostMovement(rook.color,"rook",elementdata.parentNode.getAttribute("id"),event.target.id);
			event.target.appendChild(elementdata);
		}
	}else if(elementdata.classList.contains("bishop")){
		if(elementdata.classList.contains("black")){
			var bishop = new Bishop("black","drag(event)");
		}else{
			var bishop = new Bishop("white","drag(event)");
		}
		
		if (bishop.checkMove(elementdata.parentNode.getAttribute("id"),event.target.id)) {
			dbPostMovement(bishop.color,"bishop",elementdata.parentNode.getAttribute("id"),event.target.id);
			event.target.appendChild(elementdata);
		}
	}else if(elementdata.classList.contains("knight")){
		if(elementdata.classList.contains("black")){
			var knight = new Knight("black","drag(event)");
		}else{
			var knight = new Knight("white","drag(event)");
		}

		if (knight.checkMove(elementdata.parentNode.getAttribute("id"),event.target.id)) {
			dbPostMovement(knight.color,"knight",elementdata.parentNode.getAttribute("id"),event.target.id);
			event.target.appendChild(elementdata);
		}
	}else if(elementdata.classList.contains("queen")){
		if(elementdata.classList.contains("black")){
			var queen = new Queen("black","drag(event)");
		}else{
			var queen = new Queen("white","drag(event)");
		}

		if (queen.checkMove(elementdata.parentNode.getAttribute("id"),event.target.id)) {
			dbPostMovement(queen.color,"queen",elementdata.parentNode.getAttribute("id"),event.target.id);
			event.target.appendChild(elementdata);
		}
	}else if(elementdata.classList.contains("king")){
		if(elementdata.classList.contains("black")){
			var king = new King("black","drag(event)");
		}else{
			var king = new King("white","drag(event)");
		}

		if (king.checkMove(elementdata.parentNode.getAttribute("id"),event.target.id)) {
			dbPostMovement(king.color,"king",elementdata.parentNode.getAttribute("id"),event.target.id);
			event.target.appendChild(elementdata);
		}
	}
}

function drawBoard() {
	let playground = document.getElementById("playground");

	var table = document.createElement("table");
	for (var i = 1; i < 9; i++) {
	    var tr = document.createElement('tr');
	    for (var j = 1; j < 9; j++) {
	        var td = document.createElement('td');
	        if (i%2 == j%2) {
	            td.classList.add("white_cell","cell");
	  			td.setAttribute("id",i+","+j);
	  			td.setAttribute("ondrop","drop(event)");
	  			td.setAttribute("ondragover","allowDrag(event)");
	        } else {
	            td.classList.add("black_cell","cell");
	            td.setAttribute("id",i+","+j);
	            td.setAttribute("ondrop","drop(event)");
	            td.setAttribute("ondragover","allowDrag(event)");
	        }
	        tr.appendChild(td);
	    }
	    table.appendChild(tr);
	}
	table.setAttribute("id","board");
	playground.appendChild(table);
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


function checkUsers(){
	setTimeout(function() {
		db.collection("games").doc(id).get().then(function(doc){
				if(doc.exists){
					data = doc.data();
					console.log(data);
					if(data["userblack"]!= undefined && data["userwhite"]!= undefined){
						document.getElementById("pageloader").classList.remove("is-active");
						document.getElementById("modaluser").classList.remove("is-active");
						db.collection("games").doc(id).update({"state":"playing"}).then(function() {
							console.log("Document successfully updated!");
						})
						.catch(function(error) {
							// The document probably doesn't exist.
							console.error("Error updating document: ", error);
						});
					}else{
						checkUsers();
					}
						}else{
							console.error("Error");
						}
			}).catch(function(error){

			});
			
		
	}, 1000);
	
}

function saveUserInfo(){
	var username = document.getElementById("username").value;
	var userteam;

	if(document.getElementById('white_team').checked) {
		userteam = "white";
	}else{
		userteam = "black";
	}

	switch(userteam){
		case "white":
			db.collection("games").doc(id).update({userwhite:{name:username,team:userteam}}).then(function() {
		console.log("Document successfully updated!");
	})
	.catch(function(error) {
		// The document probably doesn't exist.
		console.error("Error updating document: ", error);
	});
	break;
	case "black":
		db.collection("games").doc(id).update({userblack:{name:username,team:userteam}}).then(function() {
			console.log("Document successfully updated!");
		})
		.catch(function(error) {
			// The document probably doesn't exist.
			console.error("Error updating document: ", error);
		});
		break;
	}
	document.getElementById("pageloader").classList.add("is-active");
	db.collection("games").doc(id).get().then(function(doc){
		if(doc.exists){
			checkUsers();
		}else{
			console.error("Error");
		}
	}).catch(function(error){

	});
}


window.onload = function(){
	drawBoard();
	genWhitePawns();
	genBlackPawns();
	genWhiteRooks();
	genBlackRooks();
	genWhiteBishops();
	genBlackBishops();
	genWhiteKnights();
	genBlackKnights();
	genQueens();
	genKings();
	dbCheckMovement();
	dbCheckDestruction();
	var whitePawns = document.getElementsByClassName('piece pawn white');
	
	for(var i = 0;i < whitePawns.length; i++){
		whitePawnsMovements[whitePawns[i].getAttribute('id')] = 0;
	}
	var blackPawns = document.getElementsByClassName('piece pawn black');
	for(var i = 0;i < blackPawns.length; i++){
		blackPawnsMovements[blackPawns[i].getAttribute('id')] = 0;
	}
}
	


