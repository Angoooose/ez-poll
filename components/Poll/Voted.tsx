import PollChoice from '../../Types/PollChoice';
import BarChart from '../common/BarChart/BarChart';
import optionColors from '../../utils/optionColors';

interface VotedProps {
    choices: PollChoice[],
    userChoice: number,
}

export default function Voted({ choices, userChoice }: VotedProps ) {
    if (choices.length === 0 || userChoice === undefined) return <div/>;
    return (
        <div className="bg-neutral-700 shadow-md rounded-md px-6 py-4 my-4 flex justify-between">
            <div className="flex flex-col justify-center items-center w-1/3">
                <h1 className="text-lg font-medium mb-2">Your vote:</h1>
                <div className={`w-full flex flex-col justify-center items-center py-5 rounded-md shadow-sm bg-gradient-to-r ${optionColors[userChoice]}`}>{choices[userChoice].name}</div>
            </div>
            <BarChart values={choices}/>
        </div>
    );
}