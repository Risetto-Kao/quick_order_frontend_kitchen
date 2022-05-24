import React, { useState, useEffect } from "react";

const Timer = ({ time }) => {
    let dateTime = new Date(time);
    let now = new Date();
    let diff = parseInt(Math.abs(dateTime - now) / 1000);

    const [seconds, setSeconds] = useState(diff);

    const showText = (numSecs) => {
        let hasHour = numSecs >= 3600;
        let secNum = parseInt(numSecs, 10);
        let hours = Math.floor(secNum / 3600).toString();
        let minutes = Math.floor((secNum - (hours * 3600)) / 60).toString();
        // let hours = Math.floor(secNum / 3600).toString().padStart(2, '0');
        // let minutes = Math.floor((secNum - (hours * 3600)) / 60).toString().padStart(2, '0');;
        // let seconds = (secNum - (hours * 3600) - (minutes * 60)).toString().padStart(2, '0');;
        // return hasHour ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
        return minutes;
    }

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            if (seconds > 0) setSeconds(seconds => seconds - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);

    return (
        <div>
            <span style={{ fontSize: '45px', fontWeight: 'bold', marginRight: '20px' }}>
                {showText(seconds)}
            </span>
            <span>
                分鐘
            </span>
        </div>
    );

};

export default Timer;