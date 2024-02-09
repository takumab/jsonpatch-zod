import express from 'express';
import {applyPatch, Operation} from 'json-joy/es6/json-patch';

const patch: Operation[] = [
    {op: 'add', path: '/firstname', value: 'Tacuma'},
    {op: 'add', path: '/lastname', value: 'Bell'},
    {op: 'remove', path: '/fname'},
    {op: 'remove', path: '/lname'},
];

const data = [
    {
        id: 1,
        fname: 'Takuma',
        lname: 'Bell',
        jobTitle: 'Software dev'
    },
    {
        id: 2,
        fname: 'James',
        lname: 'Harden',
        jobTitle: 'Hooper'
    },
    {
        id: 3,
        fname: 'Mark',
        lname: 'Ronson',
        jobTitle: 'Producer'
    }
]

const app = express();
app.use(express.json())

const port = 3000;

app.get('/', (req, res) => {
    res.json(data)
})

app.get('/user/:id', (req, res) => {
    const user = data.filter((user) => user.id.toString() === req.params.id);
    res.json(user)
})

app.put('/user/:id', (req, res) => {
    const result = applyPatch(req.body, patch, {mutate: false});
    res.json(result.doc)
})

// with json patch
app.patch('/user/:id', (req, res) => {
    const patch: Operation[] = [
        {op: 'add', path: '/firstname', value: `${req.body.fname}`},
        {op: 'remove', path: '/fname'},
    ];

    const result = applyPatch(req.body, patch, {mutate: false});

    res.json(result.doc)
})

// without json patch
app.put('/users/:id', (req, res) => {
    const mapUser = {
        id: `${req.params.id}`,
        jobTitle: `${req.body.jobTitle}`,
        firstname: `${req.body.fname}`,
        lastname: `${req.body.lname}`
    }

    res.json(mapUser)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})