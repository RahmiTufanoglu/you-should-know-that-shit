import { Module } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ClaimsController } from './claims.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaimEntity } from './entities/claim.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClaimEntity]),
  ],
  controllers: [
    ClaimsController,
  ],
  providers: [
    ClaimsService,
  ],
})
export class ClaimsModule {
}
