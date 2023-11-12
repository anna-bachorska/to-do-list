import { Test, TestingModule } from '@nestjs/testing';
import { TasksModule } from '../src/tasks/tasks.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('Tasks', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TasksModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST tasks', async () => {
    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send({ content: 'Nowe zadanie' });

    expect(response.status).toBe(201); 
    expect(response.body).toHaveProperty('id');
    expect(response.body.content).toBe('Nowe zadanie');
    expect(response.body.done).toBe(false);
  });

  it('/DELETE tasks/:id', () => {
    const taskId = 1;
    return request(app.getHttpServer())
      .delete(`/tasks/${taskId}`)
      .expect(200); 
  });

  it('/PATCH tasks/:id', () => {
    const taskId = 1;
    return request(app.getHttpServer())
      .patch(`/tasks/${taskId}`)
      .send({ done: true })
      .expect(200)
      .expect(res => {
        expect(res.body.done).toBe(true);
      });
  });

});