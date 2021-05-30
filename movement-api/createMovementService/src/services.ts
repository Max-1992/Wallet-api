// Interface Services
import { IMovementCreateService } from 'wallet-interfaces/services';

// Interface Repositories
import { IBalanceRepository, IMovementRepository } from 'wallet-interfaces/dal/walletRepositories';
import { IBalanceMapperDB, IMovementMapperDB } from 'wallet-interfaces/dal/mappers';
import { IBalanceModel, IMovementModel } from 'wallet-interfaces/dal/models';

// Enums
import { MovementType } from 'wallet-interfaces/enums'

// Interface Dto
import { IMovementCreateDto, IBalanceCreateDto } from 'wallet-interfaces/dtos';

// Libs Exceptions
import { ApplicationException } from './libs/exceptions/application.exception';

export default class MovementService implements IMovementCreateService {

    constructor(
        private readonly movementRepository: IMovementRepository,
        private readonly balanceRepository: IBalanceRepository,
        private readonly movementMapperDB: IMovementMapperDB,
        private readonly balanceMapperDB: IBalanceMapperDB
    ) {}

    public async create(movementDto: IMovementCreateDto): Promise<void> {

        const balance: IBalanceModel | null = await this.balanceRepository.findByUserId(movementDto.user_id);
 
        // If movementDto.type === MovementType.income execute income
        if( movementDto.type === MovementType.income ) {
             await this.income(movementDto, balance);
        }
 
        // If movementDto.type === MovementType.outcom execute outcom
        if( movementDto.type === MovementType.outcome ) {
             await this.outcome(movementDto, balance);
        }
 
        const movement = this.movementMapperDB.fromCreateDtoToEntityModel(movementDto) as IMovementModel;
        await this.movementRepository.save(movement);
    }

    private async income(movementDto: IMovementCreateDto, balance: IBalanceModel | null) {

        // Si no existe balance hay que crearlo, si existe actualizamos el valor del amout.
        if(!balance) {
            const balanceDto = {user_id: movementDto.user_id, amount: movementDto.amount} as IBalanceCreateDto;
            balance = this.balanceMapperDB.fromCreateDtoToEntityModel(balanceDto) as IBalanceModel;
            await this.balanceRepository.save(balance);
        } else {
            balance.amount += movementDto.amount;
            balance = this.balanceMapperDB.fromUpdateDtoToEntityModel(balance) as IBalanceModel;
            await this.balanceRepository.updateById(balance.id, balance);
        }
    }

    private async outcome(movementDto: IMovementCreateDto, balance: IBalanceModel | null) {

        // Validar si el usuario posee saldo.
        if(!balance) {
            throw new ApplicationException(`The user does not have a balance entered.`);
        }

        // validar si el usuario posee el suficiente saldo disponible.
        if(balance.amount < movementDto.amount) {
            throw new ApplicationException(`The user does not have enough balance.`);
        }

        balance.amount -= movementDto.amount;
        await this.balanceRepository.updateById(balance.id, balance);
    }

}