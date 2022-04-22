import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import SocketContext from '../../contexts/SocketContext';
import Poll from '../../Types/Poll';
import PollCard from './PollCard';

interface HomeProps {
    userId: string,
}

export default function Home({ userId }: HomeProps) {
    const [polls, setPolls] = useState<Poll[]>([]);
    const pollsRef = useRef<Poll[]>([]);
    const updatePolls = (newPolls: Poll[]) => {
        pollsRef.current = newPolls;
        setPolls(newPolls);
    };

    const socket = useContext(SocketContext);

    socket.on(`userUpdate-${userId}`, (poll: Poll) => {
        let newPolls = [...pollsRef.current];
        const pollIndex = newPolls.findIndex(p => p.id === poll.id);
        if (pollIndex >= 0) {
            newPolls[pollIndex].choices = poll.choices;
        } else {
            newPolls.push(poll);
        }

        updatePolls(newPolls);
    });

    useEffect(() => {
        fetch(`/api/poll/user?userId=${userId}`).then(res => res.json()).then((res: Poll[]) => {
            updatePolls(res);
        });
    }, [userId]);

    const removePoll = (index: number) => {
        let newPolls = [...pollsRef.current];
        newPolls.splice(index, 1);
        updatePolls(newPolls);
    };

    return (
        <div className="text-center px-10 pb-10">
            <h1 className="text-3xl font-medium">Your Polls</h1>
            <div className="mt-2 flex flex-row justify-center flex-wrap">
                {polls.length > 0 ? (
                    polls.sort(p => p.endsAt > new Date().getTime() ? -1 : 1).map((p, i) => <PollCard poll={p} removePoll={() => removePoll(i)} key={p.id}/>)
                ) : (
                    <div className="text-gray-400">
                        No polls created.
                        <Link href="/create">
                            <a className="ml-1 text-cyan-400 font-medium cursor-pointer hover:underline">
                                Create one?
                            </a>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}