class MovableObject {
    x = 120;
    y = 160;
    img;
    height = 150;
    width = 50;
    imgCache = [];


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }


    moveRight() {
        console.log('Moving right');
    }
}