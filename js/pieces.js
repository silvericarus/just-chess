function destroyPiece(position_destiny,color,origCoord,sendToDB){
	let cell = document.getElementById(position_destiny);

	if(color=="white"){
		var graveyard = document.getElementById("whitegrave");
	}else{
		var graveyard = document.getElementById("blackgrave");
	}

	let piece = cell.getElementsByClassName(color)[0];

	let img = document.createElement("img");

	img.setAttribute("src",piece.src);

	img.classList.add(color);

	graveyard.appendChild(img);

	cell.removeChild(piece);
	dbPostDestruction(piece.src,color,origCoord,position_destiny)
	return img;

}

function dbPostDestruction(img,team,origCoord,newCoord) {
	db.collection("games").doc(id).update(
		{
			destruction: {
				team:team,
				piece:img,
				origCoord:origCoord,
				newCoord:newCoord
			}
		}).then(function () {
			console.log("Destruction logged.");
		}).catch();
}

//Pieces definition
function Pawn(color,funcion_drag){
	this.color = color;
	if(color=="white"){
		this.image="img/pawn_w.png";	
	}else{
		this.image="img/pawn_b.png";
	}
	
	this.checkMove = function (position,position_destiny) {
		let pos_orig = position.split(",");
		let pos_new = position_destiny.split(",");
		if (color=="white") {
			if((Math.abs(pos_new[0]-pos_orig[0])==1 && pos_new[1] - pos_orig[1] == 0) || Math.abs(pos_new[0]-pos_orig[0])==1 && Math.abs(pos_new[1]-pos_orig[1])==1){
				//Execute the destroyPiece() function
				if( (document.getElementById(position_destiny).getElementsByTagName("img").length > 0 && document.getElementById(position_destiny).getElementsByTagName("img")[0].classList.contains("black"))){
					destroyPiece(position_destiny,"black",position,true);
				}
				return true;
			}else{
				return false;
			}
		}else{
			if((Math.abs(pos_new[0]-pos_orig[0])==1 && pos_new[1] - pos_orig[1] == 0) || Math.abs(pos_new[0]-pos_orig[0])==1 && Math.abs(pos_new[1]-pos_orig[1])==1){
				//Execute the destroyPiece() function
				if( (document.getElementById(position_destiny).getElementsByTagName("img").length > 0 && document.getElementById(position_destiny).getElementsByTagName("img")[0].classList.contains("white"))){
					destroyPiece(position_destiny,"white",position,true);
				}
				return true;
			}else{
				return false;
			}
		}
		
	}

	this.genPiece = function(i){
		var img = document.createElement("img");
		img.setAttribute("src",this.image);
		img.setAttribute("draggable","true");
		img.setAttribute("ondragstart",funcion_drag);
		if(color=="white"){
			img.classList.add("piece","pawn","white");
			img.setAttribute("id","pawnw"+i);
		}else{
			img.classList.add("piece","pawn","black");
			img.setAttribute("id","pawnb"+i);
		}
		return img;
	}
}

function Rook(color,funcion_drag) {
	this.color = color;
	if(color=="white"){
		this.image="img/rook_w.png";	
	}else{
		this.image="img/rook_b.png";
	}
	
	this.checkMove = function (position,position_destiny) {
		let pos_orig = position.split(",");
		let pos_new = position_destiny.split(",");
		if (color=="white") {
			if(pos_new[0]==pos_orig[0] || pos_new[1]==pos_orig[1]){
				//Execute the destroyPiece() function
				if( (document.getElementById(position_destiny).getElementsByTagName("img").length > 0 && document.getElementById(position_destiny).getElementsByTagName("img")[0].classList.contains("black"))){
					destroyPiece(position_destiny,"black",position,true);
				}
				return true;
			}else{
				return false;
			}
		}else{
			if(pos_new[0]==pos_orig[0] || pos_new[1]==pos_orig[1] ){
				//Execute the destroyPiece() function
				if( (document.getElementById(position_destiny).getElementsByTagName("img").length > 0 && document.getElementById(position_destiny).getElementsByTagName("img")[0].classList.contains("white"))){
					destroyPiece(position_destiny,"white",position,true);
				}
				return true;
			}else{
				return false;
			}
		}
		
	}

	this.genPiece = function(i){
		var img = document.createElement("img");
		img.setAttribute("src",this.image);
		img.setAttribute("draggable","true");
		img.setAttribute("ondragstart",funcion_drag);
		if(color=="white"){
			img.classList.add("piece","rook","white");
			img.setAttribute("id","rookw"+i);
		}else{
			img.classList.add("piece","rook","black");
			img.setAttribute("id","rookb"+i);
		}
		return img;
	}

}

