import { useLocation } from 'react-router-dom'
import './HomePage.css'

export default function Checkout(){
  const { state } = useLocation()
  const order = state?.order

  if(!order) return (
    <div className="home-page">
      <h2>No recent order found</h2>
    </div>
  )

  return (
    <div className="home-page">
      <h2>Thank you — order received</h2>
      <div style={{background:'#fff', padding:16, borderRadius:6}}>
        <div>Order id: {order.id}</div>
        <div>Total: ${order.total.toFixed(2)}</div>
        <div>Items: {order.items.length}</div>
      </div>
    </div>
  )
}
