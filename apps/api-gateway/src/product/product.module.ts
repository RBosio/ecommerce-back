import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { RmqModule } from '@app/common';
import { PRODUCT_SERVICE } from '../constants';

@Module({
  imports: [RmqModule.register(PRODUCT_SERVICE)],
  controllers: [ProductController],
})
export class ProductModule {}
