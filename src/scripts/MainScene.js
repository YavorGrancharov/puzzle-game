import * as PIXI from 'pixi.js';
import PIXI_SOUND from 'pixi-sound';

import Globals from './Globals';
import PuzzleGrid from './PuzzleGrid';

function MainScene() {
    this.container = new PIXI.Container();
    PIXI_SOUND.Sound.from({
        url: Globals.resources.music,
        loop: true,
        preload: true,
        autoPlay: true,
        volume: 0.1,
        loaded: function (err, sound) {
            sound.play();
        },
    });

    this.createBackground();
    this.createGrid();
}

MainScene.prototype.createBackground = function () {
    this.bg = new PIXI.Sprite(Globals.resources['bg'].texture);

    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;

    this.container.addChild(this.bg);
};

MainScene.prototype.createGrid = function () {
    const grid = new PuzzleGrid();
    this.container.addChild(grid.container);
};

export default MainScene;
