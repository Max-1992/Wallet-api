// Interface Services
import { IBalanceGetAllService } from 'wallet-interfaces/services';

// Interface Domain
import { ISubscription } from 'wallet-interfaces/domain';

// Interface Repositories
import { ISubscriptionRepository } from 'wallet-interfaces/dal/walletRepositories';
import { ISubscriptionModel } from 'wallet-interfaces/dal/models';

export default class BalanceService implements IBalanceGetAllService {

    constructor(private readonly subscriptionRepository: ISubscriptionRepository) {}

    public async findAll(): Promise<ISubscription[]> {
        const subscription = await this.subscriptionRepository.all() as ISubscriptionModel[];
        // [TODO]: Mapear ISubscriptionModel a entidad de Dominio ISubscription utilizando un Mapper.
        return subscription as ISubscription[];
    }

}