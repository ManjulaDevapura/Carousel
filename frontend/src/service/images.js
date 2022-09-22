const axios = require("axios");

export const fetchImages = async (params) => {
    const responce = await axios.get("http://localhost:3600/api/carousel", { params: params });

    if (responce.status === 200) {
        return responce.data;
    }

    return [];
};