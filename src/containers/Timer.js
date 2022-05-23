import React, { useState, useEffect } from "react";

const Timer = ({ time }) => {
    let dateTime = new Date(time);
    let now = new Date();
    let diff = parseInt(Math.abs(now - dateTime) / 1000);

    const [seconds, setSeconds] = useState(diff);

    const showText = (numSecs) => {
        let hasHour = numSecs >= 3600;
        let secNum = parseInt(numSecs, 10);
        let hours = Math.floor(secNum / 3600).toString().padStart(2, '0');
        let minutes = Math.floor((secNum - (hours * 3600)) / 60).toString().padStart(2, '0');;
        let seconds = (secNum - (hours * 3600) - (minutes * 60)).toString().padStart(2, '0');;
        return hasHour ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
    }

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);

    return (
        <div className="app">
            <div className="time">
                {showText(seconds)}
            </div>
        </div>
    );
};


export default Timer;