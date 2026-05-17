import Activity from "../models/Activity.js";

const logActivity = async(userId,taskId,action) => {
    try{
        await Activity.create({
        user: userId,
        task: taskId,
        action: action
    });
    }
    catch(error){
        console.log(error);
    }
}

export default logActivity;