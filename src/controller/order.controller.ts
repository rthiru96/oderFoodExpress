import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Order } from '../entity/order';
import { NotFoundError } from '../common/errorValidation/errors';

// import { streamUpload } from '../utils/mediaUpload';

export class OrderController {
  private oderRepository = getRepository(Order);
  async all() {
    return this.oderRepository.find();
  }

  async one(request: Request) {
    return this.oderRepository.findOne(request.params.id);
  }

  async save(request: Request) {
    try {
      // if uploading a file
      // const mediaUpload = await streamUpload(request);
      return this.oderRepository.save(request.body);
    } catch (err) {
      throw err;
    }
  }

  // using query builder <createQueryBuilder>
  async remove(request: Request, response: Response) {
    try {
      const data = await this.oderRepository
        .createQueryBuilder()
        .delete()
        .from(Order)
        .where('id = :id', { id: request.params.id })
        .execute();
      if (data.affected === 1) {
        return 'record successfully deleted';
      } else {
        throw new NotFoundError();
      }
    } catch (err) {
      throw err;
    }
  }
}
