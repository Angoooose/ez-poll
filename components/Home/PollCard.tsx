import BarChart from '../common/BarChart/BarChart';
import Card from '../common/Card';
import PollButton from './PollButton';
import Link from 'next/link';
import Poll from '../../Types/Poll';
import toast from 'react-hot-toast';

import { ClockIcon, ClipboardCheckIcon, ExternalLinkIcon, ClipboardCopyIcon, TrashIcon, LockOpenIcon, LockClosedIcon } from '@heroicons/react/outline';
import { FunctionComponent, useEffect, useState } from 'react';

import useTimeUntil from '../../hooks/useTimeUntil';

interface PollCardProps {
    poll: Poll,
    removePoll: () => void,
}

export default function PollCard({ poll, removePoll }: PollCardProps) {
    const [timeUntil, setTimeUntil] = useTimeUntil(poll.endsAt);
    const [isDeleteConfirmation, setIsDeleteConfirmation] = useState<boolean>(false);
    const [isDeleteDisabled, setIsDeleteDisabled] = useState<boolean>(false);

    useEffect(() => {
        setTimeUntil(poll.endsAt);
        setIsDeleteConfirmation(false);
        setIsDeleteDisabled(false);
    }, [poll]);

    const copyPollLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/poll/${poll.id}`);
        toast.success('Copied Link');
    };

    const deletePoll = () => {
        if (isDeleteConfirmation && !isDeleteDisabled) {
            setIsDeleteDisabled(true);
            toast.promise(
                fetch('/api/poll/delete', {
                    method: 'DELETE',
                    body: JSON.stringify({
                        pollId: poll.id,
                    }),
                }).then(r => r.json()).then((res) => {
                    removePoll();
                }), {
                    loading: 'Deleting Poll',
                    success: 'Poll Deleted',
                    error: 'Failed to delete poll',
                }
            );
        } else {
            setIsDeleteConfirmation(true);
        }
    };

    return (
        <Card maxWidth="sm" className="flex flex-col justify-between">
            <h2 className="text-lg font-medium">{poll.title}</h2>
            <div className="text-gray-400">{poll.description}</div>
            <BarChart values={poll.choices}/>
            <div className="flex flex-row flex-wrap justify-center items-center mb-2">
                {poll.endsAt <= new Date().getTime() ? (
                    <PollBadge><LockClosedIcon className="w-5 text-teal-600 mr-1"/>Closed</PollBadge>
                ) : (
                    <PollBadge><LockOpenIcon className="w-5 text-teal-400 mr-1"/>Open</PollBadge>
                )}
                <PollBadge><ClockIcon className="w-5 text-cyan-500 mr-1"/>{timeUntil}</PollBadge>
                <PollBadge><ClipboardCheckIcon className="w-5 text-green-500 mr-1"/>{poll.choices.map(c => c.votes).reduce((a, b) => a + b)} votes</PollBadge>
            </div>
            <div className="flex items-center justify-center py-1 px-2 bg-neutral-900 rounded-md bg-opacity-80">
                <div className="mx-1">
                    <Link href={`/poll/${poll.id}`}>
                        <a target="_blank">
                            <PollButton>
                                <ExternalLinkIcon className="w-5 py-0.5"/>
                            </PollButton>
                        </a>
                    </Link>
                </div>
                <div className="mx-1">
                    <PollButton onClick={copyPollLink}>
                        <ClipboardCopyIcon className="w-5 py-0.5"/>
                    </PollButton>
                </div>
                <div className="mx-1">
                    <PollButton color="danger" onClick={deletePoll} disabled={isDeleteDisabled}>
                        {isDeleteConfirmation ? (
                            <div>Delete forever?</div>
                        ) : (
                            <TrashIcon className="w-5 py-0.5"/>
                        )}
                    </PollButton>
                </div>
            </div>
    </Card>
    );  
}

const PollBadge: FunctionComponent = ({ children }) => {
    return <div className="bg-neutral-900 flex flex-row justify-center items-center whitespace-nowrap text-gray-400 py-0.5 px-1.5 shadow-md rounded-md mt-2 mx-1">{children}</div>;
}