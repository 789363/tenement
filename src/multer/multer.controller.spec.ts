import { Test, TestingModule } from '@nestjs/testing';
import { MulterController } from './multer.controller';

describe('MulterController', () => {
  let controller: MulterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MulterController],
    }).compile();

    controller = module.get<MulterController>(MulterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
