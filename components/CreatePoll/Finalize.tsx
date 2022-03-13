import { ClipboardListIcon, ClockIcon } from '@heroicons/react/outline';
import optionColors from '../../utils/optionColors';
import SettingsCard from './SettingsCard';
import Poll from '../../Types/Poll';

interface FinalizeProps {
    pollData: Poll,
}

export default function Finalize({ pollData }: FinalizeProps) {
    return (
        <SettingsCard>
            <div className="flex justify-between">
                <div className="mr-6">
                    <h1 className="text-lg font-medium">{pollData.title}</h1>
                    {pollData.description && <div className="text-gray-400 mb-2">{pollData.description}</div>}
                    <div className="flex items-center text-gray-400">
                        <ClipboardListIcon className="w-5 text-green-400 mr-1"/>
                        {pollData.choices?.length} choices
                    </div>
                    <div className="flex items-center text-gray-400">
                        <ClockIcon className="w-5 text-cyan-400 mr-1"/>
                        {pollData.endsAt} hour{!pollData.endsAt || pollData.endsAt > 1 ? 's' : ''}
                    </div>
                </div>
                <div className="flex flex-grow flex-wrap max-w-md">
                    {pollData.choices?.map((c, i) => {
                        return <div className={`bg-gradient-to-l p-2 m-2 rounded-md flex flex-col justify-center text-center flex-grow basis-0 ${optionColors[i]}`}>{c.name}</div>;
                    })}
                </div>
            </div>
        </SettingsCard>
    );
}