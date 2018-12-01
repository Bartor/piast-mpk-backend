class Inspection {
    constructor(stopline, user) {
        this.stopline = stopline;
        this.time = new Date().getTime();
        this.user = user;
    }
}

module.exports = Inspection;