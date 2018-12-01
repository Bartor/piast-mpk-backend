class Accident {
    constructor(stopline, user, description) {
        this.stopline = stopline;
        this.time = Math.round(new Date()/1000);
        this.user = user;
        this.description = description;
    }
}

module.exports = Accident;