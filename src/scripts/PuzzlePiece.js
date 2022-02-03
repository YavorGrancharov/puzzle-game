import * as PIXI from 'pixi.js';
import TWEEN from '@tweenjs/tween.js';

import Globals from './Globals';

function PuzzlePiece(id, field) {
    PIXI.utils.EventEmitter.call(this);
    this.sprite = new PIXI.Sprite(Globals.resources[id].texture);
    this.sprite.x = field.x;
    this.sprite.y = field.y;
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(0.5);
    this.field = field;
    this.dragDrop();
}

PuzzlePiece.prototype = Object.create(PIXI.utils.EventEmitter.prototype);
PuzzlePiece.prototype.constructor = PuzzlePiece;

PuzzlePiece.prototype.dragDrop = function () {
    this.sprite.interactive = true;
    this.sprite.on('pointerdown', this.onTouchStart, this);
    this.sprite.on('pointermove', this.onTouchMove, this);
    this.sprite.on('pointerup', this.onTouchEnd, this);
};

PuzzlePiece.prototype.onTouchStart = function (ev) {
    this.sprite.zIndex = 1;

    // save mouse position
    this.touchPosition = { x: ev.data.global.x, y: ev.data.global.y };

    // set the drag state for this sprite
    this.dragging = true;

    Globals.resources.click.sound.play();
};

PuzzlePiece.prototype.onTouchMove = function (ev) {
    if (!this.dragging) {
        return;
    }

    // get cursor coordinates
    const currentPos = { x: ev.data.global.x, y: ev.data.global.y };

    // calculate offset
    const offsetX = currentPos.x - this.touchPosition.x;
    const offsetY = currentPos.y - this.touchPosition.y;

    // apply the offset
    this.sprite.x = this.field.x + offsetX;
    this.sprite.y = this.field.y + offsetY;
};

PuzzlePiece.prototype.onTouchEnd = function () {
    Globals.resources.click.sound.play();
    this.dragging = false;
    this.sprite.zIndex = 0;
    this.emit('dragend');
};

PuzzlePiece.prototype.reset = function () {
    const tween = new TWEEN.Tween(this.sprite);
    tween.to({ x: this.field.x, y: this.field.y }, 300);
    tween.onStart(() => (this.sprite.zIndex = 1));
    tween.onComplete(() => (this.sprite.zIndex = 0));
    tween.easing(TWEEN.Easing.Back.Out)
    tween.start();
    // this.sprite.x = this.field.x;
    // this.sprite.y = this.field.y;
};

PuzzlePiece.prototype.setField = function (field) {
    this.field = field;
    this.reset();
};

Object.defineProperties(PuzzlePiece.prototype, {
    left: {
        get: function () {
            return this.sprite.x - this.sprite.width / 2;
        },
    },
    right: {
        get: function () {
            return this.sprite.x + this.sprite.width / 2;
        },
    },
    top: {
        get: function () {
            return this.sprite.y - this.sprite.height / 2;
        },
    },
    bottom: {
        get: function () {
            return this.sprite.y + this.sprite.height / 2;
        },
    },
});

export default PuzzlePiece;
