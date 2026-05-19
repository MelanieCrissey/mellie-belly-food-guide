import fs from 'fs';
import path from 'path';

const restaurants = JSON.parse(fs.readFileSync('./src/data/restaurants.json', 'utf-8'));
const imageDir = './public/images';

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

console.log(`Found ${restaurants.length} restaurants`);

const updates = [];

for (const restaurant of restaurants) {
  const url = restaurant.heroImage;
  if (!url) {
    console.log(`Skipping ${restaurant.name} - no heroImage`);
    continue;
  }

  const fileName = `${restaurant.id}.webp`;
  const localPath = `/images/${fileName}`;
  const fullPath = path.join(imageDir, fileName);

  if (fs.existsSync(fullPath)) {
    console.log(`Already downloaded: ${restaurant.name}`);
    updates.push({ ...restaurant, heroImage: localPath });
    continue;
  }

  console.log(`Downloading: ${restaurant.name}...`);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync(fullPath, buffer);
    console.log(`  Saved: ${fileName} (${(buffer.length / 1024).toFixed(1)} KB)`);
    updates.push({ ...restaurant, heroImage: localPath });
  } catch (error) {
    console.error(`  ERROR downloading ${restaurant.name}: ${error.message}`);
    updates.push(restaurant);
  }
}

// Write updated JSON
fs.writeFileSync('./src/data/restaurants.json', JSON.stringify(updates, null, 2) + '\n');
console.log('\nUpdated restaurants.json with local image paths');
