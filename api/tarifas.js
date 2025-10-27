export default async function handler(req, res) {
  // Allow browser requests from your domain(s)
  res.setHeader('Access-Control-Allow-Origin', 'https://www.ilogscorporate.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Use POST with JSON body' });
  }

  const body = req.body;
  if (!body) {
    return res.status(400).json({ error: 'Se requiere body JSON con los parámetros de búsqueda' });
  }

  // <<< RAPIDAPI CREDENTIALS EMBEDDED HERE >>>
  const RAPIDAPI_HOST = "air-cargo-schedule-and-rate.p.rapidapi.com";
  const RAPIDAPI_KEY  = "f584d1c7b1msh7d0018d01029597p100aadjsnbaca80d073e7";
  const endpoint = `https://${RAPIDAPI_HOST}/search`;

  try {
    const r = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': RAPIDAPI_HOST,
        'x-rapidapi-key': RAPIDAPI_KEY
      },
      body: JSON.stringify(body),
      // timeout not available in fetch; Vercel will enforce function limits
    });

    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (err) {
    console.error("Error contacting RapidAPI:", err);
    return res.status(500).json({ error: "Error interno del proxy (Tarifas)" });
  }
}
