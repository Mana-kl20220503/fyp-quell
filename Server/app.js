import { createServer } from 'node:http'
import cors from 'cors'
import express from 'express'
import { Prisma, PrismaClient } from '@prisma/client'

const app = express()
const server = createServer(app)

const prisma = new PrismaClient()

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
)

// BUILD REST API BELOW

// API/Endpoint 1 
app.get('/testdb', async (req, res) => {
    const testCreate = await prisma.test.create({
        data: {
            someKey: 'someValue1'
        }
    })

    res.send('OK')
})

// API/Endpoint 2
app.get('/printHi', async (req, res) => {
    
    console.log('Hi')

    res.send('OK')
})



server.listen(3000, () =>
  console.log(`
Server ready at: http://localhost:3000`),
)
