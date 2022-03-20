import { useEffect, useState } from 'react';
import PollChoice from '../../../Types/PollChoice';
import { StarIcon } from '@heroicons/react/solid';
 
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
            <div className={`bg-gradient-to-t shadow-md rounded-md w-8 transition-all flex flex-col items-center ${colors[index]}`} style={{ height: `calc(${height}% - 25px)` }}>
                <div className="-mt-6 text-gray-400" >{values[index].votes}</div>
                {values[index].votes === sortedValues[0].votes && values.every(v => v.votes !== 0) && <StarIcon className="w-5 mt-2 text-yellow-300"/>}
            </div>
            <div className={`mt-2 w-16 whitespace-nowrap overflow-y-clip overflow-x-hidden text-ellipsis i ${values[index].votes === sortedValues[0].votes && values.every(v => v.votes !== 0) ? 'text-yellow-200 font-medium' : ''}`}>{values[index].name}</div>
        </div>
    );
}