import { ComponentType, ComponentProps, Dispatch } from 'react';

export interface StepData {
    name: string,
    Icon: ComponentType<ComponentProps<'svg'>>,
}

interface StepperProps {
    steps: StepData[],
    currentStep: number,
    setCurrentStep: Dispatch<number>,
    isNextDisabled: boolean,
}

export default function Stepper({ steps, currentStep, setCurrentStep, isNextDisabled }: StepperProps) {
    return (
        <div className="flex flex-row justify-between items-center max-w-2xl m-auto pb-2">
            {steps.map((step, i) => <Step isCurrent={i === currentStep} isDisabled={isNextDisabled && i > currentStep} index={i} setCurrentStep={setCurrentStep} key={i} {...step}></Step> )}
        </div>
    );
}

interface StepProps extends StepData {
    isCurrent: boolean,
    isDisabled: boolean,
    index: number,
    setCurrentStep: Dispatch<number>,
}

function Step({ Icon, name, isCurrent, isDisabled, index, setCurrentStep }: StepProps) {
    const handleClick = () => {
        if (isDisabled) return;
        setCurrentStep(index);
    };
    
    return (
        <div className={`flex flex-col justify-center items-center transition-all select-none ${!isCurrent ? 'text-gray-400 opacity-75' : 'text-cyan-500'} ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={handleClick}>
            <div className={`rounded-full border-2 border-cyan-500 p-4 w-fit ${isCurrent ? 'bg-cyan-500 bg-opacity-20' : ''}`}>
                <Icon className="w-6"/>
            </div>
            <div className="mt-2">{name}</div>
        </div>
    );
}