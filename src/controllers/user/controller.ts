import { Request, Response } from 'express';
import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

class UserController {

    static instance: UserController;
    static getInstance(){
        if(UserController.instance){
            return UserController.instance;
        }
        UserController.instance = new UserController();
        return UserController.instance;
    }

    public async get(req: Request, res: Response){
        try{
            const data = await client.hGetAll("user");
            if(data !== null){
                res.json(data)
            } else {
                res.send("NO user found")
            }
        } catch(err){
            console.error(err);
            
        }
    }

    public async create(req: Request, res: Response){
        try{
            await client.hSet("user",req.body);
            res.send("user added successfully")
        } catch(err){
            console.error(err);
            
        }
    }

    public async update(req: Request, res: Response){
        try{
            await client.hSet("user",req.body);
            res.send(" user field updated successfully")
        } catch(err){
            console.error(err);
            
        }
    }

    public async delete(req: Request, res: Response){
        
        try{
            const {key} = req.body;
            await client.HDEL("user", key);
            res.send("user field deleted successfully")
        } catch(err){
            console.error(err);
            
        }
    }


}

export default UserController.getInstance();