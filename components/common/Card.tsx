import { FunctionComponent } from 'react';

interface CardProps {
    maxWidth?: 'sm'|'md'|'lg',
    className?: string,
}

const Card: FunctionComponent<CardProps> = ({ children, maxWidth, className }) => {
    return (
        <div className={`m-4 bg-neutral-700 py-4 px-10 rounded-md shadow-md transition-all ${maxWidth ? `max-w-${maxWidth}` : 'w-fit'} ${className}`}>
            {children}
        </div>
    );
}

export default Card;