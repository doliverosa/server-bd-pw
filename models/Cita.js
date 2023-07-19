import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Cita = sequelize.define("Cita", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigo: {
        type: DataTypes.STRING
    },
    nombre: {
        type: DataTypes.STRING
    },
    profesor: {
        type: DataTypes.STRING
    },
    fecha: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})
