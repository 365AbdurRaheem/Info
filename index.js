const { Contacts } = require("@capacitor-community/contacts");
const { Capacitor } = require('@capacitor/core');
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

const fetchContacts = async (req, res) => {
    const projection = {
        name: true,
        phones: true,
        PostalAddress: true,
    };

    //if (Capacitor.isNativePlatform()) {
         try {
          const result = await Contacts.getContacts({ projection });
          res.json(result.contacts);
         } catch (error) {
        res.json({ error: `Error fetching contacts: ${error.message}` });
        }
  //  }
   // else
  //  {
     //    return res.send("Not supported in pc/laptop");
  //  }
};

app.get('/', (req, res) => {
    res.redirect("public/index.htm");
});

app.get('/public/index.htm/doit', fetchContacts);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
