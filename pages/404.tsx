import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="flex flex-col items-center text-center m-auto max-w-xs">
            <div className="text-5xl font-bold">404</div>
            <hr className="w-full my-2 border-neutral-500 opacity-75"/>
            <div className="text-gray-400 mt-1">
                {'We couldn\'t find the page you were looking for.'}
                <span className="text-cyan-400 cursor-pointer hover:underline ml-1">
                    <Link href="/">
                        <a>Return home?</a>
                    </Link>
                </span>
            </div>
        </div>
    );
}