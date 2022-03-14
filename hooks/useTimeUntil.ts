import { Dispatch, useEffect, useState } from 'react';

export default function useTimeUntil(date?: number): [string|undefined, Dispatch<number>] {
    const [dateState, setDateState] = useState<number|undefined>(date);
    const [timeUntil, setTimeUntil] = useState<string>('...');

    useEffect(() => {
        if (!date && !dateState) return;
        setTimeUntil(getTimeUntil(dateState as number));
        setInterval(() => setTimeUntil(getTimeUntil(dateState as number)), 5000);
    }, [dateState]);

    return [timeUntil, setDateState];
}

function getTimeUntil(date: number): string {
    const untilDate = new Date(date);
    const currentDate = new Date();

    const timeBetween = untilDate.getTime() - currentDate.getTime();
    const minutes = Math.floor(timeBetween / 60000);
    const hours = Math.floor(minutes / 60);

    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'}`;
    return `${hours} hour${hours === 1 ? '' : 's'}`;
}