// Awilix and Express
import { POST, route } from 'awilix-express';
import { Request, Response } from 'express';

// Import interface
import { IBalanceCreateService } from 'wallet-interfaces/services';

// Import interface Dto
import { IBalanceCreateDto } from 'wallet-interfaces/dtos';

@route('/balances')
export class CreateBalanceController {

    constructor(private readonly balanceService: IBalanceCreateService) {}

    @POST()
    public async create(req: Request, res: Response): Promise<void>  {
        try {
            const { user_id, amount } = req.body;
            const balanceDto: IBalanceCreateDto = { user_id, amount };
            await this.balanceService.create(balanceDto);
            res.sendStatus(201);
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    }
}