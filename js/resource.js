class Resources{
    constructor(){
        this.toLoad = {
            //Load game resources here
            mainMenuBackgroundImage: 'images/tilemap/mainMenuBackground.png',
            backgroundImage: 'images/tilemap/testMap.png',
            foregroundImage: 'images/tilemap/foregroundTestMap.png',
            battleSceneImage: 'images/tilemap/battleScene.png',
            hero: 'images/sprite/hero.png',
            healer: 'images/sprite/healer.png',
            knight: 'images/sprite/knight.png',
            girl: 'images/sprite/girl.png',
            ghostling: 'images/sprite/ghostling.png',
            hellfire: 'images/sprite/hellfire.png',
            razorbane: 'images/sprite/razorbane.png',
            smogfang: 'images/sprite/smogfang.png',
            snatcher: 'images/sprite/snatcher.png'

        };

        this.images = {};

        //Load each image
        Object.keys(this.toLoad).forEach(key =>{
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false
            }
            img.onLoad = () =>{
                img.onLoad[key].isLoaded = true;
            }
        })
    }
}

export const resources = new Resources();