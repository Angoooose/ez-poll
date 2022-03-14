import { useEffect, useState } from 'react';
import { default as PollData } from '../../Types/Poll';
import { ClipboardListIcon, ClockIcon } from '@heroicons/react/outline';

import optionColors from '../../utils/optionColors';
import useTimeUntil from '../../hooks/useTimeUntil';
import useSocket from '../../hooks/useSocket';
import BarChart from '../common/BarChart/BarChart';

interface PollProps {
    pollId: string|undefined,
}

export default function Poll({ pollId }: PollProps) {
    const [timeUntil, setTimeUntil] = useTimeUntil();
    const [isChoiceOpaque, setIsChoiceOpaque] = useState<boolean[]>([]);
    const [pollData, setPollData] = useState<PollData>({
        id: '',
        ownerId: '',
        title: '',
        endsAt: 1,
        choices: [],
    });
    
    const socket = useSocket();

    useEffect(() => {
        if (pollId) {
            fetch(`/api/poll/get/?pollId=${pollId}`).then(res => res.json()).then((res) => {
                setPollData(res);
                setTimeUntil(res.endsAt);
                setIsChoiceOpaque(Array(res.choices.length).fill(false));
            });
        }
    }, [pollId]);

    useEffect(() => {
        if (socket && pollId) {
            socket.on(pollId, (msg: number) => {
                if (msg + 1 > pollData.choices.length) return;
                let newPollData: PollData = JSON.parse(JSON.stringify(pollData));
                newPollData.choices[msg].votes++;
                setPollData(newPollData);
            });
        }
    }, [socket, pollId]);

    const handleChoiceHover = (index: number) => {
        const newChoices = [...isChoiceOpaque];
        setIsChoiceOpaque(newChoices.map((c, i) => {
            if (i === index) {
                return false;
            } else {
                return true;
            }
        }));
    };

    const vote = (choiceIndex: number) => {
        if (!socket) return;
        socket.emit('newVote', {
            pollId,
            choiceIndex,
        });
    };

    return (
        <div className="px-4 max-w-3xl m-auto">
            <div className="bg-neutral-700 m-auto p-4 rounded-md flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-medium">{pollData.title}</h1>
                    {pollData.description && <div className="text-gray-400">{pollData.description}</div>}
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center text-gray-400">
                        <ClipboardListIcon className="w-5 text-green-400 mr-1"/>
                        {pollData.choices?.length} choices
                    </div>
                    <div className="flex items-center text-gray-400">
                        <ClockIcon className="w-5 text-cyan-400 mr-1"/>
                        {timeUntil}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                {pollData.choices.map((c, i) => {
                    return (
                        <div className={`bg-gradient-to-t py-10 my-4 mx-2 first:ml-0 last:mr-0 rounded-md shadow-sm flex flex-col justify-center items-center font-medium select-none cursor-pointer w-3/6 hover:w-5/6 transition-all ${isChoiceOpaque[i] ? 'opacity-50' : ''} ${optionColors[i]}`} onMouseOver={() => handleChoiceHover(i)} onMouseLeave={() => setIsChoiceOpaque(Array(pollData.choices.length).fill(false))} onClick={() => vote(i)}>
                            <div className="px-5 text-center">{c.name}</div>
                        </div>
                    );
                })}
            </div>
            <BarChart values={pollData.choices}></BarChart>
        </div>
    );
}