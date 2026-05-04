import https from 'https';

let cache = {
  data: null,
  timestamp: 0
};
const CACHE_TTL = 5 * 60 * 1000; // 5 mínútur

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    const now = Date.now();

    if (cache.data && (now - cache.timestamp) < CACHE_TTL) {
        return res.status(200).json(cache.data);
    }

    const url = 'https://gagnaveita.vegagerdin.is/api/vefur/vefurvefur';

    https.get(url, { timeout: 8000 }, (apiRes) => {
        let body = '';

        apiRes.on('data', chunk => body += chunk);

        apiRes.on('end', () => {
            try {
                if (apiRes.statusCode !== 200) {
                    cache.data = [];
                    cache.timestamp = Date.now();
                    return res.status(200).json([]);
                }

                const raw = JSON.parse(body);
                const list = Array.isArray(raw.stodvar) ? raw.stodvar : [];

                const processed = list.map(s => ({
                    nafn: s.stod || s.nafn || 'Óþekkt stöð',
                    lat: parseFloat(s.lat || s.breidd),
                    lon: parseFloat(s.lon || s.lengd),
                    vindhradi: parseFloat(s.vindhradi || s.vindhr || 0),
                    vindatt_grd: parseFloat(s.vindatt || s.vindatt_grd || 0),
                    hiti: parseFloat(s.hiti || s.hiti_2m || 0)
                })).filter(s => !isNaN(s.lat) && !isNaN(s.lon));

                cache.data = processed;
                cache.timestamp = Date.now();

                res.status(200).json(processed);
            } catch (err) {
                console.error('JSON villa:', err.message);
                cache.data = [];
                cache.timestamp = Date.now();
                res.status(200).json([]);
            }
        });
    }).on('error', (err) => {
        console.error('Netvilla:', err.message);
        if (cache.data) {
            return res.status(200).json(cache.data);
        }
        res.status(200).json([]);
    });
}
