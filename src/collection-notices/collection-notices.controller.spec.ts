import { Test, TestingModule } from '@nestjs/testing';
import { CollectionNoticeController } from './collection-notices.controller';

describe('CollectionNoticesController', () => {
  let controller: CollectionNoticeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionNoticeController],
    }).compile();

    controller = module.get<CollectionNoticeController>(CollectionNoticeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
