import { DuplicateIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';
import Finalize from './Finalize';
import SettingsCard from './SettingsCard';
import Poll from '../../Types/Poll';

interface SuccessProps {
    pollData: Poll,
}

export default function Success({ pollData }: SuccessProps) {
    const copyPollLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/poll/${pollData.id}`);
        toast.success('Copied Link', {
            position: 'bottom-center',
            style: {
                backgroundColor: '#404040',
                borderRadius: '20px',
                color: 'white',
            }
        });
    };

    return (
        <div>
            <div className="text-center bg-green-400 p-4 rounded-md">
                <h1 className="font-medium text-2xl">Poll Created!</h1>
                <div></div>
            </div>
            <Finalize pollData={pollData}/>
            <SettingsCard>
                <div className="flex justify-between items-center flex-wrap">
                    <h1 className="font-medium text-xl mb-1 mr-4">Share your poll!</h1>
                    <div onClick={copyPollLink} className="bg-neutral-600 hover:bg-neutral-800 text-gray-300 w-fit p-2 rounded-md shadow-sm flex items-center cursor-pointer transition-all select-none">
                        <DuplicateIcon className="w-6 mr-1 text-cyan-500"/>
                       {`${window.location.origin}/poll/${pollData.id}`}
                    </div>
                </div>
            </SettingsCard>
        </div>
    );
}