import { Request, Response } from 'express';

export const listChecks = (req: Request, res: Response): void => {
    res.json([
        { id: 1, name: 'Check 1' },
        { id: 2, name: 'Check 2' },
    ]);
};

export const getCheck = (req: Request, res: Response): void => {
    const id = req.params.id;
    res.json({ id, name: 'Check 1' });
};

export const shareCheck = (req: Request, res: Response): void => {
    res.status(201).json({ message: 'Check created' });
};

export const approveCheck = (req: Request, res: Response): void => {
    const id = req.params.id;
    res.json({ message: `Check with id ${id} approved/dissapproved` });
};
