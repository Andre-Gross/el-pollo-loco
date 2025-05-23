class DrawableObject {
    endOfX;

    originalImgHeight;
    originalImgWidth;
    sizeFactor = 1;

    height;
    width;

    imgOffsetOriginal = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    };
    imgOffsetCanvas = {}

    img;
    imgCache = [];
    currentImage = 0;

    x;
    y;


    /**
     * Calculates the height of the object based on the original image height,
     * a global background height scaling factor, and the object's size factor.
     * 
     * @returns {number} The calculated height of the object.
     */
    calculateHeight() {
        return this.originalImgHeight * backgroundHeightFactor * this.sizeFactor
    }



    /**
     * Calculates the width of the object proportionally based on the object's height
     * and the original image dimensions to maintain aspect ratio.
     * 
     * @returns {number} The calculated width of the object.
     */    
    calculateWidth() {
        return this.originalImgWidth * this.height / this.originalImgHeight
    }


    /**
     * Draws the object's current image on the given canvas rendering context
     * at the object's current position with its current dimensions.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     */    
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }


    /**
     * Checks if this object is an instance of one of the types that
     * are drawn with frames (Character, Chicken, Endboss, ThrowableObject).
     * 
     * @returns {boolean} True if the object has a frame, otherwise false.
     */    
    isObjectWithFrame() {
        return this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject
    }


    /**
     * Loads a single image from the given path and caches it.
     * Sets the loaded image as the current image for this object.
     * 
     * @param {string} path - The file path or URL of the image to load.
     */    
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
        this.imgCache[path] = this.img;
    }


    /**
     * Loads multiple images from the given array of paths and caches them.
     * Does not change the current image of the object.
     * 
     * @param {string[]} arr - An array of file paths or URLs to images.
     */    
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }


    /**
     * Scales the original image offset values according to the current height factor,
     * which is the ratio of the object's current height to its original image height.
     * 
     * @returns {Object} The scaled image offsets with properties: left, top, right, bottom.
     */    
    scaleImgOffset() {
        const heightFactor =  this.height / this.originalImgHeight
        return {
            left: this.imgOffsetOriginal.left * heightFactor,
            top: this.imgOffsetOriginal.top * heightFactor,
            right: this.imgOffsetOriginal.right * heightFactor,
            bottom: this.imgOffsetOriginal.bottom * heightFactor
        };
    }


    /**
     * Sets the object's height and width by calculating them based on
     * original image dimensions and scaling factors.
     */    
    setSizes() {
        this.height = this.calculateHeight();
        this.width = this.calculateWidth();
    }
}