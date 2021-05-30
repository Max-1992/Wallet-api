// Interface Services
import { ISubscriptionDeleteService } from 'wallet-interfaces/services';

// Interface Repositories
import { ISubscriptionRepository } from 'wallet-interfaces/dal/walletRepositories';

export default class BalanceService implements ISubscriptionDeleteService {

    constructor(private readonly subscriptionRepository: ISubscriptionRepository) {}

    public async delete(id: number): Promise<void> {
        await this.subscriptionRepository.deleteById(id);
    }

}