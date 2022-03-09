import { InputHTMLAttributes } from 'react';

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className="appearance-none bg-neutral-600 border-b-2 border-t-2 border-neutral-600 focus:border-b-cyan-500 transition-all rounded-sm shadow-sm outline-none px-2 py-0.5 my-1"
            {...props}
        />
    );
}