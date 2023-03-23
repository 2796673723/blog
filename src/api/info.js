export async function listInfo() {
  const res = await fetch("/api/info.php?action=all", { method: "GET" });
  return await res.json();
}

function generateHeader(token, isForm = false) {
  const headers = new Headers();
  if (isForm)
    headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("token", token);
  return headers;
}

export async function addInfo(user, info, token) {
  const formData = new FormData();
  formData.append("action", "add");
  formData.append("user", user);
  formData.append("info", info);

  const res = await fetch("/api/info.php", {
    method: "POST",
    body: formData,
    headers: generateHeader(token),
  });
  return res.status;
}

export async function updateInfo(id, user, info, token) {
  const urlencoded = new URLSearchParams();
  urlencoded.append("action", "update");
  urlencoded.append("id", id);
  urlencoded.append("user", user);
  urlencoded.append("info", info);

  const res = await fetch("/api/info.php", {
    method: "PUT",
    headers: generateHeader(token, true),
    body: urlencoded,
  });
  return res.status;
}

export async function deleteInfo(id, token) {
  const urlencoded = new URLSearchParams();
  urlencoded.append("action", "delete");
  urlencoded.append("id", id);
  const res = await fetch("/api/info.php", {
    method: "DELETE",
    headers: generateHeader(token, true),
    body: urlencoded,
  });
  return res.status;
}
