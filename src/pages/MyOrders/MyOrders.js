import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthorization } from '../../hooks/useAuthorization';
import './MyOrders.css';

const { REACT_APP_BACKEND_API } = process.env;

function MyOrders() {
  const { userSession, userProfile } = useAuthorization();
  const [products, setProducts] = useState();
  const [myOrders, setMyOrders] = useState();
  const navigate = useNavigate();
  const { idUser } = userProfile;

  useEffect(() => {
    if (!userSession) {
      navigate('/login');
    }

    async function getMyOrders() {
      const config = {
        headers: {
          Authorization: `Bearer ${userSession}`
        }
      };
      const response = await axios.get(
        `${REACT_APP_BACKEND_API}orders/user/${idUser}`,
        config
      );
      setMyOrders(response.data.data);
    }
    getMyOrders();

    async function getProducts() {
      const response = await axios.get(`${REACT_APP_BACKEND_API}products`);
      setProducts(response.data.data);
    }
    getProducts();
  }, [userSession, navigate, idUser]);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return (
    <div>
      <h1>Mis reservas</h1>
      {myOrders && idUser && products ? (
        myOrders.map((order) => {
          let productoSolicitado = products.find(
            (product) => product.idProduct === order.idProduct
          );

          return (
            <div key={order.idOrder} className='order-container'>
              <div>
                <span>Fecha: </span>
                <span>
                  {new Date(order.orderDate).toLocaleString(
                    'es-ES',
                    options
                  )}
                </span>
              </div>
              <div className='order-product-info'>
                {/* TODO HACER LLAMADA A LAS IMAGENES PARA AÑADIRLA ACA */}
                <div className='order-product-title'>
                  {productoSolicitado.title}
                </div>
                <div>Precio: {productoSolicitado.price}</div>
                <div>Ubicacion: {productoSolicitado.location}</div>
              </div>
              <div className='order-info'>
                <div>Mensaje enviado: {order.orderMessage}</div>
                {order.saleMessage && (
                  <div>Mensaje del vendedor: {order.saleMessage}</div>
                )}
                {order.saleDate && (
                  <div>
                    Fecha acordada de venta:{' '}
                    {new Date(order.saleDate).toLocaleString(
                      'es-ES',
                      options
                    )}
                  </div>
                )}
                <div className='order-status'>Estado: {order.status}</div>
              </div>
              {/* TODO FALTA BOTON PARA CANCELAR RESERVA ETC */}
            </div>
          );
        })
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default MyOrders;