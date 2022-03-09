import { useState } from 'react';
import CreateAccount from './CreateAccount';
import Login from './Login';

export default function Auth() {
    const [authType, setAuthType] = useState<'login'|'new'>('login');

    return (
        <div className="text-center flex flex-row justify-center">
            {authType === 'login' ? (
                <Login setAuthType={setAuthType}/>
            ) : (
                <CreateAccount setAuthType={setAuthType}/>
            )}
        </div>
    );
}