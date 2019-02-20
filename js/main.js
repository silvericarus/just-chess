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
		var pawn = new Pawn("white","drag(event)");
		if (pawn.checkMove(elementdata.parentNode.getAttribute("id"),event.target.id)) {
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
}
	


