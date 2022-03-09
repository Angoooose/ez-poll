import { Dispatch, FormEvent } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';
import Input from '../common/Input';

interface LoginProps {
    setAuthType: Dispatch<'login'|'new'>,
}

export default function Login({ setAuthType }: LoginProps) {
    const login = (e: FormEvent) => {
        e.preventDefault();


    }

    return (
        <Card>
            <h1 className="text-xl font-medium mb-2">Login</h1>
            <form className="flex flex-col" onSubmit={login}>
                <Input placeholder="Email"/>
                <Input placeholder="Password"/>
                <Button>Sign In</Button>
                <div>or <span className="text-cyan-400 cursor-pointer hover:underline" onClick={() => setAuthType('new')}>create an account</span>.</div>
            </form>
        </Card>
    );
}