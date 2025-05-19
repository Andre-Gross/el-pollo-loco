class Enemy extends MovableObject {
    
    init(endOfX = this.endOfX) {
        this.health = this.standartHealth;
        this.x = this.randomizeSpwanX(endOfX);
    }
}