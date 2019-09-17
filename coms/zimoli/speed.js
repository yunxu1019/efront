function speed(time_splitter = 1) {
    var lastmoveTime = new Date, speed = 0;
    return function (deltay) {
        if (arguments.length) {
            var now = new Date;
            var deltat = now - lastmoveTime;
            if (deltat) {
                lastmoveTime = now;
                if (deltay) speed = speed ? (speed + deltay * time_splitter / deltat) / 2 : deltay * time_splitter / deltat;
                else if (deltay === 0) speed = 0;
            }
        }
        return speed;
    };
}