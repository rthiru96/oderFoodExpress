import { Application } from 'express';
import { assert } from 'chai';
import { Order } from '../src/entity/order';
import { IOrder } from '../src/interface/order.interface';
import { createConnection, getConnectionOptions } from 'typeorm';
import supertest from 'supertest';
import { Server } from '../src/server';
import { dbConnection } from '../src/dbServer';

let app: Application;

before(async () => {
  try {
    await dbConnection();
    app = new Server().app;
    await app.listen(4000);
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
        .send()
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done());
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
            assert.isObject(order, 'user should be an object');
            assert(order.orders === testOrder.orders, 'orders does not match');
            assert(order.total === testOrder.total, 'total does not match');
            testOrderModified = order;
            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });

  describe('GET /order', () => {
    it('responds with user array', (done) => {
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
            assert(orders[0].orders === testOrder.orders, 'orders does not match');
            assert(orders[0].total === testOrder.total, 'total does not match');
            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });

  describe('GET /order/:id', () => {
    it('responds with single order', (done) => {
      supertest(app)
        .get(`/order/${testOrderModified.id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          try {
            if (err) throw err;

            const status = res.statusCode;
            const orders: IOrder[] = res.body;

            // Assert status
            assert(status === res.statusCode, 'status does not match');

            // Assert user
            assert.isObject(orders, 'order should be an object');
            assert(orders.orders === testOrderModified.orders, 'oders does not match');
            assert(orders.total === testOrderModified.total, 'total does not match');

            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });

  describe('DELETE /order/1', () => {
    it('responds with status 204', (done) => {
      supertest(app)
        .delete(`/order/${testOrderModified.id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          try {
            if (err) throw err;

            const status = res.statusCode;

            // Assert status
            assert(status === 204, 'status does not match');

            return done();
          } catch (err) {
            return done(err);
          }
        });
    });

    it('responds with status 404', (done) => {
      supertest(app)
        .delete(`/oder/${testOrderModified.id}`)
        .end((err, res) => {
          try {
            if (err) throw err;

            const status = res.statusCode;

            // Assert status
            assert(status === 404, 'status does not match');

            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });
});
