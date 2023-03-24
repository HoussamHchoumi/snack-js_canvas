class Game{
	constructor(ctxSnake, ctxFood, ctxHex){		
		// On récupère les contextes des canvas pour le serpent, la nourriture et les hexagones
		this.ctxSnake = ctxSnake;	
		this.ctxFood = ctxFood;
		this.ctxHex = ctxHex;
		// On définit la taille du monde et la taille de l'écran
		this.WORLD_SIZE = new Point(4000, 2000);		
		this.SCREEN_SIZE = new Point(800, 400);
		// On définit la position initiale du monde
		this.world = new Point(-1200, -600);						
		// On initialise les tableaux de serpents, de nourriture et de briques
		this.snakes = [];		
		this.foods = [];
		this.bricks = [];		
	}

	// Fonction d'initialisation du jeu
	init() {
		// On ajoute le premier serpent joueur
		this.snakes[0] = new Snake(this.ctxSnake, "houssam", 0);
		// On ajoute 3 serpents IA
		this.addSnake(ut.randomName(), 100);
		this.addSnake(ut.randomName(), 100);
		this.addSnake(ut.randomName(), 100);
		// On génère la nourriture initiale
		this.generateFoods(1000);
	}

	// Fonction de dessin du jeu
	draw(){		
		// On dessine le monde
		this.drawWorld();
		// On fait bouger le premier serpent joueur
		if(this.snakes[0].state === 0)
			this.snakes[0].move();
		// On fait bouger les serpents IA
		for(var i=1; i<this.snakes.length; i++)
		if(this.snakes[i].state === 0) this.snakes[i].move(this.snakes[0]);		
		// On dessine la nourriture
		for(var i=0; i<this.foods.length; i++) this.foods[i].draw(this.snakes[0]);			
		// On dessine le score des joueurs
		this.drawScore();
		// On dessine la carte des joueurs
		this.drawMap();
	}

	// Fonction de dessin du monde
	drawWorld(){				
		// On remplit le canvas d'hexagones blancs
		this.ctxHex.fillStyle = "white";
		this.ctxHex.fillRect(this.world.x - 2, this.world.y - 2, this.WORLD_SIZE.x+4, this.WORLD_SIZE.y+4);
		// On dessine le sol en gris
		this.ctxHex.fillStyle = "#17202A";
		this.ctxHex.fillRect(this.world.x, this.world.y, this.WORLD_SIZE.x, this.WORLD_SIZE.y);
		// On déplace le monde en fonction de la vitesse du serpent joueur
		this.world.x -= this.snakes[0].velocity.x;
		this.world.y -= this.snakes[0].velocity.y;
	}

	// Fonction de dessin du score des joueurs
	drawScore(){
		var start = new Point(20, 20);
		for (var i = 0; i < this.snakes.length; i++) {			
			this.ctxSnake.fillStyle = this.snakes[i].mainColor;
			this.ctxSnake.font="bold 10px Arial";
			this.ctxSnake.fillText(this.snakes[i].name + ":" + this.snakes[i].score,
			start.x-5, start.y +i*15);		
		}
	}

	drawMap() {
		// Règle l'opacité de la carte à 0.5 pour la rendre semi-transparente
		this.ctxSnake.globalAlpha = 0.5;
	  
		// Définit la taille et la position de la carte
		var mapSize = new Point(100, 50);
		var start = new Point(20, this.SCREEN_SIZE.y - mapSize.y - 10);
	  
		// Remplit le rectangle blanc pour dessiner la carte
		this.ctxSnake.fillStyle = "white";
		this.ctxSnake.fillRect(start.x, start.y, mapSize.x, mapSize.y);
		this.ctxSnake.fill();
	  
		// Rétablit l'opacité normale
		this.ctxSnake.globalAlpha = 1;
	  
		// Dessine un point représentant la position de chaque joueur sur la carte
		for (var i = 0; i < this.snakes.length; i++) {
		  // Calcule la position du joueur sur la carte en fonction de sa position dans le monde de jeu
		  var playerInMap = new Point(
			start.x + (mapSize.x / this.WORLD_SIZE.x) * this.snakes[i].pos.x,
			start.y + (mapSize.y / this.WORLD_SIZE.y) * this.snakes[i].pos.y
		  );
	  
		  // Dessine un point de la couleur du joueur à sa position sur la carte
		  this.ctxSnake.fillStyle = this.snakes[i].mainColor;
		  this.ctxSnake.beginPath();
		  this.ctxSnake.arc(start.x + playerInMap.x, playerInMap.y + 10, 2, 0, 2 * Math.PI);
		  this.ctxSnake.fill();
		}
	  }
	  
	  // Ajoute un nouveau serpent contrôlé par l'ordinateur
	  addSnake(name, id) {
		this.snakes.push(new SnakeAi(this.ctxSnake, name, id));
	  }
	  
	  // generer des aliments de façon aléatoire sur la carte
	  generateFoods(n) {
		for (var i = 0; i < n; i++) {
		  this.foods.push(
			new Food(
			  this.ctxFood,
			  ut.random(-1200 + 50, 2800 - 50),
			  ut.random(-600 + 50, 1400 - 50)
			)
		  );
		}
	  }
	

}