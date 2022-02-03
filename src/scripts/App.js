
import * as PIXI from 'pixi.js';
import TWEEN from '@tweenjs/tween.js';

import Loader from './Loader';
import MainScene from './MainScene';

function App() {
    this.app = new PIXI.Application({ resizeTo: window });
}

App.prototype.start = function() {
    this.app.ticker.add(() => TWEEN.update())
    this.scene = new MainScene();
    this.app.stage.addChild(this.scene.container);
}

App.prototype.run = function() {
    document.body.appendChild(this.app.view);

    this.loader = new Loader(this.app.loader);
    this.loader.preload().then(() => {
        this.start();
    });
}

export default App;
