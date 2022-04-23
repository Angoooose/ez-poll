import { Dispatch, FormEvent, useRef, useState } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';
import Input from '../common/Input';
import AuthError from './AuthError';

interface CreateAccountProps {
    setAuthType: Dispatch<'login'|'new'>,
}

export default function CreateAccount({ setAuthType }: CreateAccountProps) {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>();

    const createAccount = (e: FormEvent) => {
        e.preventDefault();

        if (emailRef.current?.value && passwordRef.current?.value) {
            const reqBody = JSON.stringify({
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });

            fetch('/api/auth/create', {
                method: 'POST',
                body: reqBody,
            }).then(res => {
                console.log(res.status);
                if (res.status === 204) {
                    fetch('/api/auth/login', {
                        method: 'PUT',
                        body: reqBody,
                    }).then((res) => {
                        if (res.status === 200) window.location.reload();
                        if (res.status === 409) {
                            setErrorMessage('That account already exists.');
                            setIsButtonDisabled(true);
                        }
                    });
                }
            });
        }
    };

    return (
        <Card>
            <h1 className="text-xl font-medium mb-2">Create Account</h1>
            <form className="flex flex-col" onSubmit={createAccount}>
                <AuthError errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
                <Input placeholder="Email" type="email" ref={emailRef} onChange={(el) => setIsButtonDisabled(el.target.value === '' || passwordRef.current!.value === '')}/>
                <Input placeholder="Password" type="password" ref={passwordRef} onChange={(el) => setIsButtonDisabled(el.target.value === '' || emailRef.current!.value === '')}/>
                <Button fullWidth={true} disabled={isButtonDisabled}>Create Account</Button>
                <div>or <span className="text-cyan-400 cursor-pointer hover:underline" onClick={() => setAuthType('login')}>login</span>.</div>
            </form>
        </Card>
    );
}