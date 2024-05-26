const { Contacts } = require("@capacitor-community/contacts");
const { Capacitor } = require('@capacitor/core');
const express=require("express");
const PORT=3000 || process.env.PORT;

const app=express();

app.use(express.static("public"));

const fetchContacts = async (req, res) => {
    const projection = {
        name: true,
        phones: true,
        PostalAddress: true,
    };

    if (Capacitor.getPlatform() === 'web') {
        res.send("Not supported in pc/laptop");
    }

    try {
        const result = await Contacts.getContacts({ projection });
        res.send(JSON.stringify(result.contacts));
    } catch (error) {
        res.send(`Error fetching contacts: ${error}`);
    }
};
app.get('/', (req, res) => {
    res.redirect("public/index.htm")
})
app.get('/index.htm/doit', (req, res) => {
    fetchContacts(req, res);
}).listen(3000)
console.log("Listening on "+PORT)
