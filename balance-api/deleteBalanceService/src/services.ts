// Interface Services
import { IBalanceDeleteService } from 'wallet-interfaces/services';

// Interface Repositories
import { IBalanceRepository } from 'wallet-interfaces/dal/walletRepositories';

export default class BalanceService implements IBalanceDeleteService {

    constructor(private readonly balanceRepository: IBalanceRepository) {}

    public async delete(id: number): Promise<void> {
        await this.balanceRepository.deleteById(id);
    }

}