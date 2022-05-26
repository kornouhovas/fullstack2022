const { response, request } = require('express')
const express = require('express')
const morgan = require('morgan')

morgan.token('data', function getData(request) {
    if (request.body.name ) {
        return JSON.stringify(request.body)
    }
    else return ' '
})

const app = express()

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const persone = persons.find(persone => persone.id === id)

    if (persone) {
        response.json(persone)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(persone => persone.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const randomNumber = Math.random() * (Number.MAX_SAFE_INTEGER - 0) + 0
    return Math.floor(randomNumber)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    for (const p of persons) {
        if (p.name === body.name) {
            return response.status(400).json({
                error: 'name must be unique'
            })
        }
    }


    const persone = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(persone)
    response.json(persone)
})

// definition port of server
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)