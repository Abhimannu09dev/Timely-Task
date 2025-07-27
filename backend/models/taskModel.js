const mongoose =require("mongoose");
const{Schema} =mongoose;

const taskSchema = new Schema({
    taskName:{
        type: String,
        required: true,
        minLength: 1,
        maxLength: 500,
        trim: true,
    },
    status:{
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    },
    dueDate:{
        type: Date,
        required: false,
    },
    priority: {
        type: String,
        enum: ["high","medium", "low"],
        default: "medium",
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},
    {
        timestamps: true,
    });
taskSchema.index({user: 1, status: 1});
const Tasks = mongoose.model('Task', taskSchema);
module.exports = Tasks;