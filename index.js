const { Contacts } = require("@capacitor-community/contacts");
const { Capacitor } = require('@capacitor/core');
const express=require("express");
const app=express();

app.get('/doit', (req, res) => {
    fetchContacts();
})

const fetchContacts = async () => {
    const projection = {
        name: true,
        phones: true,
        PostalAddress: true,
    };

    if (Capacitor.getPlatform() === 'web') {
        return;
    }

    try {
        const result = await Contacts.getContacts({ projection });
        res.send(JSON.stringify(result.contacts, null, 2));
    } catch (error) {
        res.send(`Error fetching contacts: ${error}`);
    }
};
