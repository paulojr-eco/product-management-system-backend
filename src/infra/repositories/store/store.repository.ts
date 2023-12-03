import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../../entities/store.entity';
import { StoreRepository } from 'src/main/repositories/store.repository.interface';

@Injectable()
export class DbStoreRepository implements StoreRepository {
  constructor(
    @InjectRepository(Store)
    private readonly storeEntityRepository: Repository<Store>,
  ) {}

  async findById(id: number): Promise<Store> {
    return await this.storeEntityRepository.findOneOrFail({
      where: { id: id },
    });
  }
}
