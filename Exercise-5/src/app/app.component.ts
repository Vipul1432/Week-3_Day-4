import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(message: string) {
    console.log(`[Logger] ${message}`);
  }
}

const CUSTOM_LOGGER = {
  log: (message: string) => {
    console.log(`[Custom Logger] ${message}`);
  }
};

@Injectable({
  providedIn: 'root'
})
export class BetterLoggerService extends LoggerService {}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    LoggerService,
    { provide: LoggerService, useValue: CUSTOM_LOGGER },
    { provide: LoggerService, useExisting: BetterLoggerService },
    { provide: LoggerService, useFactory: loggerFactory }
  ]
})
export class AppComponent {
  loggerMessage: string;

  constructor(private logger: LoggerService) {
    this.logger.log('Using useClass configuration');
    this.loggerMessage = 'Using useClass configuration';

    setTimeout(() => {
      this.logger.log('Using useValue configuration');
      this.loggerMessage = 'Using useValue configuration';
    }, 2000);

    setTimeout(() => {
      this.logger.log('Using useExisting configuration');
      this.loggerMessage = 'Using useExisting configuration';
    }, 4000);

    setTimeout(() => {
      this.logger.log('Using useFactory configuration');
      this.loggerMessage = 'Using useFactory configuration';
    }, 6000);
  }
}

export function loggerFactory() {
  return new LoggerService();
}
