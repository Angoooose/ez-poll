import { FunctionComponent } from 'react';

const SettingsCard: FunctionComponent = ({ children }) => {
    return (
        <div className="bg-neutral-700 p-4 my-4 rounded-md w-full flex flex-col">
            {children}
        </div>
    );  
}

export default SettingsCard;