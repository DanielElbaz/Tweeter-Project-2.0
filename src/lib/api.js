const BASE_URL =
  import.meta?.env?.VITE_SUPABASE_URL ||
  "https://uckmgdznnsnusvmyfvsb.supabase.co";
const API_KEY =
  import.meta?.env?.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVja21nZHpubnNudXN2bXlmdnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODU5NjAsImV4cCI6MjA3MDA2MTk2MH0.D82S0DBivlsXCCAdpTRB3YqLqTOIP7MUj-p1R8Lj9Jo";

const TABLE = "Tweets"; // table REST exposée

function headers(json = true) {
  return {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    ...(json ? { "Content-Type": "application/json", Prefer: "return=representation" } : {}),
  };
}

export async function fetchTweets() {
  const url = `${BASE_URL}/rest/v1/${TABLE}?select=*&order=date.desc&limit=10`;
  const res = await fetch(url, { headers: headers(false) });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Fetch failed (${res.status})`);
  }
  return res.json();
}

export async function createTweet({ content, userName, date }) {
  const url = `${BASE_URL}/rest/v1/${TABLE}`;
  const body = JSON.stringify([{ content, userName, date }]);
  const res = await fetch(url, { method: "POST", headers: headers(true), body });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Create failed (${res.status})`);
  }
  const rows = await res.json();
  return rows?.[0] || { content, userName, date };
}
