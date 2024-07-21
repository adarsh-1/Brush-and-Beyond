import mongoose from 'mongoose';

const checkoutSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: [
    {
      productId: { type: String, required: true },
      dateTime: { type: Date, required: true, default: Date.now }
    }
  ],
  fullName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  cardNumber: { type: String, required: true },
  cardExpiry: { type: String, required: true },
  cardCvv: { type: String, required: true },
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

export default Checkout;
