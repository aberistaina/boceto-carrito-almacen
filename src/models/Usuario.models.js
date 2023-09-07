import { DataTypes} from "sequelize";
import sequelize from "../database/database.js";


//Usuario

const Usuario = sequelize.define(
    "Usuarios",
    { 
        nombre:{
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email:{
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        password:{
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        admin:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                notEmpty: true,
            }
        },
    },
    {
        timestamps: false,
        tableName: "Usuarios"
    }
)

export default Usuario