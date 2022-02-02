import * as PIXI from 'pixi.js';

import Globals from './Globals';

function MainScene() {
    this.container = new PIXI.Container();

    const background = () => {
        this.bg = new PIXI.Sprite(Globals.resources['bg'].texture);
        
        this.bg.width = 500;
        this.bg.height = 500;
        this.bg.x = window.innerWidth / 2;
        this.bg.y = window.innerHeight / 2;
        this.bg.anchor.set(0.5);

        this.container.addChild(this.bg);
    };

    background();
}

export default MainScene;
