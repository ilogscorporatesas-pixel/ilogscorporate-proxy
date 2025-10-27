export default async function handler(req, res) {
  // Allow browser requests from your domain(s)
  res.setHeader('Access-Control-Allow-Origin', 'https://www.ilogscorporate.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const search = req.query.search || '';
  if (!search || search.length < 1) {
    return res.status(400).json({ error: "Parámetro 'search' requerido" });
  }

  // <<< AIRLABS API KEY EMBEDDED HERE >>>
  const AIRLABS_API_KEY = "467b1374-3880-49c9-b77b-f2e1f0746f23";

  const apiUrl = `https://airlabs.co/api/v9/airports?api_key=${AIRLABS_API_KEY}&search=${encodeURIComponent(search)}`;

  try {
    const r = await fetch(apiUrl, { method: 'GET' });
    const data = await r.json();

    if (!data || !data.response) {
      return res.status(404).json({ error: "No se encontraron resultados." });
    }

    const airports = data.response.map(a => ({
      name: a.name || '',
      city: a.city || '',
      code: a.iata_code || a.iata || '',
      raw: a
    }));

    return res.status(200).json({ airports });
  } catch (err) {
    console.error("Error contacting AirLabs:", err);
    return res.status(500).json({ error: "Error interno del proxy (AirLabs)" });
  }
}
