import { Module } from '@nestjs/common';
import { AutomationsModule } from '../automations/automations.module';
import { TimerEventsService } from './timer-events.service';

@Module({
  imports: [AutomationsModule],
  controllers: [],
  providers: [TimerEventsService],
  exports: [TimerEventsService],
})
export class TimerEventsModule {}
