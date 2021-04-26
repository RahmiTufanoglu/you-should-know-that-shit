import { Injectable } from '@nestjs/common';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Claim } from './entities/claim.entity';
import { IdNotFoundException } from '../exceptions/id-not-found-exception';

@Injectable()
export class ClaimsService {

  constructor(@InjectRepository(Claim) private readonly claimRepository: Repository<Claim>) {
  }

  async create(createClaimDto: CreateClaimDto): Promise<Claim> {
    return this.claimRepository.save(this.getClaim(new Claim(), createClaimDto));
  }

  findAll(): Promise<Claim[]> {
    return this.claimRepository.find();
  }

  findById(id: number): Promise<Claim> {
    return this.claimRepository.findOne(id);
  }

  async update(id: number, updateClaimDto: UpdateClaimDto): Promise<UpdateResult> {
    if (!!await this.getClaimById(id)) {
      return this.claimRepository.update(id, this.getClaim(new Claim, updateClaimDto));
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    if (!!await this.getClaimById(id)) {
      return this.claimRepository.delete(id);
    }
  }

  getClaim(currentClaim: Claim, claim: CreateClaimDto | UpdateClaimDto): Claim {
    currentClaim.claim = claim.claim;
    return currentClaim;
  }

  async getClaimById(id: number): Promise<Claim> {
    try {
      return await this.claimRepository.findOneOrFail(id);
    } catch (err) {
      throw new IdNotFoundException({ id });
    }
  }

}
