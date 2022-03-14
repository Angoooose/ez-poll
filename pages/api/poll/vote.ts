import type { NextApiRequest, NextApiResponse } from 'next';
import pgConfig from '../../../postgres.config.json';
import { Pool } from 'pg';

interface VoteResponse {
    message: string,
    code: number,
}

export default async function handler({ body }: NextApiRequest, res: NextApiResponse<VoteResponse>) {
    const { pollId } = JSON.parse(body);
    
}