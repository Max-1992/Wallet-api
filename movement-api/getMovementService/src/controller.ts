// Awilix and Express
import { GET, route } from 'awilix-express';
import { Request, Response } from 'express';

// Import interface
import { IMovementGetService } from 'wallet-interfaces/services';

@route('/movements')
export class GetMovementController {

    constructor(private readonly movementService: IMovementGetService) {}

    @route('/:id')
    @GET()
    public async find(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const data = await this.movementService.find(id);
            res.send(data); 
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    }

}