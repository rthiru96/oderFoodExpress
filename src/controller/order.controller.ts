import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Order } from '../entity/order';
import { NotFoundError } from '../common/errorValidation/errors';



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
      return this.oderRepository.save(request.body);
    } catch (err) {
      throw err;
    }
  }

 
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
