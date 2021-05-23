import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ClaimEntity } from './entities/claim.entity';
import { ObjectNotFoundException } from '../exceptions/object-not-found-exception';
// import { ClaimEntity } from './interfaces/claim.interface';

@Injectable()
export class ClaimsService {

  constructor(
    @InjectRepository(ClaimEntity)
    private readonly claimRepository: Repository<ClaimEntity>,
  ) {
  }

  async create(createClaimDto: CreateClaimDto): Promise<ClaimEntity> {
    const { claim } = createClaimDto;
    const foundClaim = await this.claimRepository.findOne({ claim });

    if (foundClaim) {
      throw new HttpException('ClaimEntity exists', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newClaim = new ClaimEntity();
    Object.assign(newClaim, createClaimDto);
    return this.claimRepository.save(newClaim);
  }

  async findAll(): Promise<ClaimEntity[]> {
    return this.claimRepository.find();
  }

  async findById(id: number): Promise<ClaimEntity> {
    return this.claimRepository.findOne(id);
  }

  async update(id: number, updateClaimDto: UpdateClaimDto): Promise<UpdateResult> {
    if (!!await this.getClaimById(id)) {
      return this.claimRepository.update(id, updateClaimDto);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    if (!!await this.getClaimById(id)) {
      return this.claimRepository.delete(id);
    }
  }

  async getClaimById(id: number): Promise<ClaimEntity> {
    try {
      return await this.claimRepository.findOneOrFail(id);
    } catch (err) {
      throw new ObjectNotFoundException({ id });
    }
  }

}
