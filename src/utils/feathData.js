import axios from "axios";

const apiUrl = "https://ltct-sp19-api.herokuapp.com";

export const getData = async (url) => {
  const res = await axios.get(`${apiUrl}/api/${url}`);
  const data = res.data;
  return data;
};

export const postData = async (url, post) => {
  const res = await axios.post(`${apiUrl}/api/${url}`, post);

  const data = res.data;
  return data;
};

export const putData = async (url, post) => {
  const res = await axios.put(`${apiUrl}/api/${url}`, post);

  const data = res.data;
  return data;
};

export const patchData = async (url, post, token) => {
  const res = await fetch(`${apiUrl}/api/${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

export const deleteData = async (url, token) => {
  const res = await fetch(`${apiUrl}/api/${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await res.json();
  return data;
};
