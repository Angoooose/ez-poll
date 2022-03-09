import github from '../../public/GitHub-Mark-Light-120px-plus.png';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="bg-neutral-900 w-full mb-10 p-3 text-2xl font-bold shadow-md flex justify-between items-center">
            todo
            <a className="h-8" href="https://github.com/Angoooose" target="_blank">
                <Image src={github} width={32} height={32}/>
            </a>
        </header>
    );
}