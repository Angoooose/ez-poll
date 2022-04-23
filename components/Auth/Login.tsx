import { Dispatch, FormEvent, useRef, useState } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';
import Input from '../common/Input';
import AuthError from './AuthError';

interface LoginProps {
    setAuthType: Dispatch<'login'|'new'>,
}

export default function Login({ setAuthType }: LoginProps) {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>();

    const login = (e: FormEvent) => {
        e.preventDefault();

        if (emailRef.current?.value && passwordRef.current?.value) {
            fetch('/api/auth/login', {
                method: 'PUT',
                body: JSON.stringify({
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                }),
            }).then(res => {
                if (res.status === 200) window.location.reload();
                if (res.status === 404) {
                    setErrorMessage('Invalid email or password.');
                    setIsButtonDisabled(true);
                }
            });
        }
    };

    return (
        <Card>
            <h1 className="text-xl font-medium mb-2">Login</h1>
            <form className="flex flex-col transition-all" onSubmit={login}>
                <AuthError errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
                <Input placeholder="Email" type="email" ref={emailRef} onChange={(el) => setIsButtonDisabled(el.target.value === '' || passwordRef.current!.value === '')}/>
                <Input placeholder="Password" type="password" ref={passwordRef} onChange={(el) => setIsButtonDisabled(el.target.value === '' || emailRef.current!.value === '')}/>
                <Button fullWidth={true} disabled={isButtonDisabled}>Sign In</Button>
                <div>or <span className="text-cyan-400 cursor-pointer hover:underline" onClick={() => setAuthType('new')}>create an account</span>.</div>
            </form>
        </Card>
    );
}