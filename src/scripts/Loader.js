import LoaderConfig from './LoaderConfig';
import Globals from './Globals';

function Loader(loader) {
    this.starter = loader;
    this.sprites = LoaderConfig;

    const preload = () => {
        return new Promise((resolve, reject) => {
            for (let key in this.sprites) {
                this.starter.add(key, this.sprites[key]);
            }

            this.starter.load((loader, resources) => {
                Globals.resources = resources;
                resolve();
            });

            this.starter.onError.add((err) => {
                console.error(err);
                reject(err);
            });
        });
    };

    return {
        preload,
    };
}

export default Loader;
