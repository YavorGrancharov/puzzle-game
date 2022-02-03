import LoaderConfig from './LoaderConfig';
import Globals from './Globals';

function Loader(loader) {
    this.starter = loader;
    this.sprites = LoaderConfig;
}

Loader.prototype.preload = function () {
    return new Promise((resolve, reject) => {
        for (let key in this.sprites) {
            this.starter.add(key, this.sprites[key]);
        }

        this.starter.load((loader, resources) => {
            Globals.resources = resources;
            resolve();
        });
    });
};

export default Loader;
