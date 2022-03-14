import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="text-center">
            <div className="text-8xl font-medium -mt-2">404</div>
            <div className="text-gray-400 mt-2">
                We couldn't find the page you were looking for.
                <div className="text-cyan-400 cursor-pointer hover:underline">
                    <Link href="/">
                        <a>Return home?</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}