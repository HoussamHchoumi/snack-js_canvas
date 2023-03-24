class SnakeAi extends Snake{

	// Constructeur qui appelle le constructeur de la classe mère "Snake" et initialise les propriétés de l'objet "SnakeAi"
	constructor(ctx, name, id){	

		super(ctx, name, id); // Appelle le constructeur de la classe mère avec les arguments spécifiés

		this.force = 2; // Force de mouvement de l'IA			
		this.pos = new Point(ut.random(-6000, 1800), ut.random(-300, 900));	 // Position initiale de l'IA				
		this.length = ut.random(10, 50);	// Longueur initiale de l'IA
			
		// Initialise le tableau de positions de l'IA avec des points espacés d'une distance égale à la taille de l'IA
		this.arr = [];
		this.arr.push(this.pos);
		for(var i=1; i<this.length; i++) this.arr.push(new Point(this.arr[i-1].x, this.arr[i-1].y));

		// Initialise le mouvement de l'IA
		this.initAiMovement();
	}

	// Fonction qui initialise le mouvement de l'IA avec des changements aléatoires de direction
	initAiMovement(){
		var self = this;	// Référence à l'objet "SnakeAi" dans la fonction
		var count = 0; // Compteur pour déterminer quand changer de direction
		var units = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]; // Liste de valeurs d'angle pour changer de direction plus ou moins vite
		var unit = 0.5;	// Vitesse de rotation initiale
		this.timer = setInterval(function(){		

			// Si le compteur dépasse 20, maintient la direction actuelle et choisit une nouvelle vitesse de rotation aléatoire
			if(count > 20){
				self.angle += 0;
				unit = units[ut.random(0, units.length-1)];
			} 
			// Si le compteur est entre 11 et 20, tourne à droite avec la vitesse de rotation actuelle
			else if(count > 10) self.angle += unit;
			// Si le compteur est entre 1 et 10, tourne à gauche avec la vitesse de rotation actuelle
			else if(count > 0) self.angle -= unit;

			count++;
			count %= 30;	// Réinitialise le compteur après 30 itérations	
		
		}, 100); // Met à jour la direction de l'IA toutes les 100 millisecondes
	}

	// Fonction qui déplace l'IA
	move(player){

		// Calcule la nouvelle vélocité de l'IA en fonction de son angle de direction
		this.velocity.x = this.force*Math.cos(this.angle);
		this.velocity.y = this.force*Math.sin(this.angle);

		// Déplace chaque segment du corps de l'IA en partant de la queue et en allant vers la tête
		for(var i=this.length-1; i>=1; i--){
			this.arr[i].x = this.arr[i-1].x;
			this.arr[i].y = this.arr[i-1].y;			
			
			
			this.arr[i].x -= player.velocity.x;
			this.arr[i].y -= player.velocity.y;

			// Dessine le segment du corps sur le canvas
		this.drawBody(this.arr[i].x, this.arr[i].y, i);
	}

	// Déplace la tête de l'IA en fonction de sa vélocité et de sa position actuelle
	this.arr[0].x += this.velocity.x;
	this.arr[0].y += this.velocity.y;

	this.pos.x += this.velocity.x;
	this.pos.y += this.velocity.y;

	// Compense la vélocité de l'IA en soustrayant la vélocité du joueur
	this.arr[0].x -= player.velocity.x;
	this.arr[0].y -= player.velocity.y;

	// Dessine la tête de l'IA sur le canvas en fonction de son type
	if(this.headType == 0) this.drawHeadOneEye();
	else if(this.headType == 1) this.drawHeadTwoEye();
	else if(this.headType == 2) this.drawHeadTwoEyeBranch();

	// Dessine le bouclier de l'IA sous forme de cercle blanc semi-transparent
	this.ctx.beginPath();
	this.ctx.globalAlpha = 0.5;
	this.ctx.fillStyle = "white";
	if(this.inDanger) this.ctx.fillStyle = "red"; // Si l'IA est en danger (collision avec une autre IA), le bouclier devient rouge
	this.ctx.arc(this.pos.x, this.pos.y, this.shield, 0, 2*Math.PI);		
	this.ctx.fill();
	this.ctx.globalAlpha = 1;

	// Vérifie si l'IA mange une nourriture
	super.checkCollissionFood();	

	// Vérifie si l'IA entre en collision avec une autre IA
	this.checkCollissionSnake();

	// Vérifie si l'IA sort de la zone de jeu
	this.checkBoundary();
}

// Fonction qui fait mourir l'IA
die(){
	this.state = 1; // Définit l'état de l'IA à "mort"
	for (var i = 0; i < this.arr.length; i+=3)game.foods.push(new Food(game.ctxFood,
	this.arr[i].x, this.arr[i].y)); // Crée des nourritures à l'emplacement de chaque segment de corps de l'IA

	var index = game.snakes.indexOf(this);		
	game.snakes.splice(i, 1); // Supprime l'IA du tableau d'IA
}

// Fonction qui vérifie si l'IA entre en collision avec une autre IA
checkCollissionSnake(){
	var x = this.arr[0].x;
	var y = this.arr[0].y;
	for (var i = 0; i < game.snakes.length; i++) {
		var s =  game.snakes[i];
		if(s !== this){
			for (var j = 0; j < s.arr.length; j++) {					
				
				if(ut.cirCollission(x, y, this.size, s.arr[j].x, s.arr[j].y, s.size)){
					this.die(); // Si l'IA entre en collision avec une autre IA, elle meurt
				}       
			}
		}			
	}
}

	
}