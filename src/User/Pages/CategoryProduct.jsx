import React, { useEffect, useState } from 'react'
import { Link, json, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import ReactStars from 'react-stars'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { Cartcontext } from '../Context/AddToCart/context';
import { BASE_API_URL } from '../../Api.Config';

export default function CategoryProduct() {

  const { CategoryName } = useParams()
  const [CategoryProduct, setCategoryProduct] = useState([]);

  const { cart_state, cart_dispatch } = useContext(Cartcontext)

  useEffect(() => {
    axios.get(`${BASE_API_URL}/api/get-product-by-category?category=${CategoryName}`)
      .then((json) => setCategoryProduct(json.data.Product)).catch((err) => console.log(err))
  }, [CategoryName])


  const AddToCart = (item) => {

    const payload = {
      ...item,
      Quantity: 1,
    }

    cart_dispatch(
      {
        type: "ADD_TO_CART",
        payload
      }
    )
  }

  return (
    <>
      <div className="container">
        <div className="my-4 text-center">
          <h1 className='text-danger'>{CategoryName}</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda suscipit libero, id quibusdam quia autem dicta praesentium quasi delectus ratione architecto. Vel odit a ad quidem facilis explicabo sequi nisi. orem ipsum, dolor sit amet consectetur adipisicing elit. Alias, velit illum provident non necessitatibus quibusdam doloribus sapiente optio saepe, iste iure ullam. Eius ad repellat numquam consectetur laboriosam porro delectus.</p>
        </div>

        <div className="row">
          {CategoryProduct.map((val, key) =>

            <div className="col-lg-3 col-md-4 col-sm-6 my-3" key={key} >

              <Card style={{ height: "360px" }}>
                <Card.Img varient="top" src={val.thumbnail} className='object-fit-contain border rounded img-fluid' style={{ height: "200px" }} />
                <Card.Body>
                  <Link className='text-decoration-none text-dark' to={`/products/${val._id}`}>
                    <div className="brand text-center">
                    </div>
                    <div className="brand text-center">
                      <span>Category:  </span>
                      <span className="fw-semibold">{val.category.length > 15 ? val.category.slice(0, 15) + '...' : val.category}</span>
                    </div>

                    <div className="text-center">
                      {val.name.length > 20 ? val.name.slice(0, 20) + '...' : val.name}
                    </div>

                    <div className='text-center' >
                      <h5 className='text-danger fw-semibold  me-2 text-secondary'>${val.price}</h5>

                    </div>
                  </Link>

                  <div className="d-grid">
                    <button className='btn btn-outline-danger px-5 py-2  ' disabled={cart_state.cart.some(item => item._id === val._id)} onClick={() => AddToCart(val)}>Add to Cart</button>
                  </div>
                </Card.Body>

                <span className="position-absolute translate-start badge bg-danger" style={{
                  padding: '5px 10px',
                  marginTop: '10px',
                  marginLeft: '-4px',
                  borderRadius: '4px'
                }}>
                  {val.brand.toUpperCase()}
                </span>


              </Card>

            </div>

          )}
        </div>
      </div>
    </>
  )
}