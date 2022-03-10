import { ButtonHTMLAttributes } from 'react';

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className="bg-cyan-500 my-1 py-1 rounded-sm hover:bg-cyan-600 transition-colors disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:bg-cyan-500" {...props}>
            {props.children}
        </button>
    );
}