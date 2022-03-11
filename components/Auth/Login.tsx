import { Dispatch, FormEvent, useRef, useState } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';
import Input from '../common/Input';

interface LoginProps {
    setAuthType: Dispatch<'login'|'new'>,
}

export default function Login({ setAuthType }: LoginProps) {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

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
                console.log(res.status);
                if (res.status === 200) window.location.reload();
            });
        }
    };

    return (
        <Card>
            <h1 className="text-xl font-medium mb-2">Login</h1>
            <form className="flex flex-col" onSubmit={login}>
                <Input placeholder="Email" type="email" ref={emailRef} onChange={(el) => setIsButtonDisabled(el.target.value === '' || passwordRef.current!.value === '')}/>
                <Input placeholder="Password" type="password" ref={passwordRef} onChange={(el) => setIsButtonDisabled(el.target.value === '' || emailRef.current!.value === '')}/>
                <Button disabled={isButtonDisabled}>Sign In</Button>
                <div>or <span className="text-cyan-400 cursor-pointer hover:underline" onClick={() => setAuthType('new')}>create an account</span>.</div>
            </form>
        </Card>
    );
}