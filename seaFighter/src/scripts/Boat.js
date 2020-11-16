export class Boat{
  constructor(x, y, level, parentId) {
    this.x = x;
    this.y = y;
    this.parentId = parentId;
    this.level = level;
    this.health = level * 20;
    this.power = level * 10;
    this.shots = 60;
    this.element = null;
    this.init();
  }

  init(){
    this.element = document.createElement('div');
    const className = `boat${this.level}`;
    this.element.className = className;
    this.element.style.gridColumn = this.x;
    this.element.style.gridRow = this.y;
    this.element.id = `${this.parentId}${this.x}${this.y}`;
    this.element.addEventListener('attack', this.damage.bind(this));
    const container = document.getElementById(this.parentId);
    container.append(this.element);
  }

  shot(damagedPoints){
    const  isAlive = this.isAlive();
    if(this.shots > 0 &&  isAlive){
      this.shots--
      let x = Math.floor(Math.random()*10 + 1);
      let y = Math.floor(Math.random()*10 + 1);
      while (damagedPoints.filter(elm => elm.x === x && elm.y === y).length > 0) {
        x = Math.floor(Math.random()*10 + 1);
        y = Math.floor(Math.random()*10 + 1);
      }
      const damaged = this.power;
      const delay = Math.random();
      return new Promise((resolve, reject) => {
        setTimeout( ()=> {
          const attactId = this.parentId === 'p1' ? `p2${x}${y}` : `p1${x}${y}`;
          const elm = document.getElementById(attactId);
          if(elm !== null){
            const newEvent = new CustomEvent('attack', {detail: {damaged}});
            elm.dispatchEvent(newEvent)
          };
          resolve(true);
          }, delay * 1000);
      })
    }
    return new Promise((resolve, reject) => resolve(false))
  }

  damage(event){
    this.element.style.transform = 'scale(0.8)';
    console.log(`Element with id ${event.target.id} was damaged add lost ${event.detail.damaged} health points`);
    console.log( 'Health before attack: ', this.health);
    this.health -= event.detail.damaged;
    console.log( 'Health after attack: ', this.health);
    if(this.health <= 0){
      this.element.classList.remove(`boat${this.level}`);
      this.element.classList.add('killed');
    }
  }

  isAlive(){
    return this.health > 0
  }

}

