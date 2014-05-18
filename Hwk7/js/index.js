var ship;
var gameWorld;
var sphere;
var angle = 0.0;

document.addEventListener("DOMContentLoaded", initializeGame);

function initializeGame() {

    //  GameWorld
    gameWorld = new BABYLON.GameFX.GameWorld("renderCanvas");

	
	//////////////////////////////////////////////////////////////////////////////////
	//  Ship 
	//////////////////////////////////////////////////////////////////////////////////
    var initialShipPosition = new BABYLON.Vector3(0, 0, 10);
	var initialShipScaling = new BABYLON.Vector3(0.04, 0.04, 0.04);
	var initialShipRotation = new BABYLON.Vector3(0, 0, 0.3);
		
    ship = new BABYLON.GameFX.GameEntity3D("Vaisseau", "assets/", "OmegaCrusher.babylon",
                                            initialShipPosition, 
											initialShipRotation, 
											initialShipScaling,
                                            false, gameWorld);

    // Push  this GameEntity3D object into the assetsManager collection
    gameWorld.assetsManager.push(ship);
		
	////////////////////////////////////////////////////////////////////////////////
	//  END Ship 
	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	
	
	
	///////////////////////////////////////////////////////////////////////////////
	//  Enemy 1
	///////////////////////////////////////////////////////////////////////////////
    var initialShipPosition2 = new BABYLON.Vector3(14, 6, 5);
	var initialShipScaling2 = new BABYLON.Vector3(0.02, 0.02, 0.02);
	var initialShipRotation2 = new BABYLON.Vector3(0, 0.5, 0.8);
	
	enemy1 = new BABYLON.GameFX.GameEntity3D("Ennemi1", "assets/", "OmegaCrusher.babylon",
                                            initialShipPosition2, 
											initialShipRotation2, 
											initialShipScaling2,
                                            false, gameWorld);

    // Push this GameEntity3D object  into the assetsManager collection
    gameWorld.assetsManager.push(enemy1);
	//////////////////////////////////////////////////////////////////////////////
	//  END Enemy 1
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	
	
	//////////////////////////////////////////////////////////////////////////////
	//  Enemy 2
	//////////////////////////////////////////////////////////////////////////////
    var initialShipPosition3 = new BABYLON.Vector3(-10, 3, 5);
	var initialShipScaling3 = new BABYLON.Vector3(0.02, 0.02, 0.02);
	var initialShipRotation3 = new BABYLON.Vector3(0, 0.4, -0.2);
	
	enemy2 = new BABYLON.GameFX.GameEntity3D("Ennemi1", "assets/", "OmegaCrusher.babylon",
                                            initialShipPosition3, 
											initialShipRotation3, 
											initialShipScaling3,
                                            false, gameWorld);

    // Push this GameEntity3D object into the assetsManager collection
    gameWorld.assetsManager.push(enemy2);
	/////////////////////////////////////////////////////////////////////////////
	//  END Enemy 2
	/////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////
		
	
	/////////////////////////////////////////////////////////////////////////////
	//  Star field for background; as particle system
	/////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////
	var starfield = new BABYLON.ParticleSystem("particles", 4000, gameWorld.scene);
    starfield.particleTexture = new BABYLON.Texture("../assets/star.png", gameWorld.scene);
    starfield.minAngularSpeed = -4.5;
    starfield.maxAngularSpeed = 4.5;
    starfield.minSize = 0.5;
    starfield.maxSize = 1.0;
    starfield.minLifeTime = 0.5;
    starfield.maxLifeTime = 2.0;
    starfield.minEmitPower = 0.5;
    starfield.maxEmitPower = 1.0;
    starfield.emitRate = 600;
    starfield.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    starfield.minEmitBox = new BABYLON.Vector3(-25, 0, -25);
    starfield.maxEmitBox = new BABYLON.Vector3(25, 0, 25);
    starfield.direction1 = new BABYLON.Vector3(0, 1, 0);
    starfield.direction2 = new BABYLON.Vector3(0, 1, 0);
    starfield.color1 = new BABYLON.Color4(0, 0, 0, 1);
    starfield.color2 = new BABYLON.Color4(1, 1, 1, 1);
    starfield.gravity = new BABYLON.Vector3(0, 5, 0);
	
    starfield.emitter = new BABYLON.Vector3(0, -2, 0);
	
    starfield.start();
	////////////////////////////////////////////////////////////////////////////
	// End  Star field 
	////////////////////////////////////////////////////////////////////////////
	
	var point = new BABYLON.PointLight("point", new BABYLON.Vector3(0, 100, -100), gameWorld.scene);
	point.diffuse = new BABYLON.Color3(1, 0, 0);
	point.specular = new BABYLON.Color3(1, 1, 1);
	sphere = BABYLON.Mesh.CreateSphere("sphere", 16, 3, gameWorld.scene);

    // Request to load all these entities;  the callback given (here startGame)
    //	will be called once the loading is completed
    gameWorld.assetsManager.loadAllEntitiesAsync(startGame);
}



// Assets have been loaded; start the game
function startGame() {

    // use the arrow keys to move the main ship in the XY-plane (default)
    gameWorld.addKeyboard().connectTo(ship);
	
	var borders = gameWorld.getVirtual2DWindowOnZ(40);
	gameWorld.addLeftJoystick().connectTo(ship);
    gameWorld.LeftJoystick.setMinMaxX(borders.top.x, borders.bottom.x);
    gameWorld.LeftJoystick.setMinMaxY(borders.top.y, borders.bottom.y);
	gameWorld.LeftJoystick.setJoystickColor("orange");
	gameWorld.addRightJoystick().connectTo(enemy1);
    gameWorld.RightJoystick.setMinMaxX(borders.top.x, borders.bottom.x);
    gameWorld.RightJoystick.setMinMaxY(borders.top.y, borders.bottom.y);
    gameWorld.RightJoystick.setJoystickColor("green");


    // if you don't start the main game loop, nothing will happen
    gameWorld.startGameLoop(update);

    // remove the loading screen, otherwise you will not see the game
    gameWorld.dashboard.endLoading();
}	
		
function update() {
	angle += 0.05;
	if (angle >=360)
		angle = 0.0;
	sphere.position.x = 10 * Math.cos(angle);
	sphere.position.y = 10 * Math.sin(angle);
	
}

