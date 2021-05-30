// Awilix and Express
import { POST, route } from 'awilix-express';
import { Request, Response } from 'express';

// Import interface
import { IMovementCreateService } from 'wallet-interfaces/services'

// Import interface Dto
import { IMovementCreateDto } from 'wallet-interfaces/dtos';

@route('/movements')
export class CreateMovementController {

    constructor(private readonly movementService: IMovementCreateService) {}

    @POST()
    public async create(req: Request, res: Response): Promise<void>  {
        try {
            const { user_id, type, amount } = req.body;
            const movementDto: IMovementCreateDto = { user_id, type, amount };
            await this.movementService.create(movementDto);
            res.sendStatus(201);
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    }
}