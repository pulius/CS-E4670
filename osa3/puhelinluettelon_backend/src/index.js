const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

morgan.token('type', function (req, res) { return JSON.stringify(res.body) })

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
]

const generateId = () => {
    const maxId = Math.ceil(Math.random()* 10000)
    return maxId
  }
  
  app.post('/api/persons', morgan('type'), (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (persons.map(p => p.name).includes(body.name)) {
      return response.status(400).json({ 
        error: 'name already exists' 
      })
    }    
  
    const note = {
      id: generateId(),
      name: body.name,
      number: body.number,
      date: new Date(),
    }
  
    persons = persons.concat(note)
  
    response.json(note)
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
    response.status(204).end()
  })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        return response.status(400).json({ 
          error: 'content missing' 
        })
      }
  })

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', morgan('combined'),  (req, res) => {
    res.json(persons)
  })
  
  app.get('/info', (req, res) => {
    res.send(`<h1> Phonebook has info for ${persons.length} People</h1> <h1> ${new Date()}</h1>`
    )
  })  

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
