// memanggil module fs(filesystem) dengan metode require
const fs = require("fs");

// memanggil module validator
const validator = require("validator");

//membuat varible untuk path
const dirPath = "./data";
// membuat logika jika path belum ada maka buat path
if (!fs.existsSync(dirPath)) {
  //membuat folder
  fs.mkdirSync(dirPath);
}

//membuat fungsi loadData
const loadContact = () => {
  // membaca file contacts.json
  const file = fs.readFileSync("./data/contacts.json", "utf8");
  const contacts = JSON.parse(file);
  return contacts;
};

//membuat logika apakah file constacts.json sudah dibuat atau belum
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  //membuat file
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

//membuat fungsi menampilkan semua data
const show = () => {
  //memanggil fungsi loadContact
  const contacts = loadContact();
  // mengembalikan nilai contacts
  return contacts;
};

// membuat fungsi detail dengan parameter name
const detail = (name) => {
  // memanggil dungsi loadContact dan memasukannya ke dalam variable contacts
  const contacts = loadContact();
  /* membuat variable untuk menampung data yang dicari dengan fungsi .find()
      apabila data dari contacts sama dengan parameter name maka akan dimasukan ke dalam variable*/
  const detailData = contacts.find((data) => data.name == name);
  //mengembalikan nilai dari variable detailData
  return detailData;
};

// membuat function untuk menyimpan data
const savedata = (name, email, tlp) => {
  //memanggil function loadData dan menyimpannya di variable contacts
  const contacts = loadContact();
  // membuat logika jika terjadi duplikat data
  const duplicate = contacts.find((contact) => contact.name === name);
  if (duplicate) {
    return { msg: "Data already exists" };
  } 
  // jika tidak ada duplikat data maka, data akan disimpan ke json
  else {
    const contact = { name, email, tlp };
    contacts.push(contact);
    console.log("data added");
    //menuliskan data kedalam file contacts.json
    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
    return {msg: undefined}
  }
};

//meng-export module
module.exports = { show, detail, savedata };
