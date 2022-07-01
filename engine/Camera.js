/**********************************
 * TouchRpgMaker - 2D Game Engine *
 *****************
 * Author : "Frank Yohan Rodríguez"
 * Git : "https://github.com/MxTecOrg"
 ****************/

export default class Camera {
    constructor(container, scale = 1, x = 0, y = 0, fillColor = "#00dd33") {
        this.container = container;
        this.scale = scale;
        this.x = x;
        this.y = y;
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.fillColor = fillColor;
        this.stage;
        this.tick = 0;
        this.isFollowing = false;
        this.mainLoop;
        this.following;
    }

    init() {
        const cont = document.getElementById(this.container);
        const cont_rect = cont.getBoundingClientRect();
        this.canvas.width = cont_rect.width;
        this.canvas.height = cont_rect.height;
        try {
            cont.appendChild(this.canvas);
        } catch (err) {
            throw new Error("El elemento '" + this.container + "' para añadir el canvas no se encontró!");
        }
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    onTouch(callback) {
        const isTouchingCreature = (touch_x , touch_y) => {
            for(let creature in this.stage.creatures){
                const _creature = this.stage.creatures[creature];
                const min_x = _creature.x;
                const min_y = _creature.y;
                const max_x = _creature.x + _creature.size_x;
                const max_y = _creature.y + _creature.size_y;
                if(touch_x > min_x && touch_x < max_x && touch_y > min_y && touch_y < max_y) return _creature;
            }
        };
        
        this.canvas.onclick = (event) => {
            const touch_x = event.pageX + -this.x;
            const touch_y = event.pageY + -this.y;
            const tile_x = Math.floor(touch_x / this.stage.tiles_size);
            const tile_y = Math.floor(touch_y / this.stage.tiles_size);
            const touched = {
                terrain : this.stage.terrain[tile_y + "_" + tile_x],
                object : this.stage.objects[tile_y + "_" + tile_x],
                creature: isTouchingCreature(touch_x , touch_y)
            }
            callback(event , touch_x , touch_y , tile_x , tile_y , touched );
        }
    }

    setStage(stage) {
        this.stage = stage;
        this.stage.tiles_size *= this.scale;
        for(let creature in this.stage.creatures){
            const crt = this.stage.creatures[creature];
            this.stage.creatures[creature].x = crt.x * this.scale;
            this.stage.creatures[creature].y = crt.y * this.scale;
            this.stage.creatures[creature].speed = crt.speed * this.scale;
            this.stage.creatures[creature].size_x = crt.size_x * this.scale;
            this.stage.creatures[creature].size_y = crt.size_y * this.scale;
        }
    }
    
    tile(n){
        return this.stage.tiles_size * n;
    }
    

    move(x, y) {
        x = (x + (this.canvas.width / 2));
        y = (y + (this.canvas.height / 2));
        const tile_size = (this.stage.tiles_size );
        const max_x = (this.stage.tiles_x * tile_size) - this.canvas.width;
        const max_y = (this.stage.tiles_y * tile_size) - this.canvas.height;

        this.x = (x > 0 ? 0 : (x < -max_x ? -max_x : x));
        this.y = (y > 0 ? 0 : (y < -max_y ? -max_y : y));
    }
    
    follow(target){
        this.following = target;
        this.isFollowing = true;
    }

    followTarget() {
        this.move(-this.following.x - ((this.following.size_x ) / 2), -this.following.y - ((this.following.size_y ) / 2));
    }
    
    loop(ms){
        this.mainLoop = setInterval(() => {
            for(let creature in this.stage.creatures){
                this.stage.creatures[creature].AutoMove(this.stage , this.scale);
            }
            
            if(this.isFollowing) this.followTarget();
        }, ms);
        
    }

    start(ms) {
        if(!this.mainLoop) this.loop(ms);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.stage) throw new Error("Se necesita un Stage para iniciar.");
        const tile_size = (this.stage.tiles_size );

        let y_pos = this.y,
            x_pos = this.x;
        for (let y = 0; y_pos < this.canvas.height; y++) {
            x_pos = this.x;
            for (let x = 0; x_pos < this.canvas.width; x++) {
                const tile = this.stage.terrain[y + "_" + x];

                if (tile) this.ctx.drawImage(tile.get().texture, x_pos, y_pos, tile_size, tile_size);
                const obj = this.stage.objects[y + "_" + x];
                if (obj) this.ctx.drawImage(obj.get().texture, x_pos, y_pos, tile_size, tile_size);
                x_pos += tile_size;
            }
            y_pos += tile_size;
        }

        for (let creature in this.stage.creatures) {
            const creat = this.stage.creatures[creature];
            if(Math.abs(this.x) <= creat.x + tile_size && Math.abs(this.y) <= creat.y + tile_size && (Math.abs(this.x) + this.canvas.width) >= creat.x  - tile_size && (Math.abs(this.y) + this.canvas.height) >= creat.y - tile_size) {
                this.ctx.drawImage(creat.sprite[creat.asp.p][creat.asp.n] , creat.x  + this.x , creat.y + this.y , (creat.size_x), (creat.size_y));
            }
        }
        requestAnimationFrame(() => { this.start(ms) });
    }

}
