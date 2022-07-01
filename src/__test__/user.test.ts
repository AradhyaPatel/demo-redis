import * as request from 'supertest';
import Server from '../server';
const express = require('express');
import redis from 'redis-mock';
import { mockDeleteRequest, mockGetResponse, mockPostRequest, mockUpdateRquest } from "../mock/mockData";


describe('User controller', () => {
    // const sandbox = sinon.createSandbox();
    const server = new Server().bootstrap();

    jest.mock('redis', () => redis)

    describe('checking post user routes', () => {

        it('Should successfully get status code 200', async () => {
            const response = await request(server).post('/api/user/create').send(mockPostRequest)
            expect(response.status).toEqual(200);
            expect(response.body.message).toEqual("user added successfully");
        });

        it('Should throw errpr when empty object is added', async () => {
            const response = await request(server).post('/api/user/create').send()
            expect(response.body.message).toEqual("ERR wrong number of arguments for 'hset' command");
        });
    });

    describe('checking post user routes', () => {

        it('Should successfully get status code 200', async () => {
            const response = await request(server).get('/api/user/get')
            expect(response.status).toEqual(200);
        });

        it('Should successfully get all users', async () => {
            const response = await request(server).get('/api/user/get')
            expect(response.body.data).toEqual(mockGetResponse);
        });
    });

    describe('checking patch user routes', () => {
        it('Should successfully get status code 200', async () => {
            const response = await request(server).patch('/api/user/update').send(mockUpdateRquest)
            expect(response.status).toEqual(200);
            expect(response.body.message).toEqual(" user field updated successfully");
        });

        it('Should throw error when no key is passed', async () => {
            const response = await request(server).patch('/api/user/update').send()
            expect(response.body.message).toEqual("ERR wrong number of arguments for 'hset' command");
        });
    });

    describe('checking delete user routes', () => {
        it('Should successfully get status code 200', async () => {
            const response = await request(server).delete('/api/user/delete').send(mockDeleteRequest)
            expect(response.status).toEqual(200);
            expect(response.body.message).toEqual("user field deleted successfully");
        });

        it('Should throw error when no key is passed', async () => {
            const response = await request(server).delete('/api/user/delete').send({})
            expect(response.body.message).toEqual("Provide key to delete");
        });
    });

});