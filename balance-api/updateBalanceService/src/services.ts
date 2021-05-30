// Interface Services
import { IBalanceUpdateService } from 'wallet-interfaces/services';

// Interface Repositories
import { IBalanceRepository } from 'wallet-interfaces/dal/walletRepositories';
import { IBalanceMapperDB } from 'wallet-interfaces/dal/mappers';
import { IBalanceModel } from 'wallet-interfaces/dal/models';

// Interface Dto
import { IBalanceUpdateDto } from 'wallet-interfaces/dtos';

// Libs Exceptions
import { ApplicationException } from './libs/exceptions/application.exception';


export default class BalanceService implements IBalanceUpdateService {

    constructor(
        private readonly balanceRepository: IBalanceRepository,
        private readonly balanceMapperDB: IBalanceMapperDB
    ) {}

    public async update(id: number, balanceDto: IBalanceUpdateDto): Promise<void> {
        // [TODO]: Mapear DTO a entidad de Dominio utilizando un Mapper.
        const balanceExists = await this.balanceRepository.findById(id);

        if(!balanceExists) {
            throw new ApplicationException(`No balance found for id ${id}.`)
        }

        const balance: IBalanceModel = this.balanceMapperDB.fromUpdateDtoToEntityModel(balanceDto);
       
        await this.balanceRepository.updateById(id, balance);
    }

}