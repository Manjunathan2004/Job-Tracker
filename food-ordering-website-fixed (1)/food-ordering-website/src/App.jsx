import { useMemo, useState } from 'react'
import { Search, ShoppingBag, Plus, Minus, X, Trash2, CheckCircle2, UtensilsCrossed, Clock3, MapPin } from 'lucide-react'
import './App.css'

const foods = [
  { id: 1, name: 'Chicken Biryani', category: 'Biryani', price: 180, rating: 4.8, time: '25-30 min', description: 'Aromatic basmati rice with flavorful chicken.', image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'Cheese Pizza', category: 'Pizza', price: 250, rating: 4.8, time: '20-25 min', description: 'Classic pizza topped with cheese and herbs.', image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Chicken Burger', category: 'Burger', price: 150, rating: 4.8, time: '15-20 min', description: 'Crispy chicken burger with fresh vegetables.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'French Fries', category: 'Snacks', price: 100, rating: 4.7, time: '10-15 min', description: 'Golden and crispy potato fries.', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85' },
  { id: 5, name: 'Healthy Salad', category: 'Healthy', price: 130, rating: 4.6, time: '10-15 min', description: 'Fresh greens, colorful vegetables and chickpeas.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'Pancake Stack', category: 'Dessert', price: 120, rating: 4.7, time: '15-20 min', description: 'Fluffy pancakes with berries and syrup.', image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=85' },
  { id: 7, name: 'Chocolate Cake', category: 'Dessert', price: 160, rating: 4.9, time: '10-15 min', description: 'Rich chocolate cake finished with chocolate ganache.', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85' },
  { id: 8, name: 'Iced Coffee', category: 'Drinks', price: 110, rating: 4.6, time: '5-10 min', description: 'Smooth chilled coffee served over ice.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85' },
  { id: 9, name: 'Veggie Pizza', category: 'Pizza', price: 220, rating: 4.7, time: '20-25 min', description: 'Baked pizza with garden-fresh vegetables.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85' },
  { id: 10, name: 'Paneer Biryani', category: 'Biryani', price: 160, rating: 4.6, time: '20-25 min', description: 'Spiced basmati rice with tender paneer pieces.', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=900&q=85' }
]

// Keep all product cards usable even if a remote image URL is unavailable.
const categories = ['All', 'Biryani', 'Pizza', 'Burger', 'Snacks', 'Healthy', 'Dessert', 'Drinks']
const money = amount => `₹${amount.toLocaleString('en-IN')}`

function App() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState({})
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' })
  const [order, setOrder] = useState(null)
  const [notice, setNotice] = useState('')

  const filteredFoods = useMemo(() => foods.filter(food => {
    const matchesCategory = category === 'All' || food.category === category
    const matchesSearch = `${food.name} ${food.category} ${food.description}`.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  }), [category, search])

  const cartItems = useMemo(() => foods.filter(food => cart[food.id] > 0).map(food => ({ ...food, quantity: cart[food.id] })), [cart])
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 30
  const total = subtotal + delivery

  function addItem(food) {
    setCart(previous => ({ ...previous, [food.id]: (previous[food.id] || 0) + 1 }))
    setNotice(`${food.name} added to cart`)
    window.setTimeout(() => setNotice(''), 1800)
  }
  function changeQuantity(id, amount) {
    setCart(previous => {
      const next = { ...previous }
      const quantity = (next[id] || 0) + amount
      if (quantity <= 0) delete next[id]
      else next[id] = quantity
      return next
    })
  }
  function placeOrder(event) {
    event.preventDefault()
    if (!cartItems.length) return
    const newOrder = { id: `FD${Date.now().toString().slice(-7)}`, customer: { ...customer }, items: cartItems, total, createdAt: new Date().toLocaleString() }
    setOrder(newOrder)
    setCart({})
    setCheckoutOpen(false)
    setCartOpen(false)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Foodie home"><span className="brand-icon"><UtensilsCrossed size={22}/></span><span>foodie<span className="brand-dot">.</span><small>GOOD FOOD, GOOD MOOD</small></span></a>
        <div className="search-box"><Search size={18}/><input aria-label="Search food" placeholder="Search for dishes..." value={search} onChange={e => setSearch(e.target.value)}/>{search && <button className="clear-search" onClick={() => setSearch('')} aria-label="Clear search"><X size={16}/></button>}</div>
        <button className="cart-button" onClick={() => setCartOpen(true)}><ShoppingBag size={19}/><span>Cart</span><b>{itemCount}</b></button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy"><span className="eyebrow">FRESH • FAST • DELICIOUS</span><h1>Your cravings,<br/><em>delivered.</em></h1><p>Discover delicious food from our kitchen, made fresh and delivered right to your door.</p><a className="hero-cta" href="#menu">Explore menu <span>↓</span></a><div className="hero-meta"><span><Clock3 size={16}/> 20–30 min delivery</span><span><MapPin size={16}/> Delivered to your door</span></div></div>
          <div className="hero-art"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=90" alt="Freshly prepared food bowl"/><div className="floating-tag"><span>★ 4.8</span><small>Customer rating</small></div><div className="hero-sticker">Made with<br/>♥ & fresh<br/>ingredients</div></div>
        </section>

        <section id="menu" className="menu-section">
          <div className="section-heading"><div><span className="eyebrow">WHAT ARE YOU IN THE MOOD FOR?</span><h2>Explore our menu</h2></div><span className="menu-count">{filteredFoods.length} delicious choices</span></div>
          <div className="category-row">{categories.map(item => <button key={item} className={`category-pill ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)}>{item}</button>)}</div>
          {filteredFoods.length ? <div className="food-grid">{filteredFoods.map(food => <article className="food-card" key={food.id}>
            <div className="food-image-wrap"><img className="food-image" src={food.image} alt={food.name} loading="lazy" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80' }}/><span className="food-category">{food.category}</span><span className="rating">★ {food.rating}</span></div>
            <div className="food-info"><div className="food-title-line"><h3>{food.name}</h3><span className="food-time"><Clock3 size={13}/>{food.time}</span></div><p>{food.description}</p><div className="food-card-bottom"><strong>{money(food.price)}</strong>{cart[food.id] ? <div className="quantity-control"><button onClick={() => changeQuantity(food.id, -1)} aria-label={`Remove one ${food.name}`}><Minus size={15}/></button><b>{cart[food.id]}</b><button onClick={() => changeQuantity(food.id, 1)} aria-label={`Add one ${food.name}`}><Plus size={15}/></button></div> : <button className="add-button" onClick={() => addItem(food)}><Plus size={17}/> Add</button>}</div></div>
          </article>)}</div> : <div className="empty-results"><Search size={32}/><h3>No dishes found</h3><p>Try another search or choose a different category.</p><button onClick={() => {setSearch('');setCategory('All')}}>Show all dishes</button></div>}
        </section>
      </main>

      <footer><a className="brand footer-brand" href="#"><span className="brand-icon"><UtensilsCrossed size={20}/></span><span>foodie<span className="brand-dot">.</span><small>GOOD FOOD, GOOD MOOD</small></span></a><p>Made fresh, delivered with love. © {new Date().getFullYear()} Foodie.</p></footer>

      {notice && <div className="toast"><CheckCircle2 size={19}/>{notice}<button onClick={() => setCartOpen(true)}>View cart</button></div>}

      {cartOpen && <div className="overlay" onMouseDown={e => {if(e.target === e.currentTarget) setCartOpen(false)}}><aside className="side-cart"><div className="drawer-header"><div><span className="eyebrow">YOUR SELECTION</span><h2>Your cart ({itemCount})</h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X/></button></div>
        {cartItems.length ? <><div className="cart-list">{cartItems.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name} onError={e => {e.currentTarget.onerror=null;e.currentTarget.src='https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=200&q=80'}}/><div className="cart-item-detail"><h3>{item.name}</h3><span>{money(item.price)} each</span><div className="quantity-control"><button onClick={() => changeQuantity(item.id,-1)} aria-label="Decrease quantity"><Minus size={14}/></button><b>{item.quantity}</b><button onClick={() => changeQuantity(item.id,1)} aria-label="Increase quantity"><Plus size={14}/></button></div></div><strong>{money(item.price * item.quantity)}</strong><button className="remove-item" onClick={() => setCart(previous => {const next={...previous};delete next[item.id];return next})} aria-label={`Remove ${item.name}`}><Trash2 size={16}/></button></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><b>{money(subtotal)}</b></div><div><span>Delivery fee</span><b>{delivery === 0 ? 'FREE' : money(delivery)}</b></div>{subtotal > 0 && subtotal < 499 && <p className="delivery-hint">Add {money(499-subtotal)} more for free delivery.</p>}<div className="total-row"><span>Total</span><strong>{money(total)}</strong></div><button className="primary-button" onClick={() => {setCartOpen(false);setCheckoutOpen(true)}}>Continue to checkout <span>→</span></button><button className="text-button" onClick={() => setCartOpen(false)}>Continue shopping</button></div></> : <div className="empty-cart"><div className="empty-cart-icon"><ShoppingBag size={30}/></div><h3>Your cart is empty</h3><p>Looks like you haven't added anything yet.</p><button className="primary-button" onClick={() => setCartOpen(false)}>Explore the menu</button></div>}
      </aside></div>}

      {checkoutOpen && <div className="overlay" onMouseDown={e => {if(e.target===e.currentTarget)setCheckoutOpen(false)}}><section className="checkout-modal"><div className="drawer-header"><div><span className="eyebrow">ALMOST THERE</span><h2>Delivery details</h2></div><button className="icon-button" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout"><X/></button></div><form onSubmit={placeOrder} className="checkout-form"><label>Full name<input required value={customer.name} onChange={e => setCustomer({...customer,name:e.target.value})} placeholder="Enter your name"/></label><label>Phone number<input required type="tel" pattern="[0-9+() -]{8,18}" value={customer.phone} onChange={e => setCustomer({...customer,phone:e.target.value})} placeholder="Enter your phone number"/></label><label>Delivery address<textarea required rows="3" value={customer.address} onChange={e => setCustomer({...customer,address:e.target.value})} placeholder="House number, street, area"/></label><div className="checkout-total"><span>{itemCount} item(s) · Total</span><strong>{money(total)}</strong></div><button className="primary-button" type="submit">Place order <span>→</span></button><p className="secure-note">Demo checkout — no payment will be collected.</p></form></section></div>}

      {order && <div className="overlay success-overlay"><section className="success-modal"><div className="success-icon"><CheckCircle2 size={42}/></div><span className="eyebrow">ORDER CONFIRMED</span><h2>Thanks, {order.customer.name}!</h2><p>Your food order has been placed successfully.</p><div className="order-number">Order ID <strong>#{order.id}</strong></div><div className="success-order-items">{order.items.map(item => <div key={item.id}><span>{item.quantity} × {item.name}</span><b>{money(item.price*item.quantity)}</b></div>)}</div><div className="checkout-total"><span>Total</span><strong>{money(order.total)}</strong></div><button className="primary-button" onClick={() => setOrder(null)}>Back to menu</button></section></div>}
    </div>
  )
}

export default App
