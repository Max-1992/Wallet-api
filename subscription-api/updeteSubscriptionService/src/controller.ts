// Awilix and Express
import { PUT, route } from 'awilix-express';
import { Request, Response } from 'express';

// Import interface
import { ISubscriptionUpdateService } from 'wallet-interfaces/services';

// Import interface Dto
import { ISubscriptionUpdateDto } from 'wallet-interfaces/dtos';

@route('/subscriptions')
export class UpdateSubscriptionController {

    constructor(private readonly subscriptionService: ISubscriptionUpdateService) {}

    @route('/:id')
    @PUT()
    public async update(req: Request, res: Response): Promise<void>  {
        try {
            const id = parseInt(req.params.id);
            const { code, amount, cron } = req.body;
            const subscriptionDto: ISubscriptionUpdateDto = { code, amount, cron };
            await this.subscriptionService.update(id, subscriptionDto);
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    }

}