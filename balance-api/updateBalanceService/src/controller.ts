// Awilix and Express
import { PUT, route } from 'awilix-express';
import { Request, Response } from 'express';

// Import interface
import { IBalanceUpdateService } from 'wallet-interfaces/services';

// Import interface Dto
import { IBalanceUpdateDto } from 'wallet-interfaces/dtos';

@route('/balances')
export class UpdateBalanceController {

    constructor(private readonly balanceService: IBalanceUpdateService) {}

    @route('/:id')
    @PUT()
    public async update(req: Request, res: Response): Promise<void>  {
        try {
            const id = parseInt(req.params.id);
            const { amount } = req.body;
            const balanceDto: IBalanceUpdateDto = { amount };
            await this.balanceService.update(id, balanceDto);
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    }
}