export async function createPost(obj) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  return response;
}

export async function deletePost(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    { method: "DELETE" }
  );
  return response;
}

export async function editPost(id, obj) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(obj),
    }
  );
  return response;
}
