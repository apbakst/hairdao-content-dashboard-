#!/usr/bin/env node
/**
 * Update Precision Dutasteride Chart Data
 * 
 * Usage:
 *   node update-dht-data.js --systemic=0 --patients=15 --days=120
 *   node update-dht-data.js --timeline="100,99,98,97" --oral="100,12,10,8"
 * 
 * Options:
 *   --systemic=N       Systemic DHT change percentage (e.g., 0, -5, 2)
 *   --patients=N       Number of trial participants
 *   --days=N           Days of data collected
 *   --precision=N      Precision Dut DHT reduction % (for bar chart)
 *   --timeline=A,B,C,D Precision Dut timeline values (baseline, day30, day60, day90)
 *   --oral=A,B,C,D     Oral Dut timeline values for comparison
 */

const fs = require('fs');
const path = require('path');

const HTML_FILE = path.join(__dirname, 'precision-dut-charts.html');

// Parse command line arguments
const args = {};
process.argv.slice(2).forEach(arg => {
    const match = arg.match(/^--(\w+)=(.+)$/);
    if (match) {
        args[match[1]] = match[2];
    }
});

// Read current HTML
let html = fs.readFileSync(HTML_FILE, 'utf8');

// Find and update the DATA object
const dataMatch = html.match(/const DATA = \{[\s\S]*?\n        \};/);
if (!dataMatch) {
    console.error('❌ Could not find DATA object in HTML file');
    process.exit(1);
}

let dataBlock = dataMatch[0];

// Update values based on arguments
if (args.systemic !== undefined) {
    dataBlock = dataBlock.replace(
        /systemicChange:\s*[-\d]+/,
        `systemicChange: ${parseInt(args.systemic)}`
    );
    console.log(`✓ Updated systemicChange to ${args.systemic}%`);
}

if (args.patients !== undefined) {
    dataBlock = dataBlock.replace(
        /patientsCount:\s*\d+/,
        `patientsCount: ${parseInt(args.patients)}`
    );
    console.log(`✓ Updated patientsCount to ${args.patients}`);
}

if (args.days !== undefined) {
    dataBlock = dataBlock.replace(
        /daysOfData:\s*\d+/,
        `daysOfData: ${parseInt(args.days)}`
    );
    console.log(`✓ Updated daysOfData to ${args.days}`);
}

if (args.precision !== undefined) {
    dataBlock = dataBlock.replace(
        /precisionDutasteride:\s*\d+/,
        `precisionDutasteride: ${parseInt(args.precision)}`
    );
    console.log(`✓ Updated precisionDutasteride comparison to ${args.precision}%`);
}

if (args.timeline !== undefined) {
    const values = args.timeline.split(',').map(v => parseInt(v.trim()));
    dataBlock = dataBlock.replace(
        /precisionDut:\s*\[[^\]]+\]/,
        `precisionDut: [${values.join(', ')}]`
    );
    console.log(`✓ Updated Precision Dut timeline to [${values.join(', ')}]`);
}

if (args.oral !== undefined) {
    const values = args.oral.split(',').map(v => parseInt(v.trim()));
    dataBlock = dataBlock.replace(
        /oralDut:\s*\[[^\]]+\]/,
        `oralDut: [${values.join(', ')}]`
    );
    console.log(`✓ Updated Oral Dut timeline to [${values.join(', ')}]`);
}

// Replace in HTML
html = html.replace(dataMatch[0], dataBlock);

// Write back
fs.writeFileSync(HTML_FILE, html, 'utf8');
console.log('\n📊 Updated:', HTML_FILE);
console.log('🌐 Open in browser to see changes');

// Show current values
console.log('\n--- Current Data Values ---');
const systemicMatch = dataBlock.match(/systemicChange:\s*([-\d]+)/);
const patientsMatch = dataBlock.match(/patientsCount:\s*(\d+)/);
const daysMatch = dataBlock.match(/daysOfData:\s*(\d+)/);
const precisionMatch = dataBlock.match(/precisionDutasteride:\s*(\d+)/);

if (systemicMatch) console.log(`Systemic Change: ${systemicMatch[1]}%`);
if (patientsMatch) console.log(`Patients: ${patientsMatch[1]}`);
if (daysMatch) console.log(`Days: ${daysMatch[1]}`);
if (precisionMatch) console.log(`Precision DHT Reduction: ${precisionMatch[1]}%`);
