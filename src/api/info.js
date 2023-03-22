export async function listInfo() {
  const res = await fetch("/api/info.php?action=all", { method: "GET" });
  return await res.json();
}

export async function addInfo(user, info) {
  const formData = new FormData();
  formData.append("action", "add");
  formData.append("user", user);
  formData.append("info", info);

  const res = await fetch("/api/info.php", {
    method: "POST",
    body: formData,
  });
  return res.status;
}

export async function updateInfo(id, user, info) {
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("action", "update");
  urlencoded.append("id", id);
  urlencoded.append("user", user);
  urlencoded.append("info", info);

  const res = await fetch("/api/info.php", {
    method: "PUT",
    headers,
    body: urlencoded,
  });
  return res.status;
}

export async function deleteInfo(id) {
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("action", "delete");
  urlencoded.append("id", id);
  const res = await fetch("/api/info.php", {
    method: "DELETE",
    headers,
    body: urlencoded,
  });
  return res.status;
}
