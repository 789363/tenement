import { Test, TestingModule } from '@nestjs/testing';
import { CollectionNoticesController } from './collection-notices.controller';

describe('CollectionNoticesController', () => {
  let controller: CollectionNoticesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionNoticesController],
    }).compile();

    controller = module.get<CollectionNoticesController>(CollectionNoticesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
