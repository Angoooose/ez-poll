import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'primary'|'danger',
}

export default function PollButton(props: ButtonProps) {
    return (
        <button {...props} className={`flex items-center justify-center py-1 px-2 rounded-md transition-all text-gray-400 hover:text-white hover:bg-opacity-30 ${props.color === 'danger' ? 'hover:bg-red-500' : 'hover:bg-cyan-500'}`}>
            {props.children}
        </button>
    );
}