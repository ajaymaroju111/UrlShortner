const  {isValidUrl,  generateRandomCode, mapRow } = require("../utils/function");
const db = require('../config/config');




let code = requestedCode ? String(requestedCode).trim() : null;

if (code) {
  if (!CODE_REGEX.test(code)) {
    return res.status(400).json({ error: "Custom code must match [A-Za-z0-9]{6,8}" });
  }

  const { rowCount } = await db.query("SELECT 1 FROM links WHERE code = $1", [code]);
  if (rowCount > 0) {
    return res.status(409).json({ error: "Code already exists" });
  }
} else {
  // generate unique code (try up to N times)
  let tries = 0;
  do {
    code = generateRandomCode(6);
    const r = await db.query("SELECT 1 FROM links WHERE code = $1", [code]);
    if (r.rowCount === 0) break;
    tries++;
  } while (tries < 10);

  if (!code) {
    return res.status(500).json({ error: "Failed to generate unique code" });
  }
}


const getAllLinks = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM links ORDER BY created_at DESC");
    const rows = result.rows.map(mapRow);
    res.status(200).json(rows);
  } catch (err) {
    console.error("GET /api/links error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

const getLinkByCode = async (req, res) => {
  const { code } = req.params;
  try {
    const result = await db.query("SELECT * FROM links WHERE code = $1", [code]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Not found" });
    }
    console.log(mapRow(result.rows[0]))
    res.status(200).json(mapRow(result.rows[0]));
  } catch (err) {
    console.error("GET /api/links/:code error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

const DeleteByCode = async (req, res) => {
  const { code } = req.params;
  try {
    const result = await db.query("DELETE FROM links WHERE code = $1 RETURNING *", [code]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json({ ok: true, deleted: code });
  } catch (err) {
    console.error("DELETE /api/links/:code error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

const RedirectUsingCode = async (req, res) => {
  const { code } = req.params;
  // block health and api routes (simple guard)
  if (code === "healthz" || code === "api") {
    return res.status(404).send("Not found");
  }

  try {
    // Update click count and get url in one statement
    const result = await db.query(
      `UPDATE links
       SET click_count = click_count + 1,
           last_clicked = now()
       WHERE code = $1
       RETURNING url`,
      [code]
    );

    if (result.rowCount === 0) {
      return res.status(404).send("Short link not found");
    }

    const url = result.rows[0].url;
    // 302 redirect
    return res.redirect(302, url);
  } catch (err) {
    console.error("GET /:code redirect error:", err);
    return res.status(500).send("Internal server error");
  }
}



module.exports = {
  CreateShortUrl,
  getAllLinks,
  getLinkByCode,
  DeleteByCode,
  RedirectUsingCode
}