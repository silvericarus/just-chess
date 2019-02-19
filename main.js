function drawBoard() {
	let playground = document.getElementById("playground");

	var table = document.createElement("table");
	for (var i = 1; i < 9; i++) {
	    var tr = document.createElement('tr');
	    for (var j = 1; j < 9; j++) {
	        var td = document.createElement('td');
	        if (i%2 == j%2) {
	            td.classList.add("white_cell","cell");
	        } else {
	            td.classList.add("black_cell","cell");;
	        }
	        tr.appendChild(td);
	    }
	    table.appendChild(tr);
	}
	table.setAttribute("id","board");
	playground.appendChild(table);
}


window.onload = drawBoard();


