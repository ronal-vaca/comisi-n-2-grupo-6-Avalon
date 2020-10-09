module.exports = (sequelize,dataTypes)=>{
    let alias = "Categorias"
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type:dataTypes.STRING(45),
            allowNull:false
        }
    }
    let config = {
        tableName : "categorias",
        timestamps:false
    }

    const Categoria = sequelize.define(alias,cols,config);

    Categoria.associate = function(models){
        Categoria.hasMany(models.Productos,{
            as:"productos",
            foreingKey:"categoria_id"
        })
    }
    return Categoria
}