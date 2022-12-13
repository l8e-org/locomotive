import { RepositoryPort } from '@libs/ddd';
import { LocationEntity } from '../domain/location.entity';

export type LocationRepositoryPort = RepositoryPort<LocationEntity>;
