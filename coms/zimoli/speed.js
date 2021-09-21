function speed(time_splitter = 1) {
    var lastmoveTime = new Date, speed = 0;
    return function (deltay) {
        var now = new Date;
        var deltat = now - lastmoveTime;
        if (arguments.length) {
            if (deltat) {
                lastmoveTime = now;
                if (deltay) speed = speed ? (speed + deltay * time_splitter / deltat) / 2 : deltay * time_splitter / deltat;
                else if (deltay === 0) speed = 0;
            }
        } else if (deltat > 120) {
            speed = 0;
        }
        return speed;
    };
}