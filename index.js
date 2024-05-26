import { Contacts } from "@capacitor-community/contacts";
import { Capacitor } from '@capacitor/core';

const fetchContacts = async () => {
    const projection = {
        name: true,
        phones: true,
        PostalAddress: true,
    };

    if (Capacitor.getPlatform() === 'web') {
        displayContacts("Contacts API is not implemented on the web.");
        return;
    }

    try {
        const result = await Contacts.getContacts({ projection });
        displayContacts(JSON.stringify(result.contacts, null, 2));
    } catch (error) {
        displayContacts(`Error fetching contacts: ${error}`);
    }
};

const displayContacts = (content) => {
    const contactsParagraph = document.getElementById('contactsParagraph');
    contactsParagraph.textContent = content;
};

// Add an event listener to the button
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('fetchContactsButton');
    button.addEventListener('click', fetchContacts);
});
