import { Injectable } from '@nestjs/common';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Claim } from './entities/claim.entity';

@Injectable()
export class ClaimsService {
  constructor(@InjectRepository(Claim) private readonly claimRepository: Repository<Claim>) {
  }

  create(createClaimDto: CreateClaimDto): Promise<Claim> {
    return this.claimRepository.save(createClaimDto);
  }

  findAll(): Promise<Claim[]> {
    return this.claimRepository.find();
  }

  findOne(id: number): Promise<Claim> {
    return this.claimRepository.findOne(id);
  }

  update(id: number, updateClaimDto: UpdateClaimDto): Promise<UpdateResult> {
    return this.claimRepository.update(id, updateClaimDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.claimRepository.delete(id);
  }
}
