import {Request, Response} from 'express';
import User, {IUser} from '../models/User';

export const createUser = async (req: Request, res: Response) => {
    try {
        let body = req.body;
        let userExists = await User.exists({email: body.email});
        if(userExists){
            return res.status(200).send({"success": false, "data": null, "message": "Usuario ya existe"})
        }
        const user: IUser = new User({
            firstName: body.firstName,
            lastName: body.lastName,
            password: body.password,
            email: body.email,
            role: "USER",
            createdDate: new Date()
        })
        if(user.password){
            user.password = await user.encryptPassword(user.password);
        }
        const savedUser:IUser = await user.save();
        if(savedUser){
            return res.status(200).send({"success": true, "data": savedUser, "message": "Usuario creado"})
        }
    } catch (error:any) {
        if(error.code == 11000 || error.code == 11001){
            return res.status(400).json({"success": false, "data": null, "message": "Usuario ya existe"})
        }else{
            return res.status(400).json({"success": false, "data": null, "message": "Error al crear un usuario"})
        }
    }
}
export const getUsers = async(req: Request, res: Response) => {
    try {
        const users = await User.find({});
        return res.status(200).json({"success": true, "data": users, "message": "Lista de usuarios"})
    } catch (error) {
        return res.status(400).json({"success": false, "data": null, "message": "Error al listar los usuarios"})
    }
}
export const getUser = async(req: Request, res: Response) => {
    try {
        let id = req.params._id
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({"success": false, "data": null, "message": "El usuario no existe"})
        }else{
            return res.status(200).json({"success": true, "data": user, "message": "Usuario encontrado"})
        }
    } catch (error) {
        return res.status(404).json({"success": false, "data": null, "message": "El usuario no existe "})  
    }
    
}
export const updateUser = async(req: Request, res: Response) => {
    try {
        let body = req.body;
        const usera = new User();
        body.password = await usera.encryptPassword(body.password);
        const id = req.params._id;
        const user = User.findByIdAndUpdate(id, body, {new: true},(err, user) => {
            if(err){
                return res.status(400).json({"success": false, "data": null, "message": "Error al modificar el usuario"});
            }
            if(!user){
                return res.status(404).json({"success": false, "data": null, "message": "Usuario no encontrado"});
            }else{
                return res.status(200).json({"success": true, "data": user, "message": "Datos modificados"});
            }
        });
    } catch (error) {
        return res.status(400).json({"success": false, "data": null, "message": "Error al modificar el usuario"})
    }
    
}
export const deleteUser = (req: Request, res: Response) => {
    const id = req.params._id;
    const user = User.findByIdAndDelete(id, {}, (err, user) => {
        if(err){
            return res.status(400).json({"success": false, "data": null, "message": "Error al eliminar el usuario"})
        }
        if(user){
            return res.status(200).json({"success": true, "data": null, "message": "Usuario eliminado"})
        }else{
            return res.status(400).json({"success": false, "data": null, "message": "Error al eliminar el usuario"})
        }
    })
}