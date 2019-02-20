//Pieces definition
function Pawn(color,funcion_drag){
	if(color=="white"){
		this.image="img/pawn_w.png";	
	}else{
		this.image="img/pawn_b.png";
	}
	
	this.checkMove = function (position,position_destiny) {
		let pos_orig = position.split(",");
		let pos_new = position_destiny.split(",");
		if (color=="white") {
			if(Math.abs(pos_new[0]-pos_orig[0])==1 || (pos_new[0]-pos_orig[0])==1 && (pos_new[1]-pos_orig[1])==1 || (document.getElementById(position_destiny).getElementsByTagName("img").length > 0 && document.getElementById(position_destiny).getElementsByTagName("img").hasClass("black"))){
				return true;
			}else{
				return false;
			}
		}else{
			if(Math.abs(pos_new[0]-pos_orig[0])==1 || (pos_new[0]-pos_orig[0])==1 && (pos_new[1]-pos_orig[1])==1 || (document.getElementById(position_destiny).getElementsByTagName("img").length > 0 && document.getElementById(position_destiny).getElementsByTagName("img").hasClass("white"))){
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