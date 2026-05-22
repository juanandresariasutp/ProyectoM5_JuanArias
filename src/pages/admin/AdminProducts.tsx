import React, { useEffect, useState } from 'react'
import type { Product } from '../../types/product'
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../services/products'

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // States para el formulario
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('') // Por ahora solo la URL cruda

  const loadProducts = async () => {
    setLoading(true)
    try {
      const data = await fetchProducts()
      setProducts(data)
    } catch (error) {
      console.error('Error loading products', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const resetForm = () => {
    setName('')
    setPrice(0)
    setStock(0)
    setDescription('')
    setCategory('')
    setImage('')
    setIsEditing(false)
    setEditingId(null)
  }

  const handleEdit = (p: Product) => {
    setName(p.name)
    setPrice(p.price)
    setStock(p.stock || 0)
    setDescription(p.description || '')
    setCategory(p.category || '')
    setImage(p.image || '')
    setEditingId(p.id)
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return
    
    try {
      await deleteProduct(id)
      await loadProducts()
    } catch (error) {
      console.error('Error delete', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const productData = { 
      name, 
      price: Number(price), 
      stock: Number(stock),
      description, 
      category, 
      image 
    }

    try {
      if (editingId) {
        // Actualizar
        await updateProduct(editingId, productData)
      } else {
        // Crear
        await createProduct(productData)
      }
      resetForm()
      await loadProducts()
    } catch (error) {
      console.error('Error guardando producto:', error)
      alert('Error guardando el producto.')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Productos</h1>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            + Nuevo Producto
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">{editingId ? 'Editar Producto' : 'Crear Producto'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">Nombre</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-1">Precio ($)</label>
                <input type="number" required min="0" step="0.01" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-1">Stock</label>
                <input type="number" required min="0" value={stock} onChange={e => setStock(Number(e.target.value))} className="w-full p-2 border rounded" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">Categoría</label>
              <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 border rounded" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">URL de la Imagen</label>
              <input type="text" value={image} onChange={e => setImage(e.target.value)} placeholder="https://... o en blanco" className="w-full p-2 border rounded" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 font-medium mb-1">Descripción</label>
              <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded" />
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
              <button 
                type="button" 
                onClick={resetForm}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 transition"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                {editingId ? 'Actualizar' : 'Guardar'} Producto
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">Cargando...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">No hay productos en la tienda.</td></tr>
              ) : (
                products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {p.image && <img src={p.image} alt="" className="h-10 w-10 rounded-full object-cover mr-3 bg-gray-100" />}
                        <div className="text-sm font-medium text-gray-900">{p.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${p.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.stock ?? 0} un.</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {p.category || 'Sin categoría'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap right-0 text-right text-sm font-medium">
                      <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-900 mr-4">Editar</button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-900">Borrar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminProducts