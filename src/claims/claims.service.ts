import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Claim } from './entities/claim.entity';
import { ObjectNotFoundException } from '../exceptions/object-not-found-exception';

@Injectable()
export class ClaimsService {

  constructor(
    @InjectRepository(Claim)
    private readonly claimRepository: Repository<Claim>,
  ) {
  }

  async create(createClaimDto: CreateClaimDto): Promise<Claim> {
    const { claim } = createClaimDto;
    const foundClaim = await this.claimRepository.findOne({ claim });

    if (foundClaim) {
      throw new HttpException('Claim exists', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newClaim = new Claim();
    Object.assign(newClaim, createClaimDto);
    return this.claimRepository.save(newClaim);
  }

  async findAll(): Promise<Claim[]> {
    return this.claimRepository.find();
  }

  async findById(id: number): Promise<Claim> {
    return this.claimRepository.findOne(id);
  }

  async update(id: number, updateClaimDto: UpdateClaimDto): Promise<UpdateResult> {
    if (!!await this.getClaimById(id)) {
      const claim = new Claim();
      claim.claim = updateClaimDto.claim;
      return this.claimRepository.update(id, claim);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    if (!!await this.getClaimById(id)) {
      return this.claimRepository.delete(id);
    }
  }

  async getClaimById(id: number): Promise<Claim> {
    try {
      return await this.claimRepository.findOneOrFail(id);
    } catch (err) {
      throw new ObjectNotFoundException({ id });
    }
  }

}
