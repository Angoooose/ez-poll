import { useEffect, useState } from 'react';
import PollChoice from '../../../Types/PollChoice';
 
interface BarProps {
    values: PollChoice[],
    index: number,
}

const colors: string[] = [
    'from-cyan-500 to-cyan-700',
    'from-green-500 to-green-700',
    'from-red-500 to-red-700',
    'from-purple-500 to-purple-700'
];

export default function Bar({ values, index }: BarProps) {
    const sortedValues = [...values].sort((a, b) => b.votes - a.votes);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        let a = values[index].votes * 100;
        let b = a / sortedValues[0].votes;
        setHeight(b);
    }, [values]);

    return (
        <div className="h-full text-center mx-2 flex flex-col items-center justify-end">
            <div className={`h-full bg-gradient-to-t shadow-md rounded-md w-8 transition-all ${colors[index]}`} style={{ height: `${height}%` }}>
                <div className="-mt-6" >{values[index].votes}</div>
            </div>
            <div className={`whitespace-nowrap mt-2 ${values[index].votes === sortedValues[0].votes ? 'text-yellow-200' : ''}`}>{values[index].name}</div>
        </div>
    );
}