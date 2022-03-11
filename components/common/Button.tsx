import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'primary'|'danger',
    sideMargin?: boolean,
}

export default function Button(props: ButtonProps) {
    return (
        <button className={`${props.color === 'danger' ? 'bg-red-500 hover:bg-red-600 disabled:hover:bg-red-500' : 'bg-cyan-500 hover:bg-cyan-600 disabled:hover:bg-cyan-500'} my-1 py-1 px-2 ${props.sideMargin ? 'mx-4' : ''} rounded-sm  transition-colors disabled:opacity-75 disabled:cursor-not-allowed text-base`} {...props}>
            {props.children}
        </button>
    );
}