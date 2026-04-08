import axios from "axios";

const API = "https://www.themealdb.com/api/json/v1/1";

export const getIngredients = async () => {
  const res = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
  );
  return res.data.meals;
};

export const getMealsByIngredient = async (name: string) => {
  const res = await axios.get(`${API}/filter.php?i=${name}`);
  return res.data.meals;
};

export const getMealDetail = async (id: string) => {
  const res = await axios.get(`${API}/lookup.php?i=${id}`);
  return res.data.meals[0];
};
