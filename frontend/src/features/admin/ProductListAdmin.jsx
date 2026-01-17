import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const ProductListAdmin = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products');
            setProducts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts();
            } catch (error) {
                alert('Error eliminando producto');
            }
        }
    };

    const createProductHandler = async () => {
        if (window.confirm('¿Crear un producto de ejemplo?')) {
            try {
                await api.post('/products', {
                    name: 'Producto Ejemplo',
                    price: 0,
                    imageUrl: '/sample.jpg',
                    brand: 'Marca',
                    category: 'Categoría',
                    countInStock: 0,
                    numReviews: 0,
                    description: 'Descripción'
                });
                fetchProducts();
            } catch (error) {
                alert('Error al crear producto');
            }
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 fw-bold">Productos</h2>
                {/* 
                  NOTE: For MVP we can just use Postman to create, 
                  or implement a basic form later. 
                  Currently showing list view.
                */}
                <button className="btn btn-primary" onClick={createProductHandler}>
                    <i className="bi bi-plus-lg"></i> Crear Producto
                </button>
            </div>

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>NOMBRE</th>
                                <th>PRECIO</th>
                                <th>CATEGORÍA</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id.substring(0, 10)}...</td>
                                    <td>{product.name}</td>
                                    <td>€{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => deleteHandler(product._id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductListAdmin;
