const token = process.env.YOUCAM_API_KEY;
const imageUrl = process.argv[2];

if (!token) {
  console.error("Set YOUCAM_API_KEY in your environment.");
  process.exit(1);
}
if (!imageUrl || !(imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))) {
  console.error("Usage: npm run skin -- https://public.example/selfie.jpg");
  process.exit(1);
}

const base = "https://yce-api-01.makeupar.com";
const headers = { Authorization: "Bearer " + token, "Content-Type": "application/json" };

const create = await fetch(base + "/s2s/v2.1/task/skin-analysis", {
  method: "POST",
  headers,
  body: JSON.stringify({
    src_file_url: imageUrl,
    dst_actions: ["hd_wrinkle", "hd_pore", "hd_texture", "hd_acne"]
  })
});

const created = await create.json();
if (!create.ok || !created?.data?.task_id) {
  console.error(JSON.stringify(created, null, 2));
  process.exit(1);
}

const taskId = created.data.task_id;
console.log("task_id:", taskId);

for (let attempt = 0; attempt < 30; attempt++) {
  await new Promise(r => setTimeout(r, 10000));
  const statusResponse = await fetch(base + "/s2s/v2.1/task/skin-analysis/" + encodeURIComponent(taskId), {
    headers: { Authorization: "Bearer " + token }
  });
  const status = await statusResponse.json();
  console.log(JSON.stringify(status, null, 2));
  const state = status?.data?.task_status;
  if (state === "success") process.exit(0);
  if (state === "error") process.exit(2);
}

console.error("Timed out waiting for YouCam task.");
process.exit(3);