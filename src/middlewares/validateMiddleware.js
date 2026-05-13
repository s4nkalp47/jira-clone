import { z } from "zod"

const validate = (schema) => (req,res,next) => {
    try{
        schema.parse(req.body);
        next();
    }
    catch(error){
        next(error);
    }
}