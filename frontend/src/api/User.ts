import axios from "axios";
import { getUserId } from "@/utils/auth";

const userId = getUserId();

// TODO:  refactor all types for functions

export async function registerUser({ username, email, password }: any) {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/register`,
      {
        username,
        email,
        password,
      }
    );
    let data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function loginUser({ email, password }: any) {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/login`,
      {
        email,
        password,
      }
    );
    let data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function getGroupInvitations() {
  try {
    let response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/user/${userId}/group-invitations`
    );
    let data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
}

// ! LISTS FUNCTIONS

// get
export async function getAllLists() {
  let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/lists`, {
    params: {
      userId: userId,
    },
  });
  let data = response.data;
  return data;
}
export async function getSingleList(listId: string) {
  let response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/lists/${listId}`,
    {
      params: {
        userId: userId,
      },
    }
  );
  let data = response.data;
  return data;
}

// add
export async function createNewList(newList: any) {
  try {
    await axios.post(`${import.meta.env.VITE_SERVER_URL}/lists`, {
      userId: userId,
      newListData: newList,
    });
  } catch (error) {
    console.log(error);
  }
}
export async function addNewProduct({ listId, productName }: any) {
  try {
    await axios.post(`${import.meta.env.VITE_SERVER_URL}/lists/${listId}`, {
      userId,
      productName,
    });
  } catch (error) {
    console.log(error);
  }
}

// update
export async function updateList({ listId, listName, listDesc }: any) {
  try {
    await axios.put(`${import.meta.env.VITE_SERVER_URL}/lists/${listId}`, {
      userId,
      listName,
      listDesc,
    });
  } catch (error) {
    console.log(error);
  }
}
export async function updateProduct({ listId, productId }: any) {
  try {
    await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/lists/${listId}/products/${productId}`,
      {
        userId,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

// delete
export async function deleteList({ listId }: any) {
  try {
    await axios.delete(`${import.meta.env.VITE_SERVER_URL}/lists/${listId}`, {
      params: {
        userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
export async function deleteProduct({ listId, productId }: any) {
  try {
    await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/lists/${listId}/products/${productId}`,
      {
        params: {
          userId,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}

// ! GROUPS FUNCTIONS

// get
export async function getAllGroups() {
  let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/groups`, {
    params: {
      userId: userId,
    },
  });
  let data = response.data;
  return data;
}
export async function getGroupLists(groupId: string) {
  let response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/lists`
  );
  let data = response.data;
  return data;
}
export async function getSingleListInGroup({ listId, groupId }: any) {
  let response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/lists/${listId}`
  );
  let data = response.data;
  return data;
}

// add
export async function addNewProductInGroup({
  listId,
  groupId,
  productName,
}: any) {
  try {
    await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/lists/${listId}/products/add-proposal`,
      { productName }
    );
  } catch (error) {
    console.log(error);
  }
}
export async function CreateNewGroup({ name }: any) {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/groups/add-proposal`,
      { name, userId }
    );
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function createNewListInGroup({
  name,
  description,
  groupId,
}: any) {
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
export async function inviteUser({ email, groupId }: any) {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/invite-user`,
      { email }
    );
    let data = response.data;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.response.data.error };
  }
}
export async function rejectGroupInvitation({ groupId }: any) {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/group-invitation/reject`,
      { groupId, userId }
    );
    let data = response.data;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.response.data.error };
  }
}
export async function confirmGroupInvitation({ groupId }: any) {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/group-invitation/confirm`,
      { groupId, userId }
    );
    let data = response.data;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.response.data.error };
  }
}

// update
export async function updateListInGroup({
  groupId,
  listId,
  listName,
  listDesc,
}: any) {
  try {
    await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/lists/${listId}/change-proposal`,
      { listName, listDesc }
    );
  } catch (error) {
    console.log(error);
  }
}
export async function updateProductInGroup({
  groupId,
  listId,
  productId,
}: any) {
  try {
    await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/lists/${listId}/products/${productId}/change-proposal`
    );
  } catch (error) {
    console.log(error);
  }
}

// delete
export async function deleteGroup({ groupId }: any) {
  try {
    await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/delete-proposal`
    );
  } catch (error) {
    console.log(error);
  }
}
export async function deleteListInGroup({ listId, groupId }: any) {
  try {
    await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/lists/${listId}/delete-proposal`
    );
  } catch (error) {
    console.log(error);
  }
}
export async function deleteProductInGroup({
  groupId,
  listId,
  productId,
}: any) {
  try {
    await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/groups/${groupId}/lists/${listId}/products/${productId}/delete-proposal`
    );
  } catch (error) {
    console.log(error);
  }
}
