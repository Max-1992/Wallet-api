// Awilix and Express
import { DELETE, route } from 'awilix-express';
import { Request, Response } from 'express';

// Import interface
import { IBalanceDeleteService } from 'wallet-interfaces/services';

@route('/balances')
export class DeleteBalanceService {

    constructor(private readonly balanceService: IBalanceDeleteService) {}

    @route('/:id')
    @DELETE()
    public async delete(req: Request, res: Response): Promise<void>  {
        try {
            const id = parseInt(req.params.id);
            await this.balanceService.delete(id);
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }

    }

}