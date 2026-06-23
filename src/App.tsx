import { useState } from 'react';
import './index.css';

function App() {
  const [cart, setCart] = useState<{id: string, name: string, price: number}[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const burgers = [
    { id: '1', name: 'The Nook Classic', price: 9.50, desc: 'Double smashed patty, american cheese, house sauce.' },
    { id: '2', name: 'Spicy Nook', price: 10.50, desc: 'Jalapenos, spicy mayo, pepper jack.' },
    { id: '3', name: 'Truffle Mushroom', price: 11.00, desc: 'Truffle mayo, swiss cheese, grilled mushrooms.' }
  ];

  const addToCart = (burger: any) => {
    setCart([...cart, burger]);
  };

  return (
    <div className="container">
      <header style={{ padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src="/Nook_Primary_Logo_Black_On_White.jpeg" alt="Nook Burgers" style={{ height: '60px', borderRadius: '4px' }} />
        <button className="btn btn-secondary" onClick={() => setShowCheckout(true)}>
          Cart ({cart.length})
        </button>
      </header>

      <main style={{ padding: '40px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Smashed to perfection.</h2>
          <p style={{ color: 'var(--wst-color-text-secondary)' }}>Click & Collect your order. Get 50% off your first order!</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {burgers.map(burger => (
            <div key={burger.id} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <h3>{burger.name}</h3>
              <p style={{ color: 'var(--wst-color-text-secondary)', flexGrow: 1 }}>{burger.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>£{burger.price.toFixed(2)}</span>
                <button className="btn" onClick={() => addToCart(burger)}>Add to order</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showCheckout && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '30px', position: 'relative' }}>
            <button 
              onClick={() => setShowCheckout(false)}
              style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
            >
              &times;
            </button>
            <h2>Checkout</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {cart.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>{item.name}</span>
                    <span>£{item.price.toFixed(2)}</span>
                  </div>
                ))}
                <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '20px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  <span>Total</span>
                  <span>£{cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
                </div>
                
                <div style={{ marginTop: '30px' }}>
                  <h3>Your Details (for collection & notifications)</h3>
                  <input type="text" placeholder="Phone Number" style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: 'none' }} />
                  <input type="email" placeholder="Email Address" style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: 'none' }} />
                  
                  <div style={{ background: 'rgba(217, 37, 43, 0.2)', padding: '10px', borderRadius: '4px', marginBottom: '20px', border: '1px solid var(--wst-color-action)' }}>
                    <p style={{ margin: 0, color: 'var(--wst-color-action)' }}><strong>First time?</strong> We'll apply 50% off automatically at collection!</p>
                  </div>

                  <button className="btn" style={{ width: '100%', marginTop: '10px', padding: '15px', fontSize: '1.2rem' }}>Pay on Collection</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
