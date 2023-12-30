import { Test, TestingModule } from '@nestjs/testing';
import { CollectionNoticeService } from './collection-notices.service';

describe('CollectionNoticesService', () => {
  let service: CollectionNoticeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionNoticeService],
    }).compile();

    service = module.get<CollectionNoticeService>(CollectionNoticeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
