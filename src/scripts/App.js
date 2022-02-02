import * as PIXI from 'pixi.js';

import Loader from './Loader';
import MainScene from './MainScene';

function App() {
    this.app = new PIXI.Application({ resizeTo: window });

    const start = () => {
        this.scene = new MainScene();
        this.app.stage.addChild(this.scene.container);
        console.log(this.app.stage);
    };

    const run = () => {
        document.body.appendChild(this.app.view);

        this.loader = new Loader(this.app.loader);
        this.loader.preload().then(() => {
            start();
        });
    };

    return {
        run,
    };
}

export default App;
