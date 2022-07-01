/**********************************
 * TouchRpgMaker - 2D Game Engine *
 *****************
 * Author : "Frank Yohan Rodríguez"
 * Git : "https://github.com/MxTecOrg"
 ****************/

import Camera from './engine/Camera.js';
import Stage from './engine/Stage.js';
import Texture from './engine/Texture.js';
import Creature from './engine/Creature.js';

/*
export default class Engine {
    constructor(){
        this.Camera = Camera;
        this.Stage = Stage;
        this.Texture = Texture;
        this.Creature = Creature;
    }
}
*/

window.Engine = {
    Camera,
    Stage,
    Texture,
    Creature
}