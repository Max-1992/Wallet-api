// Awilix and Express
import { GET, route } from 'awilix-express';
import { Request, Response } from 'express';

// Import interface
import { ISubscriptionGetService } from 'wallet-interfaces/services';

@route('/subscriptions')
export class GetSubscriptionController {

    constructor(private readonly subscriptionService: ISubscriptionGetService) {}

    @route('/:id')
    @GET()
    public async find(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const data = await this.subscriptionService.find(id);
            res.send(data); 
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    }

}