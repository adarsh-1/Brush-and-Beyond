import Artworks from "../models/Artwork.Models.js";


// Controller for Artworks
export const AddArtworks = async (req, res) => {

    const { id, image, title, description, price, discount, category, forSale } = req.body;

    try {
        // let imgURL = "";
        // if (req.file) {
        //     imgURL = req.file.filename;
        // }

        const AddProductDoc = new Artworks({
        id,
        title,
        description,
        price,
        discount,
        category,
        forSale,
        image: req.file.filename,
        });

        await AddProductDoc.save();
        res.send("Artwork Uploded Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error occurred while adding artwork");
    }
};



export const ShowArtworks = async (req, res) => {
    try {
        const AllProductDetail = await Artworks.find();
        if (AllProductDetail != null) {
            res.status(200).send(AllProductDetail);
        } else {
            res.status(404).send("No feedback yet");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};


export const ShowArtworksByArtistId = async (req, res) => {
    const id = req.query.artistId;
    console.log(id);

    try {
        // Fetch artworks by artistId
        const artworks = await Artworks.find({ id });

        res.status(200).json(artworks);
    } catch (error) {
        console.error('Error fetching artworks by artist ID:', error);
        res.status(500).send('Internal Server Error');
    }
};



export const getArtworkById = async (req, res) => {
    try {
      const artwork = await Artworks.findById(req.params.id);
      if (!artwork) {
        return res.status(404).json({ error: 'Artwork not found' });
      }
      res.json(artwork);
    } catch (error) {
      console.error('Error fetching artwork:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


