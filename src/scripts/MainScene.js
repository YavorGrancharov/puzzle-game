import * as PIXI from 'pixi.js';

import Globals from './Globals';
import PuzzleGrid from './PuzzleGrid';

function MainScene() {
    this.container = new PIXI.Container();

    const background = () => {
        this.bg = new PIXI.Sprite(Globals.resources['bg'].texture);

        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;

        this.container.addChild(this.bg);
    };
    background();

    const grid = () => {
        const grid = new PuzzleGrid();
        this.container.addChild(grid.container);
    };
    grid()
}

export default MainScene;
