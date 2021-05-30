// Awilix and Express
import { GET, route } from 'awilix-express';
import { Request, Response } from 'express';

// Import interface
import { IBalanceGetAllService } from 'wallet-interfaces/services';

@route('/balances')
export class GetAllBalanceController {

    constructor(private readonly balanceService: IBalanceGetAllService) {}

    @GET()
    public async getAll(req: Request, res: Response): Promise<void>  {
        try {
            const data = await this.balanceService.findAll();
            res.send(data);
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    }
}