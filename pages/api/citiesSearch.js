import axios from 'axios';
import { MAP_API_KEY } from "../../config";

export default async function handler(req, res) {
  const { query } = req.query;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=(cities)&key=${MAP_API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching location data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
