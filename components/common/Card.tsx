import { FunctionComponent } from 'react';

interface CardProps {
    maxWidth?: 'sm'|'md'|'lg',
    hover?: boolean,
}

const Card: FunctionComponent<CardProps> = ({ children, maxWidth, hover }) => {
    return (
        <div className={`m-4 bg-neutral-700 py-4 px-10 rounded-md shadow-md transition-all ${maxWidth ? `max-w-${maxWidth}` : 'w-fit'} ${hover ? 'cursor-pointer hover:bg-neutral-900 hover:bg-opacity-60' : ''}`}>
            {children}
        </div>
    );
}

export default Card;