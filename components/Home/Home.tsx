import Poll from '../../Types/Poll';
import PollCard from './PollCard';

export default function Home() {
    const demoPoll: Poll = {
        id: 'gan2ba2A',
        ownerId: 'va4s2a',
        title: 'Star Wars Poll',
        description: 'What\'s your favorite Star Wars trilogy? Answer below!',
        endsAt: 1647159820514,
        choices: [
            {
                name: '1st Trilogy',
                votes: 4,
            },
            {
                name: '2nd Trilogy',
                votes: 2,
            },
            {
                name: '3rd Trilogy',
                votes: 1,
            },
            {
                name: '4th Trilogy?',
                votes: 6,
            },
        ],
    }

    return (
        <div className="text-center px-10">
            <h1 className="text-3xl font-medium">Active Polls</h1>
            <div className="mt-2 flex flex-row justify-center flex-wrap">
                <PollCard poll={demoPoll}/>
                <PollCard poll={demoPoll}/>
            </div>
        </div>
    );
}