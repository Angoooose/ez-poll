import { createContext, FunctionComponent, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io();
const SocketContext = createContext(socket);

export default SocketContext;
export const SocketContextProvider: FunctionComponent = ({ children }) => {
    useEffect(() => {
        fetch('/api/socket');
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}