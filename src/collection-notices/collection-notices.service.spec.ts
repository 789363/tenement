import { Test, TestingModule } from '@nestjs/testing';
import { CollectionNoticesService } from './collection-notices.service';

describe('CollectionNoticesService', () => {
  let service: CollectionNoticesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionNoticesService],
    }).compile();

    service = module.get<CollectionNoticesService>(CollectionNoticesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
