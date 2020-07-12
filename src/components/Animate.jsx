import { useState, useEffect, useRef } from "react";

const AnimatedValue = ({ value }) => {
    const _isMounted = useRef();
    const [progressValue, setProgressValue] = useState(value);

    const animateValue = (start, end, duration) => {
        if (value) {
            var range = end - start;
            var current = start;
            var increment = end > start ? 1 : -1;
            var stepTime = Math.abs(Math.floor(duration / range));
            var timer = setInterval(function () {
                current += increment;
                if (current === end) {
                    clearInterval(timer);
                }
                _isMounted.current && setProgressValue(current);
            }, stepTime);
        }
    };

    useEffect(() => {
        _isMounted.current = true;
        return () => (_isMounted.current = false);
    }, []);

    useEffect(() => {
        if (value) {
            _isMounted.current && animateValue(0, value, 1000);
        } else {
            setProgressValue(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return progressValue
};

export default AnimatedValue;
