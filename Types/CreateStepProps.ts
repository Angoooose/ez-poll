import Poll from './Poll';
import { Dispatch } from 'react';

export default interface CreateStepProps {
    pollData: Poll,
    setpollData: Dispatch<Poll>,
}