

function isValidUrl(str) {
  try {
    const u = new URL(str);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch (err) {
    return false;
  }
}

function generateRandomCode(len = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

function mapRow(row) {
  return {
    code: row.code,
    url: row.url,
    clickCount: Number(row.click_count || 0),
    lastClicked: row.last_clicked ? row.last_clicked.toISOString() : null,
    createdAt: row.created_at ? row.created_at.toISOString() : null
  };
}

module.exports = {
  isValidUrl,
  generateRandomCode,
  mapRow
}