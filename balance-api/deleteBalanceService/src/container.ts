// Awilix
import { asClass, createContainer, InjectionMode } from 'awilix';
import { scopePerRequest } from 'awilix-express';

// Express
import { Application } from 'express';

// Class - Services
import BalanceService from './services';

// Class - Repository
import { BalanceRepository, BalanceMapperDB  } from 'wallet-repositories'


// Create container
const container = createContainer({ injectionMode: InjectionMode.CLASSIC });

// Bindings Services
container.register({
    balanceService: asClass(BalanceService).scoped().singleton(),
});

// Bindings Repositories
container.register({
    balanceRepository: asClass(BalanceRepository).scoped().singleton(),
});

// Bindings Mapper Repositories
container.register({
    balanceMapperDB: asClass(BalanceMapperDB).scoped().singleton(),
});

// Inicilizador del contenedor
const loadContainer = (app: Application): void => { app.use(scopePerRequest(container)); };

export default loadContainer;