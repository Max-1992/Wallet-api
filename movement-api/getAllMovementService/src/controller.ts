// Awilix and Express
import { GET, route } from 'awilix-express';
import { Request, Response } from 'express';

// Import interface
import { IMovementGetAllService } from 'wallet-interfaces/services';

@route('/movements')
export class GetAllMovementController {

    constructor(private readonly movementService: IMovementGetAllService) {}

    @GET()
    public async all(req: Request, res: Response): Promise<void>  {
        try {
            const data = await this.movementService.findAll();
            res.send(data);
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    }
}