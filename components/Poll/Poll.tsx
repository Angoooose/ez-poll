import { useEffect, useState, useRef, useContext } from 'react';
import { ClockIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';

import useTimeUntil from '../../hooks/useTimeUntil';
import useLocalStorage from '../../hooks/useLocalStorage';
import SocketContext from '../../contexts/SocketContext';
import optionColors from '../../utils/optionColors';

import VoteData from '../../Types/VoteData';
import { default as PollData } from '../../Types/Poll';
import PollChoice from '../../Types/PollChoice';

import Voted from './Voted';
import Closed from './Closed';
import NotFound from './NotFound';

import Head from 'next/head';

interface PollProps {
    pollId: string|undefined,
}

export default function Poll({ pollId }: PollProps) {
    const [timeUntil, setTimeUntil] = useTimeUntil();
    const [isChoiceOpaque, setIsChoiceOpaque] = useState<boolean[]>([]);
    const [isNotFound, setIsNotFound] = useState<boolean>(false);
    const [pollData, setPollData] = useState<PollData>({
        id: '',
        ownerId: '',
        title: '',
        endsAt: 1,
        choices: [],
    });
    
    const socket = useContext(SocketContext);
    const [isSocketListening, setIsSocketListening] = useState<boolean>(false);

    const choices = useRef<PollChoice[]>([]);
    const updateChoices = (newChoices: PollChoice[], updatePollData?: boolean) => {
        choices.current = newChoices
        if (updatePollData) setPollData({
            ...pollData,
            choices: [...newChoices],
        });
    };

    const [voteData, setVoteData] = useLocalStorage<VoteData[]>('voteData', []);
    const toastRef = useRef<string|null>();

    useEffect(() => {
        if (pollId) {
            fetch(`/api/poll/get/?pollId=${pollId}`).then(r => {
                console.log(r.status);
                if (r.status === 404) {
                    setIsNotFound(true);
                    return false;
                } else {
                    return r.json();
                }
            }).then((res) => {
                if (res === false) return;
                setPollData(res);
                updateChoices(res.choices);
                setTimeUntil(res.endsAt);
                setIsChoiceOpaque(Array(res.choices.length).fill(false));
            });
        }
    }, [pollId]);

    useEffect(() => {
        if (!isNotFound && socket && pollId && pollData.choices.length > 0 && !isSocketListening) {
            setIsSocketListening(true);
            socket.on(pollId, (msg: number) => {
                let newChoices = [...choices.current];
                newChoices[msg].votes++;
                updateChoices(newChoices, true);

                if (toastRef.current) {
                    toast.success('Vote Casted', {
                        id: toastRef.current,
                    });

                    toastRef.current = null;
                }
            });
        }
    }, [pollId, pollData]);

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
        if (!socket || !voteData) return;
        let newVoteData = [...voteData];
        newVoteData.push({ id: pollId as string, choiceIndex });
        setVoteData(newVoteData);
        toastRef.current = toast.loading('Casting Vote');
        socket.emit('newVote', {
            pollId,
            choiceIndex,
        });
    };

    if (isNotFound) return <NotFound/>

    return (
        <div className="px-4 max-w-3xl m-auto">
            {pollData.title && <Head><title>ez-poll: {pollData.title}</title></Head>}
            <div className="bg-neutral-700 m-auto p-4 rounded-md flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-medium">{pollData.title}</h1>
                    {pollData.description && <div className="text-gray-400">{pollData.description}</div>}
                </div>
                <div className="flex flex-col items-end">
                    {pollData.endsAt < new Date().getTime() ? (
                        <div className="flex items-center text-gray-400">
                            <LockClosedIcon className="w-5 text-red-400 mr-1"/>
                            Closed
                        </div>
                    ) : (
                        <div className="flex items-center text-gray-400">
                            <LockOpenIcon className="w-5 text-green-400 mr-1"/>
                            Open
                        </div>
                    )}
                    <div className="flex items-center text-gray-400">
                        <ClockIcon className="w-5 text-cyan-400 mr-1"/>
                        {timeUntil}
                    </div>
                </div>
            </div>
            {pollData.endsAt < new Date().getTime() || voteData && voteData.some(p => p.id === pollId) ? (
                voteData && voteData.some(p => p.id === pollId) ? (
                    <Voted choices={pollData.choices} userChoice={voteData.find(p => p.id === pollId)?.choiceIndex as number}/>
                ) : (
                    <Closed choices={pollData.choices}/>
                )
            ) : (
                <div className="flex items-center justify-center">
                    {pollData.choices.map((c, i) => {
                        return (
                            <div className={`bg-gradient-to-t py-10 my-4 mx-2 first:ml-0 last:mr-0 rounded-md shadow-sm flex flex-col justify-center items-center font-medium select-none cursor-pointer w-3/6 hover:w-5/6 transition-all ${isChoiceOpaque[i] ? 'opacity-50' : ''} ${optionColors[i]}`} onMouseOver={() => handleChoiceHover(i)} onMouseLeave={() => setIsChoiceOpaque(Array(pollData.choices.length).fill(false))} onClick={() => vote(i)}>
                                <div className="px-5 text-center">{c.name}</div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}