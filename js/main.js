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
	e.dataTransfer.setData("text", event.target.id);
}

function allowDrag(e) {
	e.preventDefault();
}

function drop(event){
	event.preventDefault();
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
}
	


