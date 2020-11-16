import { Boat } from './Boat.js';

export class Player{
  constructor(id) {
    this.id = id;
    this.boats = [];
    this.boatsLayouts = [];
    this.damagedPoints = [];
    this.init();
  }

  init(){
    for (let i = 1; i < 6 ; i++){
      this.initBoat(1)
    }
    for (let i = 1; i < 4 ; i++){
      this.initBoat(2)
    }
    for (let i = 1; i < 3 ; i++){
      this.initBoat(3)
    }
  }

  initBoat(level){
    let x = Math.floor(Math.random()*10 + 1);
    let y = Math.floor(Math.random()*10 + 1);
    while (this.boatsLayouts.filter(layout => layout.x === x && layout.y == y).length > 0){
      x = Math.floor(Math.random()*10 + 1);
      y = Math.floor(Math.random()*10 + 1);
    }
    const boat = new Boat(x, y, level, this.id);
    this.boats.push(boat);
    for (let k = -1; k < 2; k++){
      this.boatsLayouts.push({x: x + k, y: y -1});
      this.boatsLayouts.push({x: x + k, y});
      this.boatsLayouts.push({x: x + k, y: y + 1});
    }
  }

  killedBoats(){
    this.damagedPoints = this.boats.filter(boat => !boat.isAlive())
      .map(boat => ({x: boat.x, y: boat.y}));

    return this.damagedPoints
  }

}
