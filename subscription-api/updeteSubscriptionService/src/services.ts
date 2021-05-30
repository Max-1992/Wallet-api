// Interface Services
import { ISubscriptionUpdateService } from 'wallet-interfaces/services';

// Interface Repositories
import { ISubscriptionRepository } from 'wallet-interfaces/dal/walletRepositories';
import { ISubscriptionMapperDB } from 'wallet-interfaces/dal/mappers';
import { ISubscriptionModel } from 'wallet-interfaces/dal/models';

// Interface Dto
import { ISubscriptionUpdateDto } from 'wallet-interfaces/dtos';

// Libs Exceptions
import { ApplicationException } from './libs/exceptions/application.exception';


export default class SubscriptionService implements ISubscriptionUpdateService {

    constructor(
        private readonly subscriptionRepository: ISubscriptionRepository,
        private readonly subscriptionMapperDB: ISubscriptionMapperDB
    ) {}

    public async update(id: number, subscriptionDto: ISubscriptionUpdateDto): Promise<void> {

        // [TODO]: Mapear DTO a entidad de Dominio utilizando un Mapper.

        const subscriptionExists = await this.subscriptionRepository.findById(id);

        if(!subscriptionExists) {
            throw new ApplicationException(`No subscription found for id ${id}.`)
       }

       const subscription: ISubscriptionModel = this.subscriptionMapperDB.fromUpdateDtoToEntityModel(subscriptionDto);
       
        await this.subscriptionRepository.updateById(id, subscription);
    }

}