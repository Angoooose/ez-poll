import CreateStepProps from '../../Types/CreateStepProps';
import SettingsCard from './SettingsCard';
import Poll from '../../Types/Poll';

export default function AdditionalSettings({ pollData, setpollData }: CreateStepProps) {
    const updateTime = (value: string) => {
        let updatedPollData: Poll = JSON.parse(JSON.stringify(pollData));
        updatedPollData.endsAt = parseInt(value);
        setpollData(updatedPollData);
    };

    return (
        <SettingsCard>
            <h1 className="font-medium text-lg mb-2">Additional Settings</h1>
            <div className="text-gray-400 mb-1">Poll Length</div>
            <select className="bg-neutral-600 px-1 py-2 shadow-sm rounded-md outline-none cursor-pointer transition-all border-2 border-neutral-600 focus:border-cyan-500" value={pollData.endsAt} onChange={(e) => updateTime(e.target.value)}>
                <option value={1}>1 hour</option>
                <option value={6}>6 hours</option>
                <option value={12}>12 hours</option>
                <option value={24}>24 hours</option>
            </select>
        </SettingsCard>
    );
}