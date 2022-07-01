/**********************************
 * TouchRpgMaker - 2D Game Engine *
 **********************************
 * Author : "Frank Yohan Rodríguez"
 * Git : "https://github.com/MxTecOrg"
 ****************/

export default class Texture {
    constructor(image , density , trigger){
        this.img = new Image()
        this.img.src = image;
        this.density = density;
        this.trigger = trigger;
        this.isLoaded = true;
    }
    
    get(){
        if(this.isLoaded) return {
            texture : this.img,
            density: this.density,
            trigger: this.trigger
        };
        else return null;
    }
}
