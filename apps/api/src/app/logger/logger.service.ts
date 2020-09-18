import { Injectable, Scope, Logger } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class PortfolioLoggerService extends Logger {}
