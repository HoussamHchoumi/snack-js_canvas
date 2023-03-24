class Util{
	// Constructeur par défaut
	constructor(){	
	}

	// Fonction qui calcule les coordonnées de la souris sur le canvas 
	// en fonction de l'événement de clic et du canvas lui-même
	getMousePos(canvas, evt) {
	    var rect = canvas.getBoundingClientRect(); // Calcule les coordonnées du canvas dans la page
	    var marginTop = canvas.style.marginTop; // Récupère la marge supérieure du canvas
	    var border = canvas.style.borderWidth; // Récupère la taille de la bordure du canvas

	    var x = evt.clientX - rect.left; // Calcule la position en X de la souris sur le canvas
	    var y = evt.clientY - rect.top - marginTop // Calcule la position en Y de la souris sur le canvas

	    return new Point(x, y); // Renvoie un objet Point avec les coordonnées calculées
	}

	// Fonction qui renvoie un nombre aléatoire compris entre min et max (inclus)
	random(min, max){  
	    return Math.floor(Math.random() * (max - min + 1)) + min;	
	}

	// Fonction qui renvoie une couleur aléatoire à partir d'un tableau de couleurs prédéfinies
	randomColor(){	
		var colors = ["#C0392B", "#E74C3C", "#9B59B6", "#8E44AD", "#2980B9",
		"#3498DB", "#17A589", "#138D75", "#229954", "#28B463", "#D4AC0D",
		 "#D68910", "#CA6F1E", "#BA4A00"];
		return colors[this.random(0, colors.length-1)]
	}

	// Fonction qui renvoie un nom aléatoire à partir d'un tableau de noms prédéfinis
	randomName(){
		var names = [ 'abdel', 'eya', 'oussama', 'youssef', 'dorian', 'clement', 'romu',
		'romain', 'ismail'];
		return names[this.random(0, names.length-1)]
	}

	// Fonction qui calcule la distance entre deux points (i et f) en utilisant le théorème de Pythagore
	getDistance(i, f){
		return Math.abs(Math.sqrt(
			Math.pow((f.x-i.x), 2) + Math.pow((f.y-i.y), 2)));
	}

	// Fonction qui calcule l'angle entre deux points (p1 et p2)
	getAngle(p1, p2){		
		var d1 = this.getDistance(p1, new Point(0, canvas.height)); // Calcule la distance entre p1 et le coin inférieur gauche du canvas
		var d2 = this.getDistance(p2, new Point(0, canvas.height)); // Calcule la distance entre p2 et le coin inférieur gauche du canvas	
        return ((Math.atan2(p2.y - p1.y, p2.x - p1.x))); // Calcule l'angle entre p1 et p2 à partir de ces distances
    }

    // Fonction qui vérifie si deux cercles se chevauchent
    cirCollission(x1, y1, r1, x2, y2, r2){
    	return (this.getDistance(new Point(x1, y1),
    	new Point(x2, y2)) < (r1+r2));
    }

    // Fonction qui dessine un hexagone rempli de couleur noire et avec une bordure de couleur bleue
drawHexagon(ctx, size, x, y){

	var angle = 60; // Angle de rotation entre les côtés de l'hexagone

	// Dessine les côtés de l'hexagone en partant du point en haut à gauche et en tournant dans le sens des aiguilles d'une montre
	ctx.beginPath();
	ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
	for (var i=0; i < 7; i++) {
		var p = x + size * Math.cos(i * 2 * Math.PI / 6);
		var q = y + size * Math.sin(i * 2 * Math.PI / 6);
		var point = new Point(p, q);
		point = this.rotate(point, new Point(x, y), angle); // Effectue une rotation de l'angle spécifié autour du point central de l'hexagone
	  	ctx.lineTo(point.x, point.y); // Ajoute le point calculé à la liste des points du chemin
	}		
	ctx.fillStyle = "black"; // Remplit l'hexagone avec la couleur noire
	ctx.fill();

	// Dessine les côtés de l'hexagone une seconde fois pour créer une bordure de couleur bleue
	ctx.beginPath();
	ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
	for (var i=0; i < 7; i++) {
		var p = x + size * Math.cos(i * 2 * Math.PI / 6);
		var q = y + size * Math.sin(i * 2 * Math.PI / 6);
		var point = new Point(p, q);
		point = this.rotate(point, new Point(x, y), angle); // Effectue une rotation de l'angle spécifié autour du point central de l'hexagone
	  	ctx.lineTo(point.x, point.y); // Ajoute le point calculé à la liste des points du chemin
	}				
	ctx.fillStyle = "#2C3E50"; // Remplit la bordure avec la couleur bleue
	ctx.fill();		
}

// Fonction qui effectue une rotation d'un point "p" autour d'un centre "c" avec un angle spécifié "angle"
rotate(p, c, angle){
	var si = Math.sin(angle); // Calcule le sinus de l'angle de rotation
	var co = Math.cos(angle); // Calcule le cosinus de l'angle de rotation

    // Translate le point p pour qu'il soit centré sur l'origine
    p.x -= c.x;
    p.y -= c.y;

    // Applique la rotation sur le point
    var xnew = p.x * co - p.y * si;
    var ynew = p.x * si + p.y * co;

    // Translate le point pour le ramener à sa position d'origine
    p.x = xnew + c.x;
    p.y = ynew + c.y;
    return p;
}

// Fonction qui calcule une couleur plus claire ou plus sombre à partir d'un code
	color(hex, lum) {

		
		// Supprime tous les caractères non hexadécimaux du code de couleur
	hex = String(hex).replace(/[^0-9a-f]/gi, '');

	// Ajoute des zéros initiaux si le code de couleur ne contient pas 6 chiffres
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}

	lum = lum || 0; // Définit une valeur par défaut de luminosité à 0 si elle n'est pas spécifiée

	// Convertit chaque paire de caractères hexadécimaux en décimal et les ajuste en fonction du facteur de luminosité
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16); // Convertit deux caractères hexadécimaux en un nombre décimal
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16); // Ajuste la valeur du composant de couleur en fonction du facteur de luminosité
		rgb += ("00"+c).substr(c.length); // Ajoute le composant de couleur formaté à la chaîne de couleur
	}

	return rgb; 
}
}





