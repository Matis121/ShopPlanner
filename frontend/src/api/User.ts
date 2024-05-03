import axios from "axios";

// getUserLists
export async function getAllLists() {
  let response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/get-all-lists`
  );
  let data = response.data;
  console.log(data);
  return data;
}

export async function getSingleList(listId: any) {
  console.log(listId);
  let response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/get-single-list`,
    {
      params: {
        listId,
      },
    }
  );
  let data = response.data;
  console.log(data);
  return data;
}

export async function addNewProduct({ listId, productName }) {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/add-new-product`,
      { listId, productName }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct({ listId, productId }) {
  try {
    console.log(listId, productId);
    let response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/update-product`,
      { listId, productId }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function createNewList(newList: any) {
  try {
    console.log(newList);
    let response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/create-new-list`,
      newList
    );
    console.log(response);
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}