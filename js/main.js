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
			event.target.appendChild(elementdata);
		}
	}else if(elementdata.classList.contains("bishop")){
		if(elementdata.classList.contains("black")){
			var bishop = new Bishop("black","drag(event)");
		}else{
			var bishop = new Bishop("white","drag(event)");
		}
		
		if (bishop.checkMove(elementdata.parentNode.getAttribute("id"),event.target.id)) {
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



window.onload = function(){
	drawBoard();
	genWhitePawns();
	genBlackPawns();
	genWhiteRooks();
	genBlackRooks();
	genWhiteBishops();
	genBlackBishops();
	var whitePawns = document.getElementsByClassName('piece pawn white');
	
	for(var i = 0;i < whitePawns.length; i++){
		whitePawnsMovements[whitePawns[i].getAttribute('id')] = 0;
	}
	var blackPawns = document.getElementsByClassName('piece pawn black');
	for(var i = 0;i < blackPawns.length; i++){
		blackPawnsMovements[blackPawns[i].getAttribute('id')] = 0;
	}
}
	


