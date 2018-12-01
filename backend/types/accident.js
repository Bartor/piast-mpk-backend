class Accident {
    constructor(stopline, user, description) {
        this.stopline = stopline;
        this.time = new Date().getTime();
        this.user = user;
        this.description = description;
    }
}

module.exports = Accident;