import { Module } from '@nestjs/common';
import { HubitatApiController } from './hubitat-api.controller';
import { HubitatApiService } from './hubitat-api.service';

@Module({
  imports: [],
  controllers: [HubitatApiController],
  providers: [HubitatApiService],
  exports: [HubitatApiService],
})
export class HubitatApiModule {}
