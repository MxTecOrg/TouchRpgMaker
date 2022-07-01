/**********************************
 * TouchRpgMaker - 2D Game Engine *
 **********************************
 * Author : "Frank Yohan Rodríguez"
 * Git : "https://github.com/MxTecOrg"
 ****************/

export default class Stage {
    constructor(tiles_x , tiles_y , tiles_size){
        this.tiles_x = tiles_x;
        this.tiles_y = tiles_y;
        this.tiles_size = tiles_size;
        this.terrain = {};
        this.objects = {};
        this.creatures = {};
        this.defaultTerrain;
    }
    
    
    setDefaultTerrain(texture){
        this.defaultTerrain = texture;
    }
    
    setTerrainAt(tile_x , tile_y , texture){
        this.terrain[tile_y + "_" + tile_x] = texture;
    }
    
    setObjectAt(tile_x , tile_y , texture){
        this.objects[tile_y + "_" + tile_x] = texture;
    }
    
    addCreature(creature){
        this.creatures[creature.tag] = creature;
    }
    
    delCreature(creature){
        delete this.creatures[creature];
    }
    
    init(){
        for(let y = 0; y < this.tiles_y ; y++){
            for(let x = 0; x < this.tiles_x ; x++){
                if(!this.terrain[y + "_" + x] && this.defaultTerrain) this.terrain[y + "_" + x] = this.defaultTerrain;
            }
        }
    }
}
