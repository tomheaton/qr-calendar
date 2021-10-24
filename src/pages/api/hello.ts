import type {NextApiRequest, NextApiResponse} from 'next';

type Data = {
    message: string
}

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    res.status(200).json({message: 'QR Calendar'});
}

export default handler;
