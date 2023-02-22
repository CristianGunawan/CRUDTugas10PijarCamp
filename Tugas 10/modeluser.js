const mongoose = require('mongoose')

const produkSchema = new mongoose.Schema({
    nama: String,
    keterangan: String,
    harga: String,
    jumlah: String
})

const produkModel = mongoose.model('produkModel', produkSchema)

module.exports = produkModel

