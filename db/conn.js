const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('sistema','root','senai',{
    host: 'localhost',
    dialect: 'mysql'
})

// sequelize.authenticate().then(()=>{
//     console.log('Conexão realizada com sucesso!')
// }).catch((error)=>{
//     console.error('Erro de conexão!'+error)
// })

module.exports = sequelize