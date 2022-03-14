import Poll from '../../components/Poll/Poll';
import { useRouter } from 'next/router'

export default function poll() {
    const router = useRouter();
    const { poll } = router.query;

    return (
        <Poll pollId={poll as string}/>
    );  
}