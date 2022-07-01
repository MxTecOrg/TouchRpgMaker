//import Engine from './Engine.js';

window.onload = function() {
    const Camera = new Engine.Camera("div" , 1);
    Camera.init();
    
    const grass = new Engine.Texture("./res/img/base.png" , 0);
    const tree = new Engine.Texture("./res/img/tree_1.png" , 1);
    
    class Player extends Engine.Creature {
        /* implementar jugador */
    }
    class Enemy extends Engine.Creature{}
    
    const player = new Player("player", 0 , 0 , 60, 60);
    /* Sprites del jugador */
    player.addSprites({
        right :   ["./res/img/pj_1.png" , "./res/img/pj_2.png" , "./res/img/pj_3.png" , "./res/img/pj_4.png"]
    });
    player.sprite.left = player.sprite.right;
    player.sprite.up = [player.sprite.right[0] , player.sprite.right[2]];
    player.sprite.down = player.sprite.up;
    
    player.speed = 3;
    
    const enemy = new Enemy(null, 0, 0, 60, 60);
    enemy.addSprites({
        right: ["./res/img/pj_1.png", "./res/img/pj_2.png", "./res/img/pj_3.png", "./res/img/pj_4.png"]
    });
    enemy.speed = 3;
    
    /* mapa */
    const stage = new Engine.Stage(20 , 20 , 50);
    stage.setDefaultTerrain(grass);
    stage.setObjectAt(3 , 3 , tree);
    //stage.setObjectAt(1 , 1 ,tree);
    stage.setObjectAt(15 , 6 , tree);
    stage.setObjectAt(19 , 19 , tree);
    stage.addCreature(player);
    stage.addCreature(enemy);
    
    stage.init();
    
    /* inicializar camara */
    Camera.setStage(stage);
    
    Camera.follow(player);
    
    Camera.start(30);
    
    /* Evento al tocar la camara */
    Camera.onTouch((event , touch_x , touch_y , tile_x , tile_y, touched) => {
        player.goTo(tile_x , tile_y , "tile");
    });
}
