// Interface Services
import { ISubscriptionGetService } from 'wallet-interfaces/services';

// Interface Domain
import { ISubscription } from 'wallet-interfaces/domain';

// Interface Repositories

import { ISubscriptionRepository } from 'wallet-interfaces/dal/walletRepositories';
import { ISubscriptionModel } from 'wallet-interfaces/dal/models';

export default class SubscriptionService implements ISubscriptionGetService {

    constructor(private readonly subscriptionRepository: ISubscriptionRepository) {}

    public async find(id: number): Promise<ISubscription> {
        const subscription = await this.subscriptionRepository.findById(id) as ISubscriptionModel;
        // [TODO]: Mapear ISubscriptionModel a entidad de Dominio ISubscription utilizando un Mapper.
        return subscription as ISubscription;
    }

}