import { Logger, Module, Provider } from '@nestjs/common';
import { LocationRepository } from './database/location.repository';
import { LOCATION_REPOSITORY } from './location.di-tokens';
import { LocationMapper } from './location.mapper';

const eventHandlers: Provider[] = [
];

const mappers: Provider[] = [LocationMapper];

const repositories: Provider[] = [
  { provide: LOCATION_REPOSITORY, useClass: LocationRepository },
];

@Module({
  imports: [],
  controllers: [],
  providers: [Logger, ...eventHandlers, ...mappers, ...repositories],
})
export class WalletModule {}
