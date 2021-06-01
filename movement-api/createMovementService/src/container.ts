// Awilix
import { asClass, createContainer, InjectionMode } from 'awilix';
import { scopePerRequest } from 'awilix-express';

// Express
import { Application } from 'express';

// Class - Services
import MovementService from './services';

// Class - Repository
import { MovementRepository, BalanceRepository, MovementMapperDB, BalanceMapperDB   } from 'wallet-repositories'


// Create container
const container = createContainer({ injectionMode: InjectionMode.CLASSIC });

// Bindings Services
container.register({
    movementService: asClass(MovementService).scoped().singleton(),
});

// Bindings Repositories
container.register({
    movementRepository: asClass(MovementRepository).scoped().singleton(),
    balanceRepository: asClass(BalanceRepository).scoped().singleton()
});

// Bindings Mapper Repositories
container.register({
    movementMapperDB: asClass(MovementMapperDB).scoped().singleton(),
    balanceMapperDB: asClass(BalanceMapperDB).scoped().singleton()
});

// Inicilizador del contenedor
const loadContainer = (app: Application): void => { app.use(scopePerRequest(container)); };

export default loadContainer;