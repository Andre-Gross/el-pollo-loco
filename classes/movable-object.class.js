class MovableObject {
    x = 120;
    y = 160;
    height = 150;
    width = 50;

    img;
    imgCache = [];
    currentImage = 0;

    speed;

    otherDirection = false;
    

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


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++
    }


    moveLeft() {
        setInterval(() => {
            this.x = this.x - this.speed
        }, 1000 / maxFPS);
    }


    moveRight() {
        console.log('Moving right');
    }
}