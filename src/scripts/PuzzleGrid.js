import * as PIXI from 'pixi.js';

import PuzzleConfig from './PuzzleConfig';
import PuzzlePiece from './PuzzlePiece';

function PuzzleGrid() {
    this.container = new PIXI.Container();
    this.container.x = window.innerWidth / 2;
    this.container.y = window.innerHeight / 2;
    this.container.sortableChildren = true;
    this.puzzle();
}

PuzzleGrid.prototype.puzzle = function () {
    this.pieces = [];

    let ids = PuzzleConfig.map((field) => field.id);

    PuzzleConfig.forEach((field) => {
        const rand = Math.floor(Math.random() * ids.length);
        const randId = ids[rand];
        ids = ids.filter((id) => id !== randId);
        const piece = new PuzzlePiece(randId, field);
        piece.on('dragend', () => this.onPieceDragEnd(piece));
        this.container.addChild(piece.sprite);
        this.pieces.push(piece);
    });
};

PuzzleGrid.prototype.onPieceDragEnd = function (piece) {
    const pieceToReplace = this.pieces.find(
        (p) =>
            p !== piece &&
            // piece center to the right of the left side
            piece.sprite.x >= p.left &&
            // piece center to the left of the right side
            piece.sprite.x <= p.right &&
            // piece center below the top side
            piece.sprite.y <= p.bottom &&
            // piece center above the bottom side
            piece.sprite.y >= p.top
    );

    if (pieceToReplace) {
        const replaceField = pieceToReplace.field;
        pieceToReplace.setField(piece.field);
        piece.setField(replaceField);
    } else piece.reset();
};

export default PuzzleGrid;
