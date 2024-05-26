import axios from "axios";

// getUserLists
export async function getAllLists() {
  let response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/get-all-lists`
  );
  let data = response.data;
  return data;
}

export async function getAllGroups() {
  let response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/get-all-avaible-groups`
  );
  let data = response.data;
  return data;
}

export async function getSingleList(listId: any) {
  let response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/get-single-list`,
    {
      params: {
        listId,
      },
    }
  );
  let data = response.data;
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
    let response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/update-product`,
      { listId, productId }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function updateList({ listId, listName, listDesc }) {
  try {
    let response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/update-list`,
      { listId, listName, listDesc }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct({ listId, productId }) {
  try {
    let response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/delete-product`,
      { data: { listId, productId } }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function deleteList({ listId }) {
  try {
    let response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/delete-list`,
      { data: { listId } }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function createNewList(newList: any) {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/create-new-list`,
      newList
    );
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
