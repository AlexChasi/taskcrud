import { DataTypes } from "sequelize";

import db from "../utils/database.js";

const Task = db.define("task", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    title: {
        type: DataTypes.STRING(40),
        allowNull: false, 
    },

    description: {
        type: DataTypes.STRING(100),
        allowNull: false, 
    },

    completed: {
        type: DataTypes.BOOLEAN(),
        allowNull: false, 
    },
});

export default Task;