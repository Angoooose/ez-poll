import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'primary'|'secondary'|'danger',
    sideMargin?: boolean,
    fullWidth?: boolean,
}

export default function Button(props: ButtonProps) {
    return (
        <button className={`${props.color === 'danger' ? 'bg-red-500 hover:bg-red-600 disabled:hover:bg-red-500' : props.color === 'secondary' ? 'hover:bg-neutral-600 bg-opacity-30 disabled:opacity-30 disabled:hover:bg-inherit' : 'bg-cyan-500 hover:bg-cyan-600 disabled:hover:bg-cyan-500'} my-1 py-1 px-2 ${props.sideMargin ? 'mx-4' : ''} ${props.fullWidth ? 'w-full' : 'w-fit'} select-none rounded-md  transition-colors disabled:opacity-75 disabled:cursor-not-allowed text-base flex justify-center items-center m-auto`} {...props}>
            {props.children}
        </button>
    );
}