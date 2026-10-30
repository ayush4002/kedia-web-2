const fs = require('fs');
const path = require('path');

// Read TypeScript files
const projectsContent = fs.readFileSync('src/data/projectsData.ts', 'utf8');
const unitsContent = fs.readFileSync('src/data/unitsData.ts', 'utf8');

// Extract PROJECTS array by parsing JSON-like array
const projectsMatch = projectsContent.match(/export const PROJECTS: Project\[] = (\[[\s\S]*?\]);\s*export const/);
if (!projectsMatch) {
  console.error("Couldn't find PROJECTS array");
  process.exit(1);
}
const projects = JSON.parse(projectsMatch[1]);

// Extract INITIAL_UNITS
const unitsMatch = unitsContent.match(/export const INITIAL_UNITS: InventoryUnit\[] = (\[[\s\S]*?\]);\s*export const getUnitsByProject/);
if (!unitsMatch) {
  console.error("Couldn't find INITIAL_UNITS array");
  process.exit(1);
}
const units = JSON.parse(unitsMatch[1]);

console.log(`Parsed ${projects.length} projects and ${units.length} units.`);

// Generate ProjectSeeder.php
let projectSeederPhp = `<?php

namespace Database\\Seeders;

use Illuminate\\Database\\Seeder;
use Illuminate\\Support\\Facades\\DB;
use App\\Models\\Project;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = ${JSON.stringify(projects.map(p => ({
          slug: p.slug,
          name: p.name,
          type: p.type,
          classification: p.classification || 'Residential',
          status: p.status || 'ongoing',
          location: p.location,
          address: p.address,
          description: p.description,
          latitude: p.latitude,
          longitude: p.longitude,
          rera_number: p.reraNumber,
          rera_verified: p.reraVerified ? 1 : 0,
          price_label: p.priceLabel,
          starting_price: p.startingPrice,
          possession_label: p.possessionLabel,
          cover_image: p.cover,
          logo_image: p.logo,
          brochure_path: p.brochurePath,
          sales_phone: p.salesPhone || '+91 8302 500 500',
          sort_order: p.sortOrder || 0,
          amenities: JSON.stringify(p.amenities || []),
          configs: JSON.stringify(p.configs || []),
          images: JSON.stringify(p.images || []),
          specs: JSON.stringify(p.specs || []),
          aerial_backdrop: '/media/img/2025/04/DJI_0788-3-scaled-1920.webp',
          created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        })), null, 4)};

        foreach ($projects as $item) {
            DB::table('projects')->updateOrInsert(['slug' => $item['slug']], $item);
        }
    }
}
`;

fs.writeFileSync('database/seeders/ProjectSeeder.php', projectSeederPhp);
console.log('ProjectSeeder.php generated.');

// Generate UnitSeeder.php (take up to 100 featured units)
const sampleUnits = units.slice(0, 120);

let unitSeederPhp = `<?php

namespace Database\\Seeders;

use Illuminate\\Database\\Seeder;
use Illuminate\\Support\\Facades\\DB;
use App\\Models\\Unit;

class UnitSeeder extends Seeder
{
    public function run(): void
    {
        $units = ${JSON.stringify(sampleUnits.map(u => ({
          unit_code: u.id,
          unit_number: u.unitNumber,
          project_slug: u.projectSlug,
          project_name: u.projectName,
          tower_or_block: u.towerOrBlock || 'Phase 1',
          unit_type: u.unitType || 'Villa',
          configuration: u.configuration,
          bedrooms: u.bedrooms || 3,
          bathrooms: u.bathrooms || 3,
          area_sqft: u.areaSqFt || 1800,
          area_sqyd: u.areaSqYd || 120,
          facing: u.facing || 'East',
          floor_level: u.floorLevel || 'Ground',
          status: u.status || 'available',
          base_price: u.basePrice,
          development_charges: u.developmentCharges,
          club_membership: u.clubMembership,
          parking_charges: u.parkingCharges,
          gst: u.gst,
          stamp_duty_registration: u.stampDutyRegistration,
          total_price: u.totalPrice,
          is_featured: u.isFeatured ? 1 : 0,
          specifications: JSON.stringify(u.specifications || {}),
          possession: u.possession || 'Ready for Possession',
          created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        })), null, 4)};

        foreach ($units as $u) {
            DB::table('units')->updateOrInsert(['unit_code' => $u['unit_code']], $u);
        }
    }
}
`;

fs.writeFileSync('database/seeders/UnitSeeder.php', unitSeederPhp);
console.log('UnitSeeder.php generated.');
