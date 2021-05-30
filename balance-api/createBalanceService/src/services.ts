// Interface Services
import { IBalanceCreateService } from 'wallet-interfaces/services';

// Interface Repositories
import { IBalanceRepository } from 'wallet-interfaces/dal/walletRepositories';
import { IBalanceMapperDB } from 'wallet-interfaces/dal/mappers';
import { IBalanceModel } from 'wallet-interfaces/dal/models';

// Interface Dto
import { IBalanceCreateDto } from 'wallet-interfaces/dtos';


export default class BalanceService implements IBalanceCreateService {

    constructor(
        private readonly balanceRepository: IBalanceRepository,
        private readonly balanceMapperDB: IBalanceMapperDB
    ) {}

    public async create(balanceDto: IBalanceCreateDto): Promise<void> {
        // [TODO]: Mapear DTO a entidad de Dominio utilizando un Mapper.
        const balance: IBalanceModel = this.balanceMapperDB.fromCreateDtoToEntityModel(balanceDto);
 
        await this.balanceRepository.save(balance);
     }

}