import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import Category from '../Helper/Category'
import ProductCard from '../Helper/ProductCard'
import { ProductContext } from '../ProductContext'
import ReactPaginate  from 'react-paginate'

function Home(props) {

  const context = useContext(ProductContext)
  const [categoryData] = context.categoryApi.category || [] //logical operator (OR operator)
  const [productsData] = context.productApi.products.value || []

  //pagination
  const [itemOffset,setItemOffset] = useState(0)

  let endOffset = itemOffset + props.itemsPerpage;
  let currentItems = productsData.slice(itemOffset,endOffset)
  let pageCount = Math.ceil(productsData.length / props.itemsPerpage);

  const handleClick = (event) => {
    let newOffset = (event.selected * props.itemsPerpage) % productsData.length;
    setItemOffset(newOffset)
  }

  return (
    <div className="container">

        <div className="row">
            {
              //logical operator
              categoryData.length === 0 ? (
                <div className="col-md-12 ">
                  <div className="row text-center">
                    <h5 className="display-5 text-secondary">No Categories Found</h5>
                  </div>
                </div>
              ) : (
                <div className="col-md-12 text-center">
                  <h5 className="display-5 text-success">Categories</h5>
                </div>
              )
            }
        </div>

        <div className="row">
          {
            categoryData.map((item,index) => {
              return <Category key={index} value={item}/>
            })
          }
        </div>

        <div className="row">
          {
              productsData.length === 0 ? (
                <div className="col-md-12 ">
                  <div className="row text-center">
                    <h5 className="display-5 text-secondary">No  Products Found</h5>
                  </div>
                </div>
              ) : (
                <div className="col-md-12 mt-3 text-center">
                  <h5 className="display-5 text-success">Featured Products</h5>
                </div>
              )
          }
        </div>

        <div className="row">
          {
            currentItems && currentItems.map((item,index) =>{
              return <ProductCard key={index} {...item} />
            })
            
          }
        </div>

        <div className="row">
          <div className="col-md-12 mt-3 mb-4">
              <ReactPaginate 
                  pageCount={pageCount}
                  className={'pagination justify-content-center'}
                  pageClassName={'page-item'}
                  pageLinkClassName={'page-link'}
                  activeClassName={'active'}
                  activeLinkClassName={'page-link'}
                  nextClassName={'active'}
                  nextLinkClassName={'page-link'}
                  previousClassName={'active'}
                  previousLinkClassName={'page-link'}
                  onPageChange={handleClick}
              />
          </div>
        </div>
    </div>
  )
}

export default Home

// object in array operator we can use spread operator
