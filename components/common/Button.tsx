import { ButtonHTMLAttributes } from 'react';

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className="bg-cyan-500 my-1 py-1 rounded-sm hover:bg-cyan-600 transition-colors" {...props}>
            {props.children}
        </button>
    );
}