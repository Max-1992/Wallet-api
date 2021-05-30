// Awilix
import { asClass, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express';

// Express
import { Application } from 'express';

// Class - Services
import SubscriptionService from './services';

// Class - Repository
import { SubscriptionRepository, SubscriptionMapperDB  } from 'wallet-repositories'


// Create container
const container = createContainer({ injectionMode: 'CLASSIC' });

// Bindings Services
container.register({
    subscriptionService: asClass(SubscriptionService).scoped().singleton(),
});

// Bindings Repositories
container.register({
    subscriptionRepository: asClass(SubscriptionRepository).scoped().singleton(),
});

// Bindings Mapper Repositories
container.register({
    subscriptionMapperDB: asClass(SubscriptionMapperDB).scoped().singleton(),
});

// Inicilizador del contenedor
const loadContainer = (app: Application): void => { app.use(scopePerRequest(container)); };

export default loadContainer;