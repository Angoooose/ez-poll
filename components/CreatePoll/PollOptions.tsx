import { TrashIcon } from '@heroicons/react/outline';
import Button from '../common/Button';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import SettingsCard from './SettingsCard';
import CreateStepProps from '../../Types/CreateStepProps';
import Poll from '../../Types/Poll';

export default function PollOptions({ pollData, setpollData}: CreateStepProps) {
    const updatePollInfo = (value: 'title'|'description', newValue: string) => {
        let updatedPollData: Poll = JSON.parse(JSON.stringify(pollData));
        updatedPollData[value] = newValue;
        setpollData(updatedPollData);
    };

    const addChoice = () => {
        let updatedPollData: Poll = JSON.parse(JSON.stringify(pollData));
        updatedPollData.choices.push({
            name: '',
            votes: 0,
        });

        setpollData(updatedPollData);
    };

    const removeChoice = (index: number) => {
        let updatedPollData: Poll = JSON.parse(JSON.stringify(pollData));
        updatedPollData.choices.splice(index, 1);
        setpollData(updatedPollData);
    };

    const updateChoice = (value: string, index: number) => {
        let updatedPollData: Poll = JSON.parse(JSON.stringify(pollData));
        updatedPollData.choices[index].name = value;
        setpollData(updatedPollData);
    };

    return (
        <div>
            <SettingsCard>
                <h1 className="font-medium text-lg">Poll Info</h1>
                <Input placeholder="Poll Title" value={pollData.title} onChange={(e) => updatePollInfo('title', e.target.value)}/>
                <TextArea placeholder="Poll Description (Optional)" value={pollData.description} onChange={(e) => updatePollInfo('description', e.target.value)}/>
            </SettingsCard>
            <SettingsCard>
                <h1 className="font-medium text-lg">Poll Choices</h1>
                <div className="text-gray-400 mb-1">You are allowed a maximum of 5 poll choices.</div>
                {pollData.choices?.map((c, i) => {
                    const input = <Input placeholder={`Poll Choice #${i + 1}`} value={c.name} onChange={(e) => updateChoice(e.target.value, i)}/>;
                    if (i < 2) return input;
                    return (
                        <div className="flex flex-row w-full items-center" key={i}>
                            {input}
                            <div className="ml-2"><Button color="danger" onClick={() => removeChoice(i)}><TrashIcon className="w-5 py-0.5"/></Button></div>
                        </div>
                    );
                })}
                <Button fullWidth={true} onClick={addChoice} disabled={pollData.choices?.length === 5}>Add Choice</Button>
            </SettingsCard>
        </div>
    );
}