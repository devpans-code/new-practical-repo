import { Box, Button, MenuItem, TextField } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LIST_OF_PRODUCT } from '../../reducer-store/store/productStore';

const categories = [
  {
    value: '',
    label: 'Select',
  },
  {
    value: 'mobile',
    label: 'Mobile',
  },
  {
    value: 'ac',
    label: 'Electronics',
  }
];

const ProductForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [expDate, setExpDate] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [discount, setDiscount] = useState(0);
  const [dicSellPrice, setDicSellPrice] = useState('');
  const [finalPrice, setFinalPrice] = useState('');
  const [description, setdescription] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const items = useSelector(state => state.product);
  const { data } = items;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (sellPrice && discount) {
      let newDiscoutSellPrice = discount > 0 ? (parseInt(sellPrice) * discount) / 100 : sellPrice;
      const newSellPrice = parseInt(sellPrice) === newDiscoutSellPrice || parseInt(sellPrice) < newDiscoutSellPrice ? sellPrice : parseInt(sellPrice) - newDiscoutSellPrice;
      setDicSellPrice(newSellPrice);
      setFinalPrice(newSellPrice);
    }
  }, [sellPrice, discount])

  const submitHandler = (e) => {
    e.preventDefault()
    if (name !== "" &&
      description !== "" &&
      discount !== "" &&
      costPrice !== "" &&
      sellPrice !== "" &&
      category !== "" &&
      expDate !== ""
    ) {
      setIsSubmit(true);
      let productData = {
        id: Math.floor(Math.random() * 10000) + 1,
        name: name,
        category: category,
        description: description,
        exp_date: expDate,
        cost_price: costPrice,
        sell_price: sellPrice,
        discount: discount,
        dic_sell_price: dicSellPrice,
        final_price: finalPrice
      }

      const newProductArr = [...data, productData];
      dispatch({
        type: LIST_OF_PRODUCT,
        payload: newProductArr
      });
      setTimeout(() => {
        return history.push("/");
      }, 2000);

      return;
    }

    setIsSubmit(false);
  }

  return (
    <>
      <h2>Add Product</h2>
      <hr />
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <Row>
          <Col lg="4" sm="12">
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="standard-basic" label="Name" variant="standard"
            />
            <br />
            {
              !isSubmit && name === "" && "Please enter name"
            }
          </Col>
          <Col>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="standard-select-category"
              select
              label="Select category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              variant="standard"
              style={{ textAlign: "left" }}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <br />
            {
              !isSubmit && category === "" && "Please select category"
            }
          </Col>
          <Col>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              value={expDate}
              onChange={(e) => setExpDate(e.target.value)}
              type="date" id="standard-basic" label="Expiry Date" variant="standard"
            />
            <br />
            {
              !isSubmit && expDate === "" && "Please select date"
            }
          </Col>
          <Col>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              type="number"
              id="standard-basic" label="Cost price" variant="standard"
            />
            <br />
            {
              !isSubmit && costPrice === "" && "Please enter cost price"
            }
          </Col>
          <Col>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              value={sellPrice}
              type="number"
              onChange={(e) => setSellPrice(e.target.value)}
              id="standard-basic" label="Sell Price" variant="standard"
            />
            <br />
            {
              !isSubmit && sellPrice === "" && "Please enter sell price"
            }
          </Col>
          <Col>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              value={discount}
              type="number"
              onChange={(e) => setDiscount(e.target.value ? (e.target.value) : 0)}
              id="standard-basic" label="Discount" variant="standard"
            />
            <br />
            {
              !isSubmit && (discount === "" || discount === NaN) && "Please enter valid discount"
            }
          </Col>
          <Col>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              value={dicSellPrice}
              id="standard-basic" label="Discounted Sell Price" variant="standard" disabled={true} />
          </Col>
          <Col>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              value={finalPrice}
              id="standard-basic" label="Final Price" variant="standard" disabled={true} />
          </Col>
          <Col>
            <TextField
              id="standard-multiline-static"
              label="Description"
              multiline
              rows={4}
              variant="standard"
              defaultValue="Default Value"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
            <br />
            {
              !isSubmit && description === "" && "Please enter description"
            }
          </Col>
        </Row>
        <Button type='submit' variant="outlined">Add</Button>
      </Box>
    </>
  )
}

export default ProductForm
