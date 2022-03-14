import BarChart from '../common/BarChart/BarChart';
import Card from '../common/Card';
import Link from 'next/link';
import Poll from '../../Types/Poll';

import { ClockIcon, ClipboardCheckIcon } from '@heroicons/react/outline';
import { FunctionComponent } from 'react';

import useTimeUntil from '../../hooks/useTimeUntil';

interface PollCardProps {
    poll: Poll,
}

export default function PollCard({ poll }: PollCardProps) {
    const [timeUntil] = useTimeUntil(poll.endsAt);

    return (
        <Link href={`/poll/${poll.id}`}>
            <a>
                <Card maxWidth="sm" hover={true}>
                    <h2 className="text-lg font-medium">{poll.title}</h2>
                    <div className="text-gray-400">{poll.description}</div>
                    <BarChart values={poll.choices}/>
                    <div className="flex flex-row justify-center items-center">
                        <PollBadge><ClockIcon className="w-5 text-cyan-500 mr-1"/>{timeUntil}</PollBadge>
                        <PollBadge><ClipboardCheckIcon className="w-5 text-green-500 mr-1"/>{poll.choices.map(c => c.votes).reduce((a, b) => a + b)} votes</PollBadge>
                    </div>
                </Card>
            </a>
        </Link>
    );  
}

const PollBadge: FunctionComponent = ({ children }) => {
    return <div className="bg-neutral-900 flex flex-row justify-center items-center whitespace-nowrap text-gray-400 py-0.5 px-1.5 shadow-md rounded-md mx-1">{children}</div>;
}