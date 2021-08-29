import { Application } from 'express';
import { assert,expect } from 'chai';
import { Order } from '../src/entity/order';
import { IOrder } from '../src/interface/order.interface';
import { createConnection, getConnectionOptions } from 'typeorm';
import supertest from 'supertest';
import { Server } from '../src/server';
import { dbConnection } from '../src/dbServer';
import * as chai from 'chai';
import chaiHttp from 'chai-http';
let app: Application;

before(async () => {
  try {
    await dbConnection();
    app = new Server().app;
    await app.listen(4000);
    chai.should();
    chai.use(chaiHttp);
  } catch (err) {
    console.log(err);
  }
});
// import 'module-alias/register';

describe('Testing user component', () => {
  const testOrder: IOrder = Order.mockTestBoard();
  let testOrderModified: IOrder;

  describe('POST /order', () => {
    it('responds with status 400', (done) => {
      supertest(app)
        .post('/order')
        .set('Accept', 'application/json')
        .send()
        .end(function (err, res) {
          expect(res).to.have.status(400);
          done();
        })
    });

 
    it('responds with new order', (done) => {
      supertest(app)
        .post('/order')
        .send(testOrder)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .end((err, res) => {
          try {
            if (err) throw err;
            const status = res.statusCode;
            const order: Order = res.body;
            // Assert status
            assert(status === res.status, 'status does not match');

            // Assert user
            assert.isObject(order, 'order should be an object');
            assert(order.total === testOrder.total, 'total does not match');
            testOrderModified = order;
            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
 

  describe('GET /order', () => {
    it('responds with order array', (done) => {
      supertest(app)
        .get('/order')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;

            const status = res.statusCode;
            const orders: IOrder[] = res.body;

            // Assert status
            assert(status === res.status, 'status does not match');

            // Assert users
            assert.isArray(orders, 'orders should be an array');
            assert(JSON.stringify(orders[7].orders) === JSON.stringify(testOrder.orders), 'orders does not match');
            assert(orders[7].total === testOrder.total, 'total does not match');
            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });



  
  });
});
