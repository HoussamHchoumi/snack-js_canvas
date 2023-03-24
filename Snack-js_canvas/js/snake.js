class Snake{
	constructor(ctx, name, id){		
		// Initialisation des propriétés
		this.ctx = ctx; // Contexte de dessin du canvas
		this.name = name; // Nom du serpent
		this.id = id; // Identifiant du serpent
		this.score = 0; // Score du serpent
		this.force =  5; // Force du serpent
		this.state = 0; // État du serpent (0: vivant, 1: mort)
		this.headType = ut.random(0, 2); // Type de tête du serpent (0: une seule œil, 1: deux yeux, 2: deux yeux et une branche)
	
		// Position initiale du serpent
		this.pos = new Point(game.SCREEN_SIZE.x/2, game.SCREEN_SIZE.y/2);	
		// Vélocité initiale du serpent
		this.velocity = new Point(0, 0); 	
		// Angle de direction initial du serpent
		this.angle = ut.random(0, Math.PI);	

		this.length = 10; // Longueur initiale du serpent
		this.MAXSIZE = 12;	// Taille maximale du serpent
		this.size = 7;	// Taille initiale du serpent	
		
		// Couleur principale aléatoire du serpent
		this.mainColor = ut.randomColor();
		// Couleur intermédiaire de la couleur principale
		this.midColor = ut.color(this.mainColor, 0.33);
		// Couleur de support de la couleur intermédiaire
		this.supportColor = ut.color(this.midColor, 0.33);

		// Initialisation du tableau de positions du serpent
		this.arr = [];		
		// Ajout de la position initiale du serpent au tableau
		this.arr.push(new Point(game.SCREEN_SIZE.x/2, game.SCREEN_SIZE.y/2));
		// Ajout des positions suivantes pour former le corps initial du serpent
		for(var i=1; i<this.length; i++){
			this.arr.push(new Point(this.arr[i-1].x, this.arr[i-1].y));
		}

	}

	// Dessine la tête du serpent avec deux yeux et une branche
	drawHeadTwoEyeBranch(){

		// Position de la tête du serpent
		var x = this.arr[0].x;
		var y = this.arr[0].y;
	
		// Distance entre les yeux du serpent
		var d = this.size*1.9;
		// Position du premier œil
		var p1 = new Point(x + d*Math.cos(this.angle), y+ d*Math.sin(this.angle));
		// Rotation de l'œil autour du centre de la tête
		p1 = ut.rotate(p1, this.arr[0], Math.PI/6)	
		// Position de la deuxième œil
		var p2 = ut.rotate(new Point(p1.x, p1.y), this.arr[0], -Math.PI/3);
		
		// Dessine le cercle de la tête du serpent avec la couleur principale
		this.ctx.fillStyle = this.mainColor;
		this.ctx.beginPath();
		this.ctx.arc(p1.x, p1.y, this.size/2 + 2, 0, 2*Math.PI);		
		this.ctx.fill();

		
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.beginPath();
		this.ctx.arc(p2.x, p2.y, this.size/2, 0, 2*Math.PI);		
		this.ctx.fill();

		
		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.ctx.arc(p2.x + Math.cos(this.angle), p2.y + Math.sin(this.angle), this.size/4, 0, 2*Math.PI);		
		this.ctx.fill();

		
		var grd=this.ctx.createRadialGradient(x, y, 2, x+4, y+4, 10);
		grd.addColorStop(0, this.supportColor);		
		grd.addColorStop(1, this.midColor);	
		this.ctx.fillStyle = grd;
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size+1, 0, 2*Math.PI);		
		this.ctx.fill();		

	
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.font="10px Arial";
		this.ctx.fillText(this.name, x-10, y-10);		

	}

	drawHeadTwoEye(){

		var x = this.arr[0].x;
		var y = this.arr[0].y;

		
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size+1, 0, 2*Math.PI);		
		this.ctx.fill();

		
		
		var d = this.size/2;
		var p1 = new Point(x + d*Math.cos(this.angle), y+ d*Math.sin(this.angle));
		p1 = ut.rotate(p1, this.arr[0], -20);		
		
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.beginPath();
		this.ctx.arc(p1.x, p1.y, this.size/2, 0, 2*Math.PI);		
		this.ctx.fill();

		
		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.ctx.arc(p1.x + Math.cos(this.angle), p1.y + Math.sin(this.angle), this.size/4, 0, 2*Math.PI);		
		this.ctx.fill();


		
		var p2 = ut.rotate(p1, this.arr[0], 40);		
		
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.beginPath();
		this.ctx.arc(p2.x, p2.y, this.size/2, 0, 2*Math.PI);		
		this.ctx.fill();

		
		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.ctx.arc(p2.x + Math.cos(this.angle), p2.y + Math.sin(this.angle), this.size/4, 0, 2*Math.PI);		
		this.ctx.fill();

		
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.font="10px Arial";
		this.ctx.fillText(this.name, x-5, y-10);		

	}

	drawHeadOneEye(){
		var x = this.arr[0].x;
		var y = this.arr[0].y;

		
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size+2, 0, 2*Math.PI);		
		this.ctx.fill();

		
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size, 0, 2*Math.PI);		
		this.ctx.fill();

		
		var d = 2;
		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.ctx.arc(x + d*Math.cos(this.angle), y + d*Math.sin(this.angle), this.size/1.5, 0, 2*Math.PI);		
		this.ctx.fill();

		
		var d = 3;
		this.ctx.fillStyle = "white";
		this.ctx.beginPath();
		this.ctx.arc(x + d*Math.cos(this.angle), y + d*Math.sin(this.angle), this.size/4, 0, 2*Math.PI);		
		this.ctx.fill();


		
		this.ctx.fillStyle = "whitesmoke";
		this.ctx.font="10px Arial";
		this.ctx.fillText(this.name, x-5, y-10);
	}

	drawBody(x, y, i){
		
		var grd=this.ctx.createRadialGradient(x, y, 2, x+4, y+4, 10);
		grd.addColorStop(0, this.supportColor);		
		grd.addColorStop(1, this.midColor);				
		
		var radius = this.size - (i*0.01);
		if(radius < 0) radius = 1;

		this.ctx.beginPath();	
		this.ctx.fillStyle = this.mainColor;
		this.ctx.arc(x, y, radius+1, 0, 2*Math.PI);
		this.ctx.fill();

		this.ctx.fillStyle = grd;
		this.ctx.beginPath();	
		this.ctx.arc(x, y, radius, 0, 2*Math.PI);
		this.ctx.fill();

	}

	move(){
		this.velocity.x = this.force*Math.cos(this.angle);
		this.velocity.y = this.force*Math.sin(this.angle);
		
		
		var d = this.size/2;
		for(var i=this.length-1; i>=1; i--){				
			this.arr[i].x = this.arr[i-1].x - d*Math.cos(this.angle);
			this.arr[i].y = this.arr[i-1].y - d*Math.sin(this.angle);			
			this.drawBody(this.arr[i].x, this.arr[i].y, i);	
		}

		this.pos.x += this.velocity.x;
		this.pos.y += this.velocity.y;

		if(this.headType == 0) this.drawHeadOneEye();
		else if(this.headType == 1) this.drawHeadTwoEye();
		else if(this.headType == 2) this.drawHeadTwoEyeBranch();
				
		this.checkCollissionFood();
		this.checkCollissionSnake();
		this.checkBoundary();
	}

	checkBoundary(){}

	
	checkCollissionFood(){	
		var x = this.arr[0].x;
		var y = this.arr[0].y;
		for (var i = 0; i < game.foods.length; i++) {
			if(ut.cirCollission(x, y, this.size+3, game.foods[i].pos.x,
			game.foods[i].pos.y, game.foods[i].size)){
				game.foods[i].die();
				this.addScore();			 
				this.incSize();
			}			
		}
	}

	checkCollissionSnake(){
		var x = this.arr[0].x;
		var y = this.arr[0].y;
		for (var i = 0; i < game.snakes.length; i++) {
			var s =  game.snakes[i];
			if(s !== this){
				for (var j = 0; j < game.snakes[i].arr.length; j+=2) {
					if(ut.cirCollission(x, y, this.size, s.arr[j].x, s.arr[j].y, s.size)){
						this.die();
					}       
				}
			}			
		}
	}

	addScore(){
		this.length++;
		this.score++;
		this.arr.push(new Point(-100, -100));	
	}

	incSize(){
		if(this.length % 30 == 0) this.size++;	
		if(this.size > this.MAXSIZE) this.size = this.MAXSIZE;	
	}

	changeAngle(angle){
		this.angle = angle;
	}

	die(){
		this.state = 1;
		for (var i = 0; i < this.arr.length; i+=3) game.foods.push(new Food(game.ctxFood,
		this.arr[i].x, this.arr[i].y));
		
		var index = game.snakes.indexOf(this);		
		game.snakes.splice(i, 1);
	}

	
	

}