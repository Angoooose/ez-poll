import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export default function useSocket(): Socket|undefined {
    const [socket, setSocket] = useState<Socket>();

    useEffect(() => {
        fetch('/api/socket').then(() => {
            let newSocket = io();
            setSocket(newSocket);

            newSocket.once('connect', () => {
                console.log('[Client] Socket Connection Established');
            });
        });
    }, []);

    return socket;
}