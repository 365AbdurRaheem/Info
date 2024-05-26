const { Contacts } = require("@capacitor-community/contacts");
const { Capacitor } = require('@capacitor/core');

const fetchContacts = async () => {
    const projection = {
        name: true,
        phones: true,
        PostalAddress: true,
    };

    if (Capacitor.getPlatform() === 'web') {
        console.error("Contacts API is not implemented on the web.");
        return;
    }

    try {
        const result = await Contacts.getContacts({ projection });
        console.log(result);
    } catch (error) {
        console.error("Error fetching contacts:", error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('fetchContactsButton');
    button.addEventListener('click', fetchContacts);
});
