import React, { useEffect, useState } from 'react'
import type { Product } from '../../types/product'
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../services/products'
import AdminProductRow from '../../components/admin/AdminProductRow'
import AdminProductMobileCard from '../../components/admin/AdminProductMobileCard'

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
  const [image, setImage] = useState('') 
  const [file, setFile] = useState<File | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  const loadProducts = async () => {
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
    let active = true

    const initialLoad = async () => {
      try {
        const data = await fetchProducts()
        if (active) {
          setProducts(data)
        }
      } catch (error) {
        console.error('Error loading products', error)
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void initialLoad()

    return () => {
      active = false
    }
  }, [])

  const resetForm = () => {
    setName('')
    setPrice(0)
    setStock(0)
    setDescription('')
    setCategory('')
    setImage('')
    setFile(null)
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
    
    let finalImageUrl = image

    // Si el usuario seleccionó un archivo local, lo subimos a AWS S3
    if (file) {
      setUploadingImage(true)
      try {
        // 1. Pedimos a nuestro servidor Vercel la URL firmada (authorization ticket)
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: file.name, fileType: file.type })
        })
        
        if (!res.ok) throw new Error('Error al obtener presigned URL')
        const { presignedUrl, finalUrl } = await res.json()

        // 2. Subimos el archivo físicamente a la URL que nos dio AWS
        const uploadRes = await fetch(presignedUrl, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type }
        })

        if (!uploadRes.ok) throw new Error('Error al subir a S3')
        
        finalImageUrl = finalUrl
      } catch (error) {
        console.error('S3 Upload Error:', error)
        alert('Hubo un error subiendo la imagen a AWS. ' + (error as Error).message)
        setUploadingImage(false)
        return // Rompemos flujo si falla la imagen
      }
      setUploadingImage(false)
    }
    
    const productData = { 
      name, 
      price: Number(price), 
      stock: Number(stock),
      description, 
      category, 
      image: finalImageUrl 
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
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#3e6b5b] mb-2">Creati Store</p>
          <h1 className="text-2xl font-semibold text-[#10211f]">Gestión de Productos</h1>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-[#3e6b5b] text-white font-semibold rounded-xl hover:opacity-95 transition"
          >
            + Nuevo Producto
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white/85 backdrop-blur p-6 rounded-[2rem] shadow-[0_20px_80px_rgba(16,33,31,0.08)] border border-black/5">
          <h2 className="text-xl font-semibold mb-4 text-[#10211f]">{editingId ? 'Editar Producto' : 'Crear Producto'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#5f6f6b] font-medium mb-1">Nombre</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border border-black/10 bg-white text-[#10211f] rounded-xl" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#5f6f6b] font-medium mb-1">Precio ($)</label>
                <input type="number" required min="0" step="0.01" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full p-3 border border-black/10 bg-white text-[#10211f] rounded-xl" />
              </div>
              <div>
                <label className="block text-sm text-[#5f6f6b] font-medium mb-1">Stock</label>
                <input type="number" required min="0" value={stock} onChange={e => setStock(Number(e.target.value))} className="w-full p-3 border border-black/10 bg-white text-[#10211f] rounded-xl" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#5f6f6b] font-medium mb-1">Categoría</label>
              <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 border border-black/10 bg-white text-[#10211f] rounded-xl" />
            </div>

            <div>
              <label className="block text-sm text-[#5f6f6b] font-medium mb-1">Imagen (URL o Archivo)</label>
              <input 
                type="text" 
                value={image} 
                onChange={e => { setImage(e.target.value); setFile(null) }} 
                placeholder="https://... (URL directa)" 
                className="w-full p-3 border border-black/10 bg-white text-[#10211f] rounded-xl mb-2 text-sm" 
              />
              <input 
                type="file" 
                accept="image/*"
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0])
                    setImage('') // Si sube archivo, vaciamos la URL
                  }
                }} 
                className="w-full text-sm text-[#5f6f6b] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#3e6b5b] file:text-white hover:file:opacity-95"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-[#5f6f6b] font-medium mb-1">Descripción</label>
              <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} className="w-full p-3 border border-black/10 bg-white text-[#10211f] rounded-xl" />
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
              <button 
                type="button" 
                onClick={resetForm}
                className="px-4 py-2 border border-black/10 rounded-xl text-[#10211f] hover:bg-black/5 transition"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                disabled={uploadingImage}
                className="px-4 py-2 bg-[#3e6b5b] text-white rounded-xl hover:opacity-95 transition disabled:opacity-50"
              >
                {uploadingImage ? 'Subiendo imagen...' : editingId ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white/85 backdrop-blur rounded-[2rem] shadow-[0_20px_80px_rgba(16,33,31,0.08)] overflow-hidden border border-black/5">
          {/* Table para desktop/tablet */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-black/5 text-[#10211f]">
            <thead className="bg-[#f5f7f5]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#5f6f6b] uppercase tracking-[0.2em]">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#5f6f6b] uppercase tracking-[0.2em]">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#5f6f6b] uppercase tracking-[0.2em]">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#5f6f6b] uppercase tracking-[0.2em]">Categoría</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-[#5f6f6b] uppercase tracking-[0.2em]">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-transparent divide-y divide-black/5">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-4 text-center text-[#5f6f6b]">Cargando...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-4 text-center text-[#5f6f6b]">No hay productos en la tienda.</td></tr>
              ) : (
                products.map(p => (
                  <AdminProductRow key={p.id} product={p} onEdit={handleEdit} onDelete={handleDelete} />
                ))
              )}
            </tbody>
            </table>
          </div>

          {/* Lista en tarjetas para móvil (evita scroll horizontal) */}
          <div className="md:hidden p-4">
            {loading ? (
              <div className="text-[#5f6f6b]">Cargando...</div>
            ) : products.length === 0 ? (
              <div className="text-[#5f6f6b]">No hay productos en la tienda.</div>
            ) : (
              <div className="flex flex-col gap-3">
                {products.map(p => (
                  <AdminProductMobileCard key={p.id} product={p} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProducts