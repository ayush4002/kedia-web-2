const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/unitsData.ts');
let content = fs.readFileSync(file, 'utf8');

// Map of projectSlug to clean project name
const projectSlugNames = {
  'kedias-atulyam': "Kedia's Atulyam",
  'kedias-landmark': "Kedia's Landmark",
  'kedias-tulsi': "Kedia's Tulsi",
  'kedias-umang': "Kedia's Umang",
  'kedia-shri-vatsal': "Kedia Shri Vatsal",
  'kedia-aravali': "Kedia Aravali",
  'jagannathpuri': "Jagannathpuri",
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

// Check matches
const lines = content.split('\n');
let modified = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('"projectSlug":')) {
    const slugMatch = line.match(/"projectSlug":\s*"([^"]+)"/);
    if (slugMatch) {
      const slug = slugMatch[1];
      const cleanName = projectSlugNames[slug];
      if (cleanName && lines[i + 1] && lines[i + 1].includes('"projectName":')) {
        lines[i + 1] = `    "projectName": "${cleanName}",`;
        modified = true;
      }
    }
  }
}

if (modified) {
  fs.writeFileSync(file, lines.join('\n'), 'utf8');
  console.log('Successfully cleaned all projectNames in unitsData.ts!');
} else {
  console.log('No modifications needed.');
}

