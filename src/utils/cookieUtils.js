// Fungsi buat SET cookie
export function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${encodeURIComponent(
    value || ""
  )}${expires}; path=/`;
}

// Fungsi buat GET cookie
export function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    // Hapus whitespace di depan
    while (c.charAt(0) === " ") c = c.substring(1, c.length);

    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }

  return null;
}

export function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Set item ke localStorage
export function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
}

// Get item dari localStorage
export function getLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return null;
  }
}

// Hapus item dari localStorage
export function deleteLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error deleting from localStorage", error);
  }
}
