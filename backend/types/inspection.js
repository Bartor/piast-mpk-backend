class Inspection {
    constructor(stopline, user) {
        this.stopline = stopline;
        this.time = Math.round(new Date()/1000);
        this.user = user;
    }
}

module.exports = Inspection;