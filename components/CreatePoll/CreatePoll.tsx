import { ChartBarIcon, CogIcon, CheckIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import Stepper, { StepData } from './Stepper';
import Button from '../common/Button';
import PollOptions from './PollOptions';
import AdditionalSettings from './AdditionalSettings';
import Finalize from './Finalize';
import Success from './Success';
import Poll from '../../Types/Poll';
import toast from 'react-hot-toast';

const steps: StepData[] = [
    {
        name: 'Poll Options',
        Icon: ChartBarIcon,
    },
    {
        name: 'Additonal Settings',
        Icon: CogIcon,
    },
    {
        name: 'Finalize',
        Icon: CheckIcon,
    }
];

interface CreatePollProps {
    userId: string,
}

export default function CreatePoll({ userId }: CreatePollProps) {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [pollData, setpollData] = useState<Poll>({
        id: '',
        ownerId: userId,
        title: '',
        description: '',
        endsAt: 24,
        choices: [
            {
                name: '',
                votes: 0,
            },
            {
                name: '',
                votes: 0,
            },
        ]
    });

    useEffect(() => {
        if (pollData.title !== '' && pollData.choices?.length >= 2 && pollData.choices?.every(c => c.name !== '')) {
            setIsNextDisabled(false);
        } else {
            setIsNextDisabled(true);
        }
    }, [pollData]);

    const nextStep = async () => {
        if (currentStep === 2) {
            let databasePollData: Poll = JSON.parse(JSON.stringify(pollData));
            databasePollData.endsAt = new Date().getTime() + databasePollData.endsAt * 3.6e+6;

            toast.promise(
                fetch('/api/poll/create', {
                    method: 'POST',
                    body: JSON.stringify({
                        ...databasePollData
                    }),
                }).then(res => res.json()).then((res) => {
                    let updatedPollData: Poll = JSON.parse(JSON.stringify(pollData));
                    updatedPollData.id = res.pollId;
                    setpollData(updatedPollData);
                    setIsComplete(true);
                }), {
                    loading: 'Creating Poll',
                    success: 'Poll Created',
                    error: 'Failed to create poll',
                }
            );
        } else {
            let newCurrentStep = currentStep;
            newCurrentStep++;
            setCurrentStep(newCurrentStep);
        }
    };

    const previousStep = () => {
        let newCurrentStep = currentStep;
        newCurrentStep--;
        setCurrentStep(newCurrentStep);
    };

    return (
        <div className="max-w-3xl m-auto px-4">
            {isComplete ? (
                <Success pollData={pollData}/>
            ) : (
                <div>
                    <Stepper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} isNextDisabled={isNextDisabled}/>
                    {currentStep === 0 && <PollOptions pollData={pollData} setpollData={setpollData}/>}
                    {currentStep === 1 && <AdditionalSettings pollData={pollData} setpollData={setpollData}/>}
                    {currentStep === 2 && <Finalize pollData={pollData}/>}
                    <div className="flex flex-row items-center justify-end mt-4">
                        <Button color="secondary" sideMargin={true} disabled={currentStep === 0} onClick={previousStep}>Previous</Button>
                        <Button onClick={nextStep} disabled={isNextDisabled}>{currentStep < 2 ? 'Next' : 'Create Poll'}</Button>
                    </div>
                </div>
            )}
        </div>
    );
}