import * as PIXI from 'pixi.js';

import Globals from './Globals';

function PuzzlePiece(id, field) {
    this.sprite = new PIXI.Sprite(Globals.resources[id].texture);
    this.sprite.x = field.x;
    this.sprite.y = field.y;
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(0.5);
}

export default PuzzlePiece;
