import { FunctionComponent } from 'react';

interface CardProps {
    maxWidth?: 'sm'|'md'|'lg',
}

const Card: FunctionComponent<CardProps> = ({ children, maxWidth }) => {
    return (
        <div className={`m-4 bg-neutral-700 py-4 px-10 rounded-md shadow-md transition-all ${maxWidth ? `max-w-${maxWidth}` : 'w-fit'}`}>
            {children}
        </div>
    );
}

export default Card;