// Interface Services
import { ISubscriptionCreateService } from 'wallet-interfaces/services';

// Interface Repositories
import { ISubscriptionRepository } from 'wallet-interfaces/dal/walletRepositories';
import { ISubscriptionMapperDB } from 'wallet-interfaces/dal/mappers';
import { ISubscriptionModel } from 'wallet-interfaces/dal/models';

// Interface Dto
import { ISubscriptionCreateDto } from 'wallet-interfaces/dtos';

// Libs Exceptions
import { ApplicationException } from './libs/exceptions/application.exception';


export default class SubscriptionService implements ISubscriptionCreateService {

    constructor(
        private readonly subscriptionRepository: ISubscriptionRepository,
        private readonly subscriptionMapperDB: ISubscriptionMapperDB
    ) {}

    public async create(subscriptionDto: ISubscriptionCreateDto): Promise<void> {

        // [TODO]: Mapear DTO a entidad de Dominio utilizando un Mapper.

       const subscriptionExists = await this.subscriptionRepository.findByUserAndCode(subscriptionDto.user_id, subscriptionDto.code);

       if(subscriptionExists) {
            throw new ApplicationException('User subscription al ready exists.');
       }

       const subscription: ISubscriptionModel = this.subscriptionMapperDB.fromCreateDtoToEntityModel(subscriptionDto);

       await this.subscriptionRepository.save(subscription);
    }

}