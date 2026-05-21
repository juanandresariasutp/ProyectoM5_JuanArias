import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import AppRouter from './routes/AppRouter'
import CartDrawer from './components/CartDrawer'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRouter />
        <CartDrawer />
      </CartProvider>
    </AuthProvider>
  )
}

export default App
