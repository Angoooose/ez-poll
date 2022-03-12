import PollChoice from './PollChoice';

export default interface Poll {
    id: string,
    ownerId: string,
    title: string,
    description: string,
    endsAt: number,
    choices: PollChoice[],
}