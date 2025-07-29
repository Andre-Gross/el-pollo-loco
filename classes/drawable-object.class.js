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

    img;
    imgCache = {};
    currentImage = 0;

    x;
    y;


    /**
     * Calculates the height of the object based on a given base height,
     * the global background scaling factor, and the object's size factor.
     * Child classes can override the base height by passing a parameter.
     * 
     * @param {number} [height=this.originalImgHeight] - Base height to calculate from.
     * @returns {number} The calculated height.
     */
    calculateHeight(height = this.originalImgHeight) {
        return height * backgroundHeightFactor * this.sizeFactor
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
     * Indicates whether the object uses animation frames to display a hitbox.
     * 
     * Returns `false` by default. Should be overridden in subclasses where 
     * frame-based hitbox rendering is used.
     * 
     * @returns {boolean} `true` if the object displays a hitbox using animation frames, otherwise `false`.
     */
    isObjectWithFrame() {
        return false
    }


    /**
     * Loads a single image from the given path and caches it.
     * Sets the loaded image as the current image for this object.
     * 
     * @param {string} path - The file path or URL of the image to load.
     */
    loadImage(path) {
        if (!path) {
            console.warn(
                `loadImage called with invalid path: "${path}" in instance of ${this.constructor.name}`,
                this,
                new Error().stack // zeigt dir den Stacktrace
            );
            return;
        }
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
        const heightFactor = this.height / this.originalImgHeight
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