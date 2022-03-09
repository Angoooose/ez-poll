import { Dispatch, FormEvent } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';
import Input from '../common/Input';

interface CreateAccountProps {
    setAuthType: Dispatch<'login'|'new'>,
}

export default function CreateAccount({ setAuthType }: CreateAccountProps) {
    const createAccount = (e: FormEvent) => {
        e.preventDefault();

        
    }

    return (
        <Card>
            <h1 className="text-xl font-medium mb-2">Create Account</h1>
            <form className="flex flex-col" onSubmit={createAccount}>
                <Input placeholder="Email"/>
                <Input placeholder="Password"/>
                <Button>Create Account</Button>
                <div>or <span className="text-cyan-400 cursor-pointer hover:underline" onClick={() => setAuthType('login')}>login</span>.</div>
            </form>
        </Card>
    );
}