const express = require('express')
const methodOverride = require('method-override')
const app = express();

const mongoose= require('mongoose');
const produkModel = require('./modeluser')
mongoose.connect('mongodb://localhost:27017/pijarcamp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('berhasil terhubung ke database')
})
.catch((err)=>{
    console.log('error')
    console.log(err)
})

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))


app.listen(3000, ()=>{
    console.log('berhasil terhubung ke server')
})

app.get('/home', async (req,res)=>{
    const cariProduk1 = await produkModel.find()
    res.render('beranda.ejs', {cariProduk1})
})

app.get('/tambahproduk', (req,res)=>{
    res.render('tambahproduk.ejs')
})

app.post('/tambahproduk', (req,res)=>{
    const {nama1, keterangan1, harga1, jumlah1} = req.body;
    const produkBaru = new produkModel({
        nama: nama1,
        keterangan: keterangan1,
        harga: harga1,
        jumlah: jumlah1

    })
    produkBaru.save()
    res.redirect('/home')
})

app.get('/:id/updateproduk', async(req,res)=>{
    const {id} = req.params
    const cariUpdateProduk = await produkModel.findById(id)
    res.render('updateproduk.ejs', {cariUpdateProduk})
})


app.put('/:id/updateproduk', async(req,res)=>{
    const {id} = req.params
    const {nama1: nama, keterangan1: keterangan, harga1: harga, jumlah1: jumlah} = req.body;
    const cariProduk = await produkModel.findByIdAndUpdate(id, {nama, keterangan, harga, jumlah}, {runValidators: true, new: true})
    res.redirect('/home')
})

app.delete('/:id/hapusproduk', async(req,res)=>{
    const {id} = req.params
    // const cariProduk = await produkModel.findByIdAndUpdate(id, {nama, keterangan, harga, jumlah}, {runValidators: true, new: true})
    const hapusProduk = await produkModel.findByIdAndDelete(id)
    res.redirect('/home')
})

app.get('/:id/detailproduk', async(req,res)=>{
    const {id} = req.params
    const cariProduk = await produkModel.findById(id)
    res.render('detailproduk.ejs', {cariProduk})
})