function Bishop(color,funcion_drag) {
	this.color = color;
	if(color=="white"){
		this.image="img/bishop_w.png";	
	}else{
		this.image="img/bishop_b.png";
	}
	
	this.checkMove = function (position,position_destiny) {
		let pos_orig = position.split(",");
		let pos_new = position_destiny.split(",");
		if (color=="white") {
			if((Math.abs(pos_new[0]-pos_orig[0])===2 && Math.abs(pos_new[1]-pos_orig[1])===1)||
                (Math.abs(pos_new[0]-pos_orig[0]===1)&& Math.abs(pos_new[1]-pos_orig[1]===2))||
                (Math.abs(pos_new[0]-pos_orig[0]===1)&& Math.abs(pos_new[1]-pos_orig[1]===1))){
				//Execute the destroyPiece() function
				if( (document.getElementById(position_destiny).getElementsByTagName("img").length > 0 && document.getElementById(position_destiny).getElementsByTagName("img")[0].classList.contains("black"))){
					destroyPiece(position_destiny,"black",position,true);
				}
				return true;
			}else{
				return false;
			}
		}else{
			if((Math.abs(pos_new[0]-pos_orig[0]) === Math.abs(pos_new[1]-pos_orig[1]))){
				//Execute the destroyPiece() function
				if( (document.getElementById(position_destiny).getElementsByTagName("img").length > 0 && document.getElementById(position_destiny).getElementsByTagName("img")[0].classList.contains("white"))){
					destroyPiece(position_destiny,"white",position,true);
				}
				return true;
			}else{
				return false;
			}
		}
		
	}

	this.genPiece = function(i){
		var img = document.createElement("img");
		img.setAttribute("src",this.image);
		img.setAttribute("draggable","true");
		img.setAttribute("ondragstart",funcion_drag);
		if(color=="white"){
			img.classList.add("piece","bishop","white");
			img.setAttribute("id","bishopw"+i);
		}else{
			img.classList.add("piece","bishop","black");
			img.setAttribute("id","bishopb"+i);
		}
		return img;
	}
}

function Knight(color,funcion_drag) {
	this.color = color;
	if(color=="white"){
		this.image="img/knight_w.png";
	}else{
		this.image="img/knight_b.png";
	}

	this.checkMove = function (position,position_destiny) {
		let pos_orig = position.split(",");
		let pos_new = position_destiny.split(",");
		if (color=="white") {
			if(pos_new[0]!=pos_orig[0] && pos_new[1]!=pos_orig[1]){
				//Execute the destroyPiece() function
				if( (document.getElementById(position_destiny).getElementsByTagName("img").length > 0 && document.getElementById(position_destiny).getElementsByTagName("img")[0].classList.contains("black"))){
					destroyPiece(position_destiny,"black",position,true);
				}
				return true;
			}else{
				return false;
			}
		}else{
			if(pos_new[0]!=pos_orig[0] && pos_new[1]!=pos_orig[1] ){
				//Execute the destroyPiece() function
				if( (document.getElementById(position_destiny).getElementsByTagName("img").length > 0 && document.getElementById(position_destiny).getElementsByTagName("img")[0].classList.contains("white"))){
					destroyPiece(position_destiny,"white",position,true);
				}
				return true;
			}else{
				return false;
			}
		}

	}

	this.genPiece = function(i){
		var img = document.createElement("img");
		img.setAttribute("src",this.image);
		img.setAttribute("draggable","true");
		img.setAttribute("ondragstart",funcion_drag);
		if(color=="white"){
			img.classList.add("piece","knight","white");
			img.setAttribute("id","knightw"+i);
		}else{
			img.classList.add("piece","knight","black");
			img.setAttribute("id","knightb"+i);
		}
		return img;
	}
}

