import { DataTypes} from "sequelize";
import sequelize from "../database/database.js";


//Productos

const Producto = sequelize.define(
    "Productos",
    { 
        nombre:{
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        descripcion:{
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        precio:{
            type: DataTypes.DECIMAL(11,2),
            allowNull: false,
            validate: {
                min: 0,
                notEmpty: true,
            }
        },
        stock:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                notEmpty: true,
            }
        },
        imagen:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "../public/assets/img/imgdefault.jpg",
            validate: {
                notEmpty: true,
            }
        },
    },
    {
        timestamps: true,
        tableName: "Productos"
    }
)

export default Producto