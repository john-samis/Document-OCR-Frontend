const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

function mustBase() {
  if (!API_BASE) throw new Error("VITE_API_BASE_URL is not set");
  return API_BASE.replace(/\/+$/, "");
}

export async function createJob() {
  const res = await fetch(`${mustBase()}/v1/jobs`, { method: "POST" });
  if (!res.ok) throw new Error(`createJob failed: ${res.status}`);
  return res.json(); // { job_id, status_url, upload_url, result_url }
}

export async function uploadPdf(jobId: string, file: File) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${mustBase()}/v1/jobs/${jobId}/file`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`uploadPdf failed: ${res.status} ${msg}`);
  }
  return res.json();
}

export async function getJob(jobId: string) {
  const res = await fetch(`${mustBase()}/v1/jobs/${jobId}`);
  if (!res.ok) throw new Error(`getJob failed: ${res.status}`);
  return res.json();
}

export function resultUrl(jobId: string) {
  return `${mustBase()}/v1/jobs/${jobId}/result`;
}

export async function smokeTestBackend() {
  const res = await fetch(`${mustBase()}/v1/smoke_test_backend`, { method: "GET" });
  if (!res.ok) throw new Error(`smokeTest failed: ${res.status}`);
  return res.json();
}