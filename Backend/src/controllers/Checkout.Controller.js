import Checkout from '../models/Checkout.Models.js'

export const saveCheckoutDetails = async (req, res) => {
  try {
    const {
      userId,
      productId,
      fullName,
      emailAddress,
      contactNumber,
      address,
      pincode,
      city,
      state,
      country,
      cardNumber,
      cardExpiry,
      cardCvv,
    } = req.body;

    // Check if checkout data already exists for the user
    let checkoutData = await Checkout.findOne({ userId });

    if (checkoutData) {
      // If checkout data exists, update it by pushing the new productId to the array
      checkoutData = await Checkout.findOneAndUpdate(
        { userId },
        {
          $push: { productId: { productId: productId, dateTime: Date.now() } }, // Push an object containing productId and current date and time
          fullName,
          emailAddress,
          contactNumber,
          address,
          pincode,
          city,
          state,
          country,
          cardNumber,
          cardExpiry,
          cardCvv,
        },
        { new: true } // Set { new: true } to return the updated document after update
      );
    } else {
      // If checkout data doesn't exist, create a new entry
      checkoutData = new Checkout({
        userId,
        productId: [{ productId: productId, dateTime: Date.now() }], // Store productId and current date and time as an array with the new product
        fullName,
        emailAddress,
        contactNumber,
        address,
        pincode,
        city,
        state,
        country,
        cardNumber,
        cardExpiry,
        cardCvv,
      });

      await checkoutData.save();
    }

    res.status(200).json({ message: 'Checkout details saved successfully.' });
  } catch (error) {
    console.error('Error saving checkout details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




export const getUserCheckoutData = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the checkout data for the user
    const checkoutData = await Checkout.findOne({ userId });

    // Return the checkout data if found
    res.status(200).json(checkoutData);
  } catch (error) {
    console.error('Error fetching checkout data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// controllers/checkoutController.js

// Controller to fetch all checkout data
export const getAllCheckouts = async (req, res) => {
  try {
    const checkouts = await Checkout.find();
    res.status(200).json(checkouts);
  } catch (error) {
    console.error('Error fetching checkouts:', error);
    res.status(500).json({ error: 'Failed to fetch checkouts' });
  }
};

