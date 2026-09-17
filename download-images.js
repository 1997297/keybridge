const fs = require("fs");
const path = require("path");
const https = require("https");

const targetDir = path.join(__dirname, "public", "images");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const images = [
  {
    name: "townhouse.jpg",
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "apartment.jpg",
    url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "studio.jpg",
    url: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "condo.jpg",
    url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "duplex.jpg",
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "single-family.jpg",
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
];

function download(item) {
  return new Promise((resolve, reject) => {
    const dest = path.join(targetDir, item.name);
    const file = fs.createWriteStream(dest);

    https
      .get(item.url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          https
            .get(res.headers.location, (redRes) => {
              redRes.pipe(file);
              file.on("finish", () => {
                file.close();
                console.log("Saved redirected:", item.name);
                resolve();
              });
            })
            .on("error", reject);
        } else if (res.statusCode === 200) {
          res.pipe(file);
          file.on("finish", () => {
            file.close();
            console.log("Saved:", item.name);
            resolve();
          });
        } else {
          reject(new Error(`Failed with status ${res.statusCode} for ${item.name}`));
        }
      })
      .on("error", reject);
  });
}

Promise.all(images.map(download))
  .then(() => {
    console.log("All 6 property images downloaded successfully.");
  })
  .catch((err) => {
    console.error("Error downloading property images:", err);
    process.exit(1);
  });
