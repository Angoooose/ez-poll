export default function NotFound() {
    return (
        <div className="flex flex-col items-center m-auto max-w-xs text-center">
            <div className="text-5xl font-bold">404</div>
            <hr className="w-full my-2 border-neutral-500 opacity-75"/>
            <div className="text-gray-400">{'We couldn\'t find that poll. It must have been deleted or you have an invalid link.'}</div>
        </div>
    );
}