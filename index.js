const express = require("express")
const port = 3001
const uuid = require("uuid")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

const orders = []

app.get('/orders', (request, response) => {
    return response.json(orders)
})

app.post('/orders', (request, response) => {
    const { order, name } = request.body

    const user = { id: uuid.v4(), order, name }

    orders.push(user)

    return response.status(201).json(user)
})

app.put('/orders/:id', (request, response) => {
    const { id } = request.params
    const { order, name } = request.body

    const updatedOrder = { id, order, name }

    const index = orders.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }

    orders[index] = updatedOrder

    return response.json(updatedOrder)
})

app.delete('/orders/:id', (request, response) => {
    const { id } = request.params

    const index = orders.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }

    orders.splice(index,1)

    return response.status(204).json()
})


app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})