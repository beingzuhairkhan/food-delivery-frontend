import axios from 'axios';


const API_URL = `http://localhost:3000`
export const addRestaurant = async (formData: FormData) => {
    try {
        const res = await axios.post(`${API_URL}/restaurant/create-shop`, formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return res.data;
    } catch (error: any) {
        console.error('Error adding restaurant:', error.response?.data || error.message);
        throw error;
    }
};



export const addFoodItem = async (formData: FormData) => {
  try {

    const res = await axios.post(`${API_URL}/restaurant/create-item`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
       
      },
    });

    return res.data;
  } catch (error: any) {
    console.error("❌ Error adding food item:", error.response?.data || error.message);
    throw error;
  }
};
