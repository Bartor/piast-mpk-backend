class Accident {
    constructor(stopline, direction, user, description) {
        this.stopline = stopline;
        this.direction = direction;
        this.time = Math.round(new Date()/1000);
        this.user = user;
        this.description = description;
    }
}

module.exports = Accident;