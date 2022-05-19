import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LIST_OF_PRODUCT } from '../../reducer-store/store/productStore';

// const productsArray = [{
//   id: 1,
//   name: "I Phone 12",
//   category: "mobile",
//   description: "lorem ipsum lorem ipsum ",
//   exp_date: "12-8-2022",
//   cost_price: "10000",
//   sell_price: "22000",
//   discount: 15,
//   dic_sell_price: "19000",
//   final_price: "19000"
// }, {
//   id: 2,
//   name: "Ac",
//   category: "electronics",
//   description: "carrie global ac",
//   exp_date: "12-8-2022",
//   cost_price: "30000",
//   sell_price: "50000",
//   discount: 15,
//   dic_sell_price: "42500",
//   final_price: "42500"
// }];

const ProductList = () => {
  const items = useSelector(state => state.product);
  const { data } = items;
  const dispatch = useDispatch();

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure, You want to delete it?")) {
      const updateProductArr = data.filter(product => product.id !== id);
      dispatch({
        type: LIST_OF_PRODUCT,
        payload: updateProductArr
      });
    }
  }

  return (
    <div>
      <Button variant="outlined" className='button-component'>
        <Link to="/add" className='button-link-component'>
          Add Product
        </Link>
      </Button>
      <Table sx={{ minWidth: 500 }} >
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row">
              Name
            </TableCell>
            <TableCell component="th" scope="row">
              Catagory
            </TableCell>
            <TableCell component="th" scope="row">
              Cost Price
            </TableCell>
            <TableCell component="th" scope="row">
              Sell Prices
            </TableCell>
            <TableCell component="th" scope="row">
              Discount
            </TableCell>
            <TableCell component="th" scope="row">
              Discounted Sell Price
            </TableCell>
            <TableCell component="th" scope="row">
              Final Price
            </TableCell>
            <TableCell component="th" scope="row">
              Expiry Date
            </TableCell>
            <TableCell component="th" scope="row">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.length > 0 ? data.map(product => <TableRow key={product.name}>
              <TableCell component="td" scope="row">
                {product.name}
              </TableCell>
              <TableCell component="td" scope="row">
                {product.category}
              </TableCell>
              <TableCell component="td" scope="row">
                {product.cost_price}
              </TableCell>
              <TableCell component="td" scope="row">
                {product.sell_price}
              </TableCell>
              <TableCell component="td" scope="row">
                {product.discount}
              </TableCell>
              <TableCell component="td" scope="row">
                {product.dic_sell_price}
              </TableCell>
              <TableCell component="td" scope="row">
                {product.final_price}
              </TableCell>
              <TableCell component="td" scope="row">
                {product.exp_date}
              </TableCell>
              <TableCell component="td" scope="row">
                <Link to={`/edit/${product.id}`}><i className='fa fa-pencil' /></Link> &nbsp; &nbsp; <i className='fa fa-trash' onClick={() => deleteProduct(product.id)} />
              </TableCell>
            </TableRow>) : <TableRow>
                <TableCell colSpan={9}>
                No record found
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductList
