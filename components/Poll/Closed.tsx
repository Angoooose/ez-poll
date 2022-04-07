import PollChoice from '../../Types/PollChoice';
import BarChart from '../common/BarChart/BarChart';

interface ClosedProps {
    choices: PollChoice[],
}

export default function Closed({ choices }: ClosedProps) {
    if (choices.length === 0) return <div/>;
    return (
        <div className="bg-neutral-700 shadow-md rounded-md px-6 py-4 my-4 flex flex-col justify-between items-center">
            <span className="text-gray-400 mx-2 max-w-xs- text-center">This poll has been closed. No more votes can be submitted.</span>
            <BarChart values={choices}/>
        </div>
    );
}