import axios from "axios";

// ! LISTS FUNCTIONS

// get
export async function getAllLists() {
  let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/lists`);
  let data = response.data;
  return data;
}
export async function getSingleList(listId: any) {
  let response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/lists/${listId}`
  );
  let data = response.data;
  return data;
}

// add
export async function createNewList(newList: any) {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/lists`,
      newList
    );
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function addNewProduct({ listId, productName }) {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/lists/${listId}`,
      { productName }
    );
  } catch (error) {
    console.log(error);
  }
}

// update
export async function updateList({ listId, listName, listDesc }) {
  try {
    let response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/lists/${listId}`,
      { listName, listDesc }
    );
  } catch (error) {
    console.log(error);
  }
}
export async function updateProduct({ listId, productId }) {
  try {
    let response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/lists/${listId}/products/${productId}`
    );
  } catch (error) {
    console.log(error);
  }
}

// delete
export async function deleteList({ listId }) {
  try {
    let response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/lists/${listId}`
    );
  } catch (error) {
    console.log(error);
  }
}
export async function deleteProduct({ listId, productId }) {
  try {
    let response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/lists/${listId}/products/${productId}`
    );
  } catch (error) {
    console.log(error);
  }
}

// ! GROUPS FUNCTIONS

// get
export async function getAllGroups() {
  let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/groups`);
  let data = response.data;
  return data;
}
export async function getGroupLists(groupId) {
  let response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/lists`
  );
  let data = response.data;
  return data;
}
export async function getSingleListInGroup({ listId, groupId }) {
  console.log({ listId, groupId });
  let response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/lists/${listId}`
  );
  let data = response.data;
  return data;
}

// add
export async function addNewProductInGroup({ listId, groupId, productName }) {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/lists/${listId}/products/add-proposal`,
      { productName }
    );
  } catch (error) {
    console.log(error);
  }
}
export async function CreateNewGroup(newList: any) {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/groups/add-proposal`,
      newList
    );
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function createNewListInGroup({ name, description, groupId }) {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/lists/add-proposal`,
      { name, description }
    );
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

// update
export async function updateListInGroup({
  groupId,
  listId,
  listName,
  listDesc,
}) {
  try {
    let response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/lists/${listId}/change-proposal`,
      { listName, listDesc }
    );
  } catch (error) {
    console.log(error);
  }
}
export async function updateProductInGroup({ groupId, listId, productId }) {
  try {
    let response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/lists/${listId}/products/${productId}/change-proposal`
    );
  } catch (error) {
    console.log(error);
  }
}

// delete
export async function deleteGroup({ groupId }) {
  try {
    let response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/delete-proposal`
    );
  } catch (error) {
    console.log(error);
  }
}
export async function deleteListInGroup({ listId, groupId }) {
  try {
    let response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/lists/${listId}/delete-proposal`
    );
  } catch (error) {
    console.log(error);
  }
}
export async function deleteProductInGroup({ groupId, listId, productId }) {
  try {
    let response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/lists/${listId}/products/${productId}/delete-proposal`
    );
  } catch (error) {
    console.log(error);
  }
}
