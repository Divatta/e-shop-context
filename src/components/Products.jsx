import React,{ useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ProductCard from '../Helper/ProductCard'

const url = `https://dummyjson.com`

function Products() {
  const [product,setProduct] = useState([])
  const params = useParams() //used to read category (Returns an object of key/value pairs of the dynamic params from the current URL that were matched by the route path.)

  const getProduct = async () => {
    const res = await axios.get(`${url}/products/category/${params.catName}`)
    console.log('category based products = ', res)
    setProduct(res.data.products)
  }

  useEffect(() => {
    getProduct()
  },[])

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-1 text-success">Products</h3>
            </div>
        </div>

        <div className="row">
          {
            product.map((item,index) => {
              return <ProductCard key={index} {...item}/>
            })
          }
        </div>
    </div>
  )
}

export default Products
