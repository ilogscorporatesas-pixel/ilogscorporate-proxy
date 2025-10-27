# ilogscorporate-proxy

Este proyecto contiene dos endpoints API listos para desplegar en Vercel:

- `GET /api/airlabs?search=bog`  -> proxy seguro para AirLabs (autocompletado de aeropuertos)
- `POST /api/tarifas` -> proxy que reenvía el JSON al endpoint de RapidAPI (air-cargo-schedule-and-rate /search)

**Notas**
- Las claves de API (AirLabs y RapidAPI) han sido integradas en los archivos `api/airlabs.js` y `api/tarifas.js`.
- Al desplegar en Vercel, la URL resultante será algo como:
  `https://<tu-proyecto>.vercel.app/api/airlabs?search=bog`
  `https://<tu-proyecto>.vercel.app/api/tarifas`

**Instrucciones rápidas para desplegar**
1. Entra a https://vercel.com/dashboard
2. Haz clic en "Add New" → "Project"
3. Selecciona "Import" → "Upload" y sube este ZIP
4. Dale Deploy y espera a que finalice

Después de desplegar, pega la URL que Vercel te asigne y reemplaza en tu frontend las llamadas directas por la nueva URL proxy.
