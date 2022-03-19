import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as NetServer, Socket } from 'net';
import { Server } from 'socket.io';
import { startConsumer } from '../../utils/queue/consumer';
import { publishMsg } from '../../utils/queue/provider';

interface SocketResponse extends NextApiResponse {
    socket: Socket & {
        server: NetServer & {
            io: Server;
        }
    }
}

export default async function handler(req: NextApiRequest, res: SocketResponse) {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server as any);
        res.socket.server.io = io;
        startConsumer(io);

        io.on('connection', async (socket) => {
            console.log('[Server] Socket Connection Established');

            socket.on('newVote', ({ pollId, choiceIndex }) => {
                publishMsg(`${pollId}-${choiceIndex}`);
            });
        });
    }

    res.status(200).send({ status: 200 });
}