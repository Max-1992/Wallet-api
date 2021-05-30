// Awilix and Express
import { DELETE, route } from 'awilix-express';
import { Request, Response } from 'express';

// Import interface
import { ISubscriptionDeleteService } from 'wallet-interfaces/services';

@route('/subscriptions')
export class DeleteSubscriptionController {

    constructor(private readonly subscriptionService: ISubscriptionDeleteService) {}

    @route('/:id')
    @DELETE()
    public async delete(req: Request, res: Response): Promise<void>  {
        try {
            const id = parseInt(req.params.id);
            await this.subscriptionService.delete(id);
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }

    }
    
}