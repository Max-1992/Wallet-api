// Interface Services
import { IMovementGetService } from 'wallet-interfaces/services';

// Interface Domain
import { IMovement } from 'wallet-interfaces/domain';

// Interface Repositories
import { IMovementRepository } from 'wallet-interfaces/dal/walletRepositories';
import { IMovementModel } from 'wallet-interfaces/dal/models';

export default class MovementService implements IMovementGetService {

    constructor(private readonly movementRepository: IMovementRepository) {}

    public async find(id: number): Promise<IMovement> {
        const movement = await this.movementRepository.findById(id) as IMovementModel;
        // [TODO]: Mapear IMovementModel a entidad de Dominio IMovement utilizando un Mapper.
        return movement as IMovement;
    }

}