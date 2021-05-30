// Awilix and Express
import { POST, route } from 'awilix-express';
import { Request, Response } from 'express';

// Import interface
import { ISubscriptionCreateService } from 'wallet-interfaces/services';

// Import interface Dto
import { ISubscriptionCreateDto } from 'wallet-interfaces/dtos';

@route('/subscriptions')
export class CreateSubscriptionController {

    constructor(private readonly subscriptionService: ISubscriptionCreateService) {}

    @POST()
    public async create(req: Request, res: Response): Promise<void>  {
        try {
            const { user_id, code, amount, cron } = req.body;
            const subscriptionDto: ISubscriptionCreateDto = { user_id, code, amount, cron };
            await this.subscriptionService.create(subscriptionDto);
            res.sendStatus(201);
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    }
}