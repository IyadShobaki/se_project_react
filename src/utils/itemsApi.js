export const getItems = (itemsBaseUrl) => {
  return request(`${itemsBaseUrl}/items`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};

export const addItem = (itemsBaseUrl) => {
  return request(`${itemsBaseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
};

export const deleteItem = (itemsBaseUrl, id) => {
  return request(`${itemsBaseUrl}/items/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};
const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};
const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};
