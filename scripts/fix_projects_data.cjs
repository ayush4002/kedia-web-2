const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/projectsData.ts');
let content = fs.readFileSync(file, 'utf8');

const slugToCleanName = {
  'kedias-landmark': "Kedia's Landmark",
  'kedias-atulyam': "Kedia's Atulyam",
  'kedias-tulsi': "Kedia's Tulsi",
  'jagannathpuri': "Jagannathpuri",
  'kedia-shri-vatsal': "Kedia Shri Vatsal",
  'kedias-umang': "Kedia's Umang",
  'kedia-aravali': "Kedia Aravali",
  'ganpati-greens': "Ganpati Greens",
  'nikunj-villas': "Nikunj Villas",
  'kedias-amara': "Kedia's Amara",
  'kedia-utsav': "Kedia Utsav",
  'kedia-panchwati': "Kedia Panchwati",
  'alkapuri': "Alkapuri",
  'awadhpuri': "Awadhpuri",
  'virasat-your-dream-villas': "Virasat - Your Dream Villas",
  'anant-villas': "Anant Villas"
};

const lines = content.split('\n');
let modified = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('"slug":')) {
    const m = line.match(/"slug":\s*"([^"]+)"/);
    if (m) {
      const slug = m[1];
      const clean = slugToCleanName[slug];
      // look forward or backward for "name":
      for (let j = Math.max(0, i - 5); j <= Math.min(lines.length - 1, i + 5); j++) {
        if (lines[j].includes('"name":') && clean) {
          lines[j] = `    "name": "${clean}",`;
          modified++;
          break;
        }
      }
    }
  }
}

console.log(`Updated ${modified} project names in projectsData.ts`);
fs.writeFileSync(file, lines.join('\n'), 'utf8');

