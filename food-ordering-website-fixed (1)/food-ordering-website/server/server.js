import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

const foods = [
  { id: 1, name: 'Chicken Biryani', category: 'Biryani', price: 180, rating: 4.8, time: '25-30 min', description: 'Aromatic basmati rice with flavorful chicken.' },
  { id: 2, name: 'Cheese Pizza', category: 'Pizza', price: 250, rating: 4.8, time: '20-25 min', description: 'Classic pizza topped with cheese and herbs.' },
  { id: 3, name: 'Chicken Burger', category: 'Burger', price: 150, rating: 4.8, time: '15-20 min', description: 'Crispy chicken burger with fresh vegetables.' },
  { id: 4, name: 'French Fries', category: 'Snacks', price: 100, rating: 4.7, time: '10-15 min', description: 'Golden and crispy potato fries.' },
  { id: 5, name: 'Healthy Salad', category: 'Healthy', price: 130, rating: 4.6, time: '10-15 min', description: 'Fresh greens, colorful vegetables and chickpeas.' },
  { id: 6, name: 'Pancake Stack', category: 'Dessert', price: 120, rating: 4.7, time: '15-20 min', description: 'Fluffy pancakes with berries and syrup.' },
  { id: 7, name: 'Chocolate Cake', category: 'Dessert', price: 160, rating: 4.9, time: '10-15 min', description: 'Rich chocolate cake finished with chocolate ganache.' },
  { id: 8, name: 'Iced Coffee', category: 'Drinks', price: 110, rating: 4.6, time: '5-10 min', description: 'Smooth chilled coffee served over ice.' },
  { id: 9, name: 'Veggie Pizza', category: 'Pizza', price: 220, rating: 4.7, time: '20-25 min', description: 'Baked pizza with garden-fresh vegetables.' },
  { id: 10, name: 'Paneer Biryani', category: 'Biryani', price: 160, rating: 4.6, time: '20-25 min', description: 'Spiced basmati rice with tender paneer pieces.' }
]
const orders = []

app.get('/', (_req, res) => res.json({ message: 'Foodie API is running', endpoints: ['/api/foods', '/api/orders'] }))
app.get('/api/foods', (_req, res) => res.json(foods))
app.get('/api/orders', (_req, res) => res.json(orders))
app.post('/api/orders', (req, res) => {
  const { customer, items } = req.body || {}
  if (!customer?.name || !customer?.phone || !customer?.address || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Please provide customer details and at least one cart item.' })
  }
  const normalizedItems = []
  for (const item of items) {
    const food = foods.find(f => f.id === Number(item.id))
    const quantity = Number(item.quantity)
    if (!food || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      return res.status(400).json({ error: 'One or more cart items are invalid.' })
    }
    normalizedItems.push({ id: food.id, name: food.name, price: food.price, quantity })
  }
  const subtotal = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 30
  const order = {
    id: `FD${Date.now().toString().slice(-7)}`,
    customer: { name: String(customer.name).trim(), phone: String(customer.phone).trim(), address: String(customer.address).trim() },
    items: normalizedItems,
    subtotal,
    delivery,
    total: subtotal + delivery,
    createdAt: new Date().toISOString()
  }
  orders.push(order)
  res.status(201).json({ message: 'Order placed successfully', order })
})
app.listen(PORT, () => console.log(`Foodie API running at http://localhost:${PORT}`))
