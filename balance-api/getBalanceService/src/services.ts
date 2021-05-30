// Interface Services
import { IBalanceGetService } from 'wallet-interfaces/services';

// Interface Domain
import { IBalance } from 'wallet-interfaces/domain';

// Interface Repositories
import { IBalanceRepository } from 'wallet-interfaces/dal/walletRepositories';
import { IBalanceModel } from 'wallet-interfaces/dal/models';

export default class BalanceService implements IBalanceGetService {

    constructor(private readonly balanceRepository: IBalanceRepository) {}

    public async find(id: number): Promise<IBalance> {
        const balance = await this.balanceRepository.findById(id) as IBalanceModel;
        // [TODO]: Mapear IBalanceModel a entidad de Dominio IBalance utilizando un Mapper.
        return balance as IBalance;
    }

}