const { log } = require('node:console');
const fs = require('node:fs/promises');
const path = require('node:path');
// const crypto = require('node:crypto');
const { v4: uuidv4 } = require('uuid');


const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
    const data = await fs.readFile(contactsPath, {encoding: 'utf-8'});

    let contacts = JSON.parse(data);

        // console.log('List of contacts: ');
        // console.log( contacts);
     console.table(contacts);
     return contacts
    };
function writeContacts(contacts) {
    return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function getContactById(id) {
    const contacts = await listContacts();

     const contact = contacts.find((contact)=> contact.id === id);
     console.table(contact); 
}
async function addContact(name, email, phone) {
    const contacts = await listContacts();
    let newContact = {
        //id: crypto.randomUUID,
        // id: contacts.length + 1,
         id: uuidv4(),
       name: name,
       email: email,
       phone: phone,
   }
   console.table(newContact);
    contacts.push(newContact);
    await writeContacts(contacts)
     return newContact 
    
    
}

async function removeContact(contactId) {
    const contacts = await listContacts();

     const index = contacts.findIndex((contact)=> contact.id === contactId);
     if(index === -1){
        return undefined;
     }
     console.table(contacts[index]); 
     contacts.splice(index, 1)
     await writeContacts(contacts)
}
//removeContact(11)
//addContact('Alex Beketov', 'alex21-82@mail.ru', '0978556455')
 //getContactById("qdggE76Jtbfd9eWJHrssH")
// writeContacts((  {id: 1, title: "Title1", author: "Author1"}))
 //listContacts()
module.exports = {
    listContacts,
    getContactById,
    removeContact,
     addContact,
};

