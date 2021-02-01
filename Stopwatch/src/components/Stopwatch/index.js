import React, {useState, useEffect} from 'react';

import { interval, Subject, fromEvent } from "rxjs";
import { takeUntil, buffer, throttleTime, filter } from "rxjs/operators";

import './styles.scss';

const Stopwatch = () => {
    const [sec, setSec] = useState(0);
    const [status, setStatus] = useState(false);

    useEffect( () => {
        const unsubscribe$ = new Subject();
        interval(1000)
            .pipe(takeUntil(unsubscribe$))
            .subscribe( () => {
                if (status) {
                    setSec( value => value + 1000)
                }
            })
        return () => {
            unsubscribe$.next();
            unsubscribe$.complete();
        }
    }, [status]);

    useEffect( () => {
        const waitBtn = document.querySelector('.wait-btn');
        let clicks$ = fromEvent(waitBtn, 'click');

        clicks$
            .pipe(
                buffer(clicks$.pipe(throttleTime(300))),
                filter(clickArray => clickArray.length === 2)
            )
            .subscribe( () => {
                setStatus(!status);
            })
    }, [status])

    const start = () => {
        setStatus(!status)
    }

    const stop = () => {
        setStatus(!status)
        setSec(0)
    }

    const reset = () => {
        setSec(0)
    }

    return (
        <div className='container'>
            <span> {new Date(sec).toISOString().slice(11, 19)}</span>
            <div className='buttons-container'>
                {status
                    ? <button onClick={stop}>Stop</button>
                    : <button onClick={start}>Start</button>
                }
                <button onClick={reset}>Reset</button>
                <button className='wait-btn' >Wait</button>
            </div>
        </div>
    )
}

export default Stopwatch;