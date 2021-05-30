// Awilix and Express
import { GET, route } from 'awilix-express';
import { Request, Response } from 'express';

// Import interface
import { IBalanceGetService } from 'wallet-interfaces/services';

@route('/balances')
export class GetBalanceController {

    constructor(private readonly balanceService: IBalanceGetService) {}

    @route('/:id')
    @GET()
    public async find(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const data = await this.balanceService.find(id);
            res.send(data); 
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    }

}