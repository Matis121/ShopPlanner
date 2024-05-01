import axios from "axios";

// getUserLists
export async function getUserLists() {
  let response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/get-user-lists`
  );
  let data = response.data;
  console.log(data);
  return data;
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
