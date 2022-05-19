import { Box, Button, MenuItem, TextField } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Row, Col } from "react-bootstrap";

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
  const [discription, setDiscription] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (sellPrice && discount) {
      let newDiscoutSellPrice = discount > 0 ? (parseInt(sellPrice) * discount) / 100 : sellPrice;
      const newSellPrice = parseInt(sellPrice) === newDiscoutSellPrice || parseInt(sellPrice) < newDiscoutSellPrice ? sellPrice : parseInt(sellPrice) - newDiscoutSellPrice;
      setDicSellPrice(newSellPrice);
      setFinalPrice(newSellPrice);
    }
  }, [sellPrice, discount])

  // const submitHandler = () => {
  //   if ()
  // }

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
      >
        <Row>
          <Col lg="4" sm="12">
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.name)}
              id="standard-basic" label="Name" variant="standard"
            />
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
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
            />
            {
              !isSubmit && discription === "" && "Please enter description"
            }
          </Col>
        </Row>
        <Button type='submit' variant="outlined">Add</Button>
      </Box>
    </>
  )
}

export default ProductForm
