import { Player } from './Player.js';

export class GameObject {
  constructor() {
    this.round = 0;
    this.player1 = null;
    this.player2 = null;
    this.score = {player1: 0, player2: 0};
  }

  gameStart(){
    this.player1 =  new Player('p1');
    this.player2 = new Player('p2');
  }

  async startRound(){
    this.round++
    const boats1 = this.player1.boats.filter(b => b.isAlive());
    const boats2 = this.player2.boats.filter(b => b.isAlive());

    let damagedPoints1 = this.player1.killedBoats();
    let damagedPoints2 = this.player2.killedBoats();
    const arr = [...boats1, ...boats2];
    const response = await Promise.all(arr.map(async boat =>{
      const damagedPoints = boat.parentId === 'p1' ? damagedPoints2 : damagedPoints1;
      const p = await boat.shot(damagedPoints);
      return p
    }));
    damagedPoints1 = this.player1.killedBoats();
    damagedPoints2 = this.player2.killedBoats();
    this.score = {player1: damagedPoints2.length, player2: damagedPoints1.length};
  }

  stop(){
    this.player1.boats.forEach(b => {
      b.element.removeEventListener('attack', b.damage.bind(b));
      b.element.remove();
    });
    this.player2.boats.forEach(b => {
      b.element.removeEventListener('attack', b.damage.bind(b));
      b.element.remove();
    });
    this.round = 0;
    this.player1 = null;
    this.player2 = null;
    this.player1Islive = true;
    this.player2Islive = true;
    this.score = {player1: 0, player2: 0};
  }

}
