import { Dispatch, useEffect, useState } from 'react';

interface AuthErrorProps {
    errorMessage?: string,
    setErrorMessage: Dispatch<string|undefined>,
}

export default function AuthError({ errorMessage, setErrorMessage }: AuthErrorProps) {
    const [isVisable, setIsVisable] = useState<boolean>(false);

    useEffect(() => {
        if (errorMessage) {
            setIsVisable(true);
            setTimeout(() => {
                setIsVisable(false);
                setTimeout(() => setErrorMessage(undefined), 500);
            }, 5000);
        }
    }, [errorMessage]);
    
    return (
        <div className={`bg-red-500 bg-opacity-25 border-red-500 border rounded-md text-red-500 p-2 mb-1 transition-all duration-500 z-10 ${!isVisable ? 'translate-y-8 opacity-0 mb-0 -mt-4' : ''}`}>
            {errorMessage}
        </div>
    );
}