function Queen(color,funcion_drag) {
	this.color = color;
	if(color=="white"){
		this.image="img/queen_w.png";	
	}else{
		this.image="img/queen_b.png";
	}
	
	this.checkMove = function (position,position_destiny) {
		let pos_orig = position.split(",");
		let pos_new = position_destiny.split(",");
		if (color=="white") {
			if((pos_new[0]==pos_orig[0] || pos_new[1]==pos_orig[1]) || 
				((Math.abs(pos_new[0]-pos_orig[0])) === (Math.abs(pos_new[1]-pos_orig[1])))){
				//Execute the destroyPiece() function
				if( (document.getElementById(position_destiny).getElementsByTagName("img").length > 0 && document.getElementById(position_destiny).getElementsByTagName("img")[0].classList.contains("black"))){
					destroyPiece(position_destiny,"black",position,true);
				}
				return true;
			}else{
				return false;
			}
		}else{
			if((pos_new[0]==pos_orig[0] || pos_new[1]==pos_orig[1]) || 
				((Math.abs(pos_new[0]-pos_orig[0])) === (Math.abs(pos_new[1]-pos_orig[1])))){
				//Execute the destroyPiece() function
				if( (document.getElementById(position_destiny).getElementsByTagName("img").length > 0 && document.getElementById(position_destiny).getElementsByTagName("img")[0].classList.contains("white"))){
					destroyPiece(position_destiny,"white",position,true);
				}
				return true;
			}else{
				return false;
			}
		}
		
	}

	this.genPiece = function(i){
		var img = document.createElement("img");
		img.setAttribute("src",this.image);
		img.setAttribute("draggable","true");
		img.setAttribute("ondragstart",funcion_drag);
		if(color=="white"){
			img.classList.add("piece","queen","white");
			img.setAttribute("id","queenw"+i);
		}else{
			img.classList.add("piece","queen","black");
			img.setAttribute("id","queenb"+i);
		}
		return img;
	}

}

function King(color,funcion_drag) {
	this.color = color;
	if(color=="white"){
		this.image="img/king_w.png";	
	}else{
		this.image="img/king_b.png";
	}
	
	this.checkMove = function (position,position_destiny) {
		let pos_orig = position.split(",");
		let pos_new = position_destiny.split(",");
		if (color=="white") {
			if(Math.abs(pos_new[0]-pos_orig[0])===1 || Math.abs(pos_new[1]-pos_orig[1])===1 ||
			Math.abs(pos_new[0]-pos_orig[0])==1 && Math.abs(pos_new[1]-pos_orig[1])==1){
				//Execute the destroyPiece() function
				if( (document.getElementById(position_destiny).getElementsByTagName("img").length > 0 && document.getElementById(position_destiny).getElementsByTagName("img")[0].classList.contains("black"))){
					destroyPiece(position_destiny,"black",position,true);
				}
				return true;
			}else{
				return false;
			}
		}else{
			if(Math.abs(pos_new[0]-pos_orig[0])===1 || Math.abs(pos_new[1]-pos_orig[1])===1 ||
			Math.abs(pos_new[0]-pos_orig[0])==1 && Math.abs(pos_new[1]-pos_orig[1])==1){
				//Execute the destroyPiece() function
				if( (document.getElementById(position_destiny).getElementsByTagName("img").length > 0 && document.getElementById(position_destiny).getElementsByTagName("img")[0].classList.contains("white"))){
					destroyPiece(position_destiny,"white",position,true);
				}
				return true;
			}else{
				return false;
			}
		}
		
	}

	this.genPiece = function(i){
		var img = document.createElement("img");
		img.setAttribute("src",this.image);
		img.setAttribute("draggable","true");
		img.setAttribute("ondragstart",funcion_drag);
		if(color=="white"){
			img.classList.add("piece","king","white");
			img.setAttribute("id","kingw"+i);
		}else{
			img.classList.add("piece","king","black");
			img.setAttribute("id","kingb"+i);
		}
		return img;
	}

}