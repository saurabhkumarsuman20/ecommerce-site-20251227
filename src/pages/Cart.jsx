import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'

export default function Cart() {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const raw = localStorage.getItem('cart')
    setCart(raw ? JSON.parse(raw) : [])
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function changeQty(id, qty) {
    setCart((c) => c.map(item => item.id === id ? { ...item, qty } : item))
  }

  function removeItem(id) {
    setCart((c) => c.filter(item => item.id !== id))
  }

  function subtotal() {
    return cart.reduce((s, i) => s + i.price * (i.qty || 1), 0)
  }

  function handleCheckout() {
    const ordersRaw = localStorage.getItem('orders')
    const orders = ordersRaw ? JSON.parse(ordersRaw) : []
    const order = { id: Date.now(), items: cart, total: subtotal(), createdAt: new Date().toISOString() }
    orders.push(order)
    localStorage.setItem('orders', JSON.stringify(orders))
    setCart([])
    localStorage.removeItem('cart')
    navigate('/checkout', { state: { order } })
  }

  if (!cart || cart.length === 0) return (
    <div className="home-page">
      <h2>Your cart is empty</h2>
    </div>
  )

  return (
    <div className="home-page">
      <h2>Your Cart</h2>
      <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20}}>
        <div>
          {cart.map(item => (
            <div key={item.id} style={{display: 'flex', gap: 12, padding:12, alignItems:'center', borderBottom:'1px solid #eee'}}>
              <img src={item.image} style={{width:96, height:96, objectFit:'contain'}} alt="" />
              <div style={{flex:1}}>
                <div style={{fontWeight:700}}>{item.name}</div>
                <div style={{color:'#555'}}>${item.price.toFixed(2)}</div>
                <div style={{marginTop:8}}>
                  Qty: <select value={item.qty||1} onChange={(e)=>changeQty(item.id, Number(e.target.value))}>
                    {[...Array(10)].map((_,i)=>(<option key={i} value={i+1}>{i+1}</option>))}
                  </select>
                </div>
              </div>
              <div>
                <button onClick={()=>removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{padding:12, background:'#fff', borderRadius:6}}>
          <h3>Order Summary</h3>
          <div>Items: {cart.length}</div>
          <div style={{fontWeight:700, marginTop:8}}>Subtotal: ${subtotal().toFixed(2)}</div>
          <button style={{marginTop:12}} onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  )
}
