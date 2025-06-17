import React, { useState } from 'react';
import { Form, Button, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [upiId, setUpiId] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (paymentMethod === 'UPI' && !upiId) {
      alert('Please enter your UPI ID before continuing.');
      return;
    }

    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />

            <Form.Check
              type='radio'
              label='UPI / QR Code'
              id='UPI'
              name='paymentMethod'
              value='UPI'
              checked={paymentMethod === 'UPI'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className='mt-2'
            />
          </Col>
        </Form.Group>

        {paymentMethod === 'UPI' && (
          <>
            <Form.Group className='my-3'>
              <Form.Label>Scan QR to Pay</Form.Label>
              <Image
                src='/images/upi-qr-placeholder.png' // Replace with your QR image
                alt='UPI QR Code'
                fluid
                style={{ maxWidth: '200px' }}
              />
            </Form.Group>

            <Form.Group controlId='upiId'>
              <Form.Label>Enter UPI ID (used to verify)</Form.Label>
              <Form.Control
                type='text'
                placeholder='example@upi'
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </Form.Group>
          </>
        )}

        <Button type='submit' variant='primary' className='mt-3'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
