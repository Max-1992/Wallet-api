// Awilix and Express
import { GET, route } from 'awilix-express';
import { Request, Response } from 'express';

// Import interface
import { ISubscriptionGetAllService } from 'wallet-interfaces/services';

@route('/subscriptions')
export class GetAllSubscriptionController {

    constructor(private readonly subscriptionService: ISubscriptionGetAllService) {}

    @GET()
    public async all(req: Request, res: Response): Promise<void>  {
        try {
            const data = await this.subscriptionService.findAll();
            res.send(data);
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    }
    
}