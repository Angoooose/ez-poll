import { FunctionComponent } from 'react';

const Card: FunctionComponent = ({ children }) => {
    return (
        <div className="bg-neutral-700 py-4 px-10 w-fit rounded-md shadow-md">
            {children}
        </div>
    );
}

export default Card;