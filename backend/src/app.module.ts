import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GithubController } from './github/github.controller';
import { GithubService } from './github/github.service';
import { HttpModule } from '@nestjs/axios';
import { CounterService } from './counter/counter.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
  ],
  controllers: [AppController, GithubController],
  providers: [AppService, GithubService, CounterService],
})
export class AppModule {}
