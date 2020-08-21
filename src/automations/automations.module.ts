import { Module } from '@nestjs/common';
import { AutomationsService } from './automations.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AutomationsService],
  exports: [AutomationsService],
})
export class AutomationsModule {}
