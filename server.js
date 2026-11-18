const http = require('http');
const fs = require('fs');
const path = require('path');

// Port 8080 by default (3000 and 3030 are often busy locally). Override with PORT.
const PORT = process.env.PORT || 8080;

const CITIES = [
  { city: 'Lagos', country: 'Nigeria', zone: 'Africa/Lagos' },
  { city: 'Accra', country: 'Ghana', zone: 'Africa/Accra' },
  { city: 'Cairo', country: 'Egypt', zone: 'Africa/Cairo' },
  { city: 'Algiers', country: 'Algeria', zone: 'Africa/Algiers' },
  { city: 'Casablanca', country: 'Morocco', zone: 'Africa/Casablanca' },
  { city: 'Addis Ababa', country: 'Ethiopia', zone: 'Africa/Addis_Ababa' },
  { city: 'Nairobi', country: 'Kenya', zone: 'Africa/Nairobi' },
  { city: 'Kinshasa', country: 'DR Congo', zone: 'Africa/Kinshasa' },
  { city: 'Johannesburg', country: 'South Africa', zone: 'Africa/Johannesburg' },
];

function formatTime(zone, date) {
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: zone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
  const day = new Intl.DateTimeFormat('en-GB', {
    timeZone: zone,
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
  return { time, date: day };
}

function getTimes() {
  const now = new Date();
  return {
    serverTime: now.toISOString(),
    cities: CITIES.map((c) => ({ ...c, ...formatTime(c.zone, now) })),
  };
}

const INDEX_HTML = fs.readFileSync(path.join(__dirname, 'public', 'index.html'));

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];

  if (url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('ok');
  }

  if (url === '/api/times') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    });
    return res.end(JSON.stringify(getTimes()));
  }

  if (url === '/' || url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(INDEX_HTML);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Africa Time running on http://localhost:${PORT}`);
});
