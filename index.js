const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const Usuario = require('./models/Usuario')

const PORT = 3000
const hostname = 'localhost'
let log = false
//=======================EXPRESS=========================
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
//=======================HANDLEBARS======================
app.engine('handlebars',exphbs.engine())
app.set('view engine', 'handlebars')
//=======================================================
app.post('/login',async(req,res)=>{
    const email = req.body.email
    const senha = req.body.senha

    console.log(email,senha)

    const pesq = await Usuario.findOne({raw:true,where:{email:email,senha:senha}})
    console.log(pesq)
    if(pesq == null){
        log = false
        res.render('login',{log})
    }else{
        log = true
        res.render('sistema',{log,nome:pesq.nome})
    }
})


app.get('/',(req,res)=>{
    log = false
    res.render('login',{log})
})
//=======================================================
conn.sync().then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`O servidor esta rodando ${hostname}:${PORT}`)
    })
}).catch((error)=>{
    console.error('Erro na conexão com banco de dados'+error)
})
