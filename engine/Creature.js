/**********************************
 * TouchRpgMaker - 2D Game Engine *
 **********************************
 * Author : "Frank Yohan Rodríguez"
 * Git : "https://github.com/MxTecOrg"
 ****************/

export default class Creature {
    constructor(tag, x, y, size_x, size_y) {
        this.tag = (tag ? tag : "########".replace(/#/g, (n) => Math.round(Math.random() * 9)));
        this.sprite = {};
        this.asp = { p: "down", n: 0, time: 0 };
        this.x = x;
        this.y = y;
        this.base_x = x;
        this.base_y = y;
        this.size_x = size_x;
        this.size_y = size_y;
        this.speed = 1;
        this.animationSpeed = 50;
        this.density = 1;
        this.trigger = null;
        this.isLoaded = true;
        this.isAI = false;
        this.goto = {
            x: "na",
            y: "na",
            type: "tile"
        };
        this.isMoving = false;
    }

    addSprites(sprites) {
        for (let p in sprites) {
            this.sprite[p] = [];
            for (let n of sprites[p]) {
                const img = new Image();
                img.setAttribute("class" , "reverse");
                img.src = n;
                this.sprite[p].push(img);
            }
            this.asp.p = p;
        }
    }

    goTo(x, y, type = "tile") {
        this.goto = {
            x: x,
            y: y,
            type: type
        }
    }

    AutoMove(stage, scale) {
        /*** Movimiento ***/

        if (this.goto.x == "na" || this.goto.y == "na") return;
        const terrain = stage.terrain;
        const objects = stage.objects;

        switch (this.goto.type) {
            /* por cuadros */
            case "tile":
                const minTile = (n) => {
                    return Math.floor(((n) + (this.size_x / 2) - (stage.tiles_size / 2.1)) / stage.tiles_size);
                };

                const maxTile = (n) => {
                    return Math.floor(((n) + (this.size_x / 2) + (stage.tiles_size / 2.1)) / stage.tiles_size);
                };
                const tile_x = minTile(this.x);
                const tile_y = minTile(this.y);
                const tile_x_max = maxTile(this.x);
                const tile_y_max = maxTile(this.y);
                const f_tile_x = minTile(this.x + this.speed + (this.size_x / 2));
                const f_tile_y = minTile(this.y + this.speed + (this.size_y / 2));
                const f_tile_x_max = maxTile(this.x + this.speed - (this.size_x / 2));
                const f_tile_y_max = maxTile(this.y + this.speed - (this.size_y / 2));


                if (this.goto.x != tile_x || this.goto.y != tile_y || this.goto.x != tile_x_max || this.goto.y != tile_y_max) {
                    if (tile_x < this.goto.x) {
                        if ((!objects[tile_y + "_" + f_tile_x] || objects[tile_y + "_" + f_tile_x].density < 1) && (!terrain[tile_y + "_" + f_tile_x] || terrain[tile_y + "_" + f_tile_x].density < 1)) {
                            this.x += this.speed;
                            if (this.sprite.right) {

                                if (this.asp.p != "right") {
                                    this.asp.p = "right";
                                    this.asp.n = 0;

                                }
                                this.asp.time += this.speed;
                                if (this.asp.time >= this.animationSpeed) {
                                    this.asp.time = 0;
                                    this.asp.n++;
                                    if (this.asp.n >= this.sprite.right.length) this.asp.n = 0;
                                }
                            }
                            return;
                        }
                    }
                    if (tile_x_max > this.goto.x) {
                        if ((!objects[tile_y_max + "_" + f_tile_x_max] || objects[tile_y_max + "_" + f_tile_x_max].density < 1) && (!terrain[tile_y_max + "_" + f_tile_x_max] || terrain[tile_y_max + "_" + f_tile_x_max].density < 1)) {
                            this.x -= this.speed;
                            if (this.sprite.left) {
                            
                                if (this.asp.p != "left") {
                                    this.asp.p = "left";
                                    this.asp.n = 0;
                            
                                }
                                this.asp.time += this.speed;
                                if (this.asp.time >= this.animationSpeed) {
                                    this.asp.time = 0;
                                    this.asp.n++;
                                    if (this.asp.n >= this.sprite.left.length) this.asp.n = 0;
                                   
                                }
                            }
                            return;
                        }
                    }
                    if (tile_y < this.goto.y) {
                        if ((!objects[f_tile_y + "_" + tile_x] || objects[f_tile_y + "_" + tile_x].density < 1) && (!terrain[f_tile_y + "_" + tile_x] || terrain[f_tile_y + "_" + tile_x].density < 1)) {
                            this.y += this.speed;
                            if (this.sprite.down) {
                            
                                if (this.asp.p != "down") {
                                    this.asp.p = "down";
                                    this.asp.n = 0;
                            
                                }
                                this.asp.time += this.speed;
                                if (this.asp.time >= this.animationSpeed) {
                                    this.asp.time = 0;
                                    this.asp.n++;
                                    if (this.asp.n >= this.sprite.down.length) this.asp.n = 0;
                                }
                            }
                            return;
                        }

                    }
                    if (tile_y_max > this.goto.y) {
                        if ((!objects[f_tile_y_max + "_" + tile_x_max] || objects[f_tile_y_max + "_" + tile_x_max].density < 1) &&
                            (!terrain[f_tile_y_max + "_" + tile_x_max] || terrain[f_tile_y_max + "_" + tile_x_max].density < 1)) {
                            this.y -= this.speed;
                            if (this.sprite.up) {
                            
                                if (this.asp.p != "up") {
                                    this.asp.p = "up";
                                    this.asp.n = 0;
                            
                                }
                                this.asp.time += this.speed;
                                if (this.asp.time >= this.animationSpeed) {
                                    this.asp.time = 0;
                                    this.asp.n++;
                                    if (this.asp.n >= this.sprite.up.length) this.asp.n = 0;
                                }
                            }
                            return;
                        }
                    }
                } else this.goto = { x: "na", y: "na", type: "tile" };
                break;
            case "coords":
                /* por coordenadas */
                const tilex = (n) => {
                    return Math.floor((n + (this.size_x / 2)) / stage.tiles_size);
                }
                const tiley = (n) => {
                    return Math.floor((n + (this.size_y / 2)) / stage.tiles_size);
                }
                if (this.goto.x == "na" || this.goto.y == "na") return;

                let speed = this.speed;

                if (this.x > this.goto.x && this.y > this.goto.y) {
                    speed = this.speed * 0.75;
                }
                else if (this.x < this.goto.x && this.y > this.goto.y) {
                    speed = this.speed * 0.75;
                }
                else if (this.x > this.goto.x && this.y < this.goto.y) {
                    speed = this.speed * 0.75;
                }
                else if (this.x < this.goto.x && this.y < this.goto.y) {
                    speed = this.speed * 0.75;
                }

                let moved = false;

                if ((this.x + (this.size_x / 2)) < this.goto.x) {
                    if (Math.abs((this.x + (this.size_x / 2)) - this.goto.x) > speed)
                        if ((!objects[tiley(this.y) + "_" + tilex(this.x + speed)] || objects[tiley(this.y) + "_" + tilex(this.x + speed)].density < 1) && (!terrain[tiley(this.y) + "_" + tilex(this.x + speed)] || terrain[tiley(this.y) + "_" + tilex(this.x + speed)].density < 1)) {
                            this.x += speed;
                            moved = true;
                        }
                }
                if ((this.y + (this.size_y / 2)) < this.goto.y) {
                    if (Math.abs((this.y + (this.size_y / 2)) - this.goto.y) > speed)
                        if ((!objects[tiley(this.y + speed) + "_" + tilex(this.x)] || objects[tiley(this.y + speed) + "_" + tilex(this.x)].density < 1) && (terrain[tiley(this.y + speed) + "_" + tilex(this.x)] || terrain[tiley(this.y + speed) + "_" + tilex(this.x)].density < 1)) {
                            this.y += speed;
                            moved = true;
                        }
                }
                if ((this.x + (this.size_x / 2)) > this.goto.x) {
                    if (Math.abs((this.x + (this.size_x / 2)) - this.goto.x) > speed)
                        if ((!objects[tiley(this.y) + "_" + tilex(this.x - speed)] || objects[tiley(this.y) + "_" + tilex(this.x - speed)].density < 1) && (!terrain[tiley(this.y) + "_" + tilex(this.x - speed)] || terrain[tiley(this.y) + "_" + tilex(this.x - speed)].density < 1)) {
                            this.x -= speed;
                            moved = true;
                        }
                }
                if ((this.y + (this.size_y / 2)) > this.goto.y) {
                    if (Math.abs((this.y + (this.size_y / 2)) - this.goto.y) > speed)
                        if ((!objects[tiley(this.y - speed) + "_" + tilex(this.x)] || objects[tiley(this.y - speed) + "_" + tilex(this.x)].density < 1) && (!terrain[tiley(this.y - speed) + "_" + tilex(this.x)] || terrain[tiley(this.y - speed) + "_" + tilex(this.x)].density < 1)) {
                            this.y -= speed;
                            moved = true;
                        }
                }

                if (!moved) this.goto = {
                    x: "na",
                    y: "na",
                    type: "coords"
                };
                break;
            default:
                break;
        }
    }

}
