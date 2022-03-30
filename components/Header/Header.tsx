import github from '../../public/GitHub-Mark-Light-120px-plus.png';
import Image from 'next/image';
import Button from '../common/Button';
import Link from 'next/link';

interface HeaderProps {
    isAuthed: boolean,
}

export default function Header({ isAuthed }: HeaderProps) {
    const logout = async () => {
        await fetch('/api/auth/logout');
        window.location.reload();
    };

    return (
        <header className="bg-neutral-900 w-full mb-10 p-3 text-2xl font-bold shadow-md flex justify-between items-center">
            <Link href="/">
                <a>ez-poll</a>
            </Link>
            <div className="flex flex-row items-center">
                {isAuthed ? (
                    <div className="flex flex-row items-center">
                        <Link href="/create">
                            <a><Button>New Poll</Button></a>
                        </Link>
                        <Button color="danger" sideMargin={true} onClick={logout}>Logout</Button>
                    </div>
                ) : null}
                <a className="h-8" href="https://github.com/Angoooose" target="_blank">
                    <Image src={github} width={32} height={32}/>
                </a>
            </div>
        </header>
    );
}