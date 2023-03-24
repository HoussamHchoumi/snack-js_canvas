// Récupération des canvas et création des contextes 2D
var canvas = document.getElementById("canvasSnake");
var ctxSnake = document.getElementById("canvasSnake").getContext("2d");
var ctxFood = document.getElementById("canvasFood").getContext("2d");
var ctxHex = document.getElementById("canvasHex").getContext("2d");

// Création d'une instance de la classe Util pour des fonctions utilitaires
var ut = new Util();

// Initialisation des variables de la souris pour la rotation du serpent
var mouseDown = false,
	cursor = new Point(0, 0);

// Création d'une instance de la classe Game pour gérer le jeu
var game = new Game(ctxSnake, ctxFood, ctxHex);

// Ajout des événements pour la souris
canvas.onmousemove = function(e){
	if(mouseDown){		
		cursor = ut.getMousePos(canvas, e);	
		var ang = ut.getAngle(game.snakes[0].arr[0], cursor);				
		game.snakes[0].changeAngle(ang);		
	}
}

canvas.onmousedown = function(e){
	mouseDown = true;	
}

canvas.onmouseup = function(e){	
	mouseDown = false;
}

// Fonction pour lancer le jeu
function start(){	
	game.init();
	update();
}

// Variables pour la boucle de mise à jour
var updateId,	
previousDelta = 0,
fpsLimit = 20;

// Fonction pour mettre à jour le jeu à chaque rafraîchissement de l'écran
function update(currentDelta){
	// Récupération de l'identifiant de l'animation et calcul du delta
	updateId = requestAnimationFrame(update);
	var delta = currentDelta - previousDelta;
    if (fpsLimit && delta < 1000 / fpsLimit) return;
    previousDelta = currentDelta;

    // Effacement des canvas
	ctxFood.clearRect(0, 0, canvas.width, canvas.height);
	ctxSnake.clearRect(0, 0, canvas.width, canvas.height);
	ctxHex.clearRect(0, 0, canvas.width, canvas.height);

	// Dessin des éléments du jeu
	game.draw();	
}

// Lancement du jeu
start();






