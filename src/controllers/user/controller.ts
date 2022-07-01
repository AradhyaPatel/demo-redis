import { Request, Response } from 'express';
import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

class UserController {

    static instance: UserController;
    static getInstance() {
        if (UserController.instance) {
            return UserController.instance;
        }
        UserController.instance = new UserController();
        return UserController.instance;
    }

    public async get(req: Request, res: Response) {

        try {
            const data = await client.hGetAll("user");
            if (data !== null) {
                res.send({
                    status: 200,
                    data: data,
                })
            }
        } catch (err) {
            res.send({
                status: 404,
                message: "NO user found",
            })
        }
    }

    public async create(req: Request, res: Response) {
        try {
            await client.hSet("user", req.body);
            if (req.body !== {}) {
                res.send({
                    status: 200,
                    message: "user added successfully",
                })
            } else {
                res.status(404).send({
                    message: "Please provide user data",
                })
            }
        } catch (err) {
            res.status(404).send({
                message: err.message
            })

        }
    }

    public async update(req: Request, res: Response) {
        try {
            if (req.body !== {}) {
                await client.hSet("user", req.body);
                res.status(200).send({
                    message: " user field updated successfully"
                })
            }
            else {
                res.status(404).send({
                    message: " Provide key to update"
                })
            }
        } catch (err) {
            res.status(404).send({
                message: err.message
            })
        }
    }

    public async delete(req: Request, res: Response) {

        try {
            const { key } = req.body;
            if (req.body !== {}) {
                await client.HDEL("user", key);
                res.send({
                    status: 200,
                    message: "user field deleted successfully"
                })
            } else {
                res.status(404).send({
                    message: "Provide key to delete"
                })
            }
        } catch (err) {
            res.status(404).send({
                message: "Provide key to delete"
            })
        }
    }


}

export default UserController.getInstance();