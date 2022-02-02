import * as PIXI from 'pixi.js';

import PuzzleConfig from './PuzzleConfig';
import PuzzlePiece from './PuzzlePiece';

function PuzzleGrid() {
    this.container = new PIXI.Container();
    this.container.x = window.innerWidth / 2;
    this.container.y = window.innerHeight / 2;

    const puzzle = () => {
        this.pieces = [];

        PuzzleConfig.forEach((field) => {
            const piece = new PuzzlePiece(field.id, field);
            this.container.addChild(piece.sprite);
            this.pieces.push(piece);
        });
    };
    puzzle();
}

export default PuzzleGrid;
