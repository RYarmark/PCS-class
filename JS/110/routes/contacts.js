var express = require('express');
var router = express.Router();

// will come from db eventually
let contacts = [
    { id: 1, first: 'Joe', last: 'Biden', email: 'jbiden@whitehouse.gov', phone: '1234567890' },
    { id: 2, first: 'Kamala', last: 'Harris', email: 'kharris@whitehouse.gov', phone: '9876543210' }
];

let nextId = contacts.length + 1;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('layout', {
        title: 'Contacts',
        contacts,
        noContacts: contacts.length === 0,
        partials: { content: 'contacts' }
    });
});

router.get('/addContact', function (req, res, next) {
    res.render('layout', {
        title: 'Add Contact',
        partials: { content: 'addContact' }
    });
});

router.post('/addContact', function (req, res, next) {
    req.body.id = nextId++;
    contacts.push(req.body);
    res.writeHead(301, { location: '/contacts' });
    res.end();
});

router.get('/editContact/:id', function (req, res, next) {
    res.render('layout', {
        title: 'Edit Contact',
        contact: contacts[req.params.id - 1],
        partials: { content: 'addContact' }
    })
});

router.post('/editContact/:id', function (req, res, next) {
    req.body.id = req.params.id;
    contacts[req.params.id - 1] = (req.body);
    res.writeHead(301, { location: '/contacts' });
    res.end();
});
router.get('/api/contacts', function (req, res, next) {
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(contacts));
})

router.get('/deleteContact/:id', function (req, res, next) {
    contacts = contacts.filter(c => c.id !== +req.params.id);
    res.writeHead(301, { location: '/contacts' });
    res.end();
});


module.exports = router;