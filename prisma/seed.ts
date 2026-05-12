import { PrismaClient } from '@prisma/client';
import path from 'path';
import bcrypt from 'bcrypt';
import { readdir, readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import { fieldTypes } from './types.js';

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const directory = path.join(__dirname, 'csv');

// Array til defination af rækkefølge
const order = [
  'user',
  'product',
  'testemony'
];

async function main() {
  try {
    console.log('Clearing database...');

    // Slet i reverse order (pga relations)
    for (const model of order.slice().reverse()) {
      await (prisma[model as ModelName] as any).deleteMany();
    }

    console.log('Database cleared\n');

    const files = await readdir(directory);

    for (const model of order) {
      const file = `${model}.csv`;

      if (!files.includes(file)) {
        console.log(`Skipping ${model} (no CSV)`);
        continue;
      }

      console.log(`Seeding ${model}...`);

      const fullpath = path.join(directory, file);
      const content = await readFile(fullpath, 'utf-8');

      const rawRecords = parse(content, {
        columns: true,
        skip_empty_lines: true
      });

      const cleanedData = await Promise.all(
        rawRecords.map((row: Record<string, any>) =>
          castRow(model, row)
        )
      );

      await (prisma[model as ModelName] as any).createMany({
        data: cleanedData
      });

      console.log(`${model} seeded (${cleanedData.length} rows)\n`);
    }

    console.log('SEED COMPLETE');
  } catch (error) {
    console.error('SEED FAILED:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

// TYPES
type ModelName = Exclude<keyof typeof prisma,
  | '$connect'
  | '$disconnect'
  | '$on'
  | '$transaction'
  | '$use'
  | '$executeRaw'
  | '$executeRawUnsafe'
  | '$queryRaw'
  | '$queryRawUnsafe'
>;


// DATA CASTING
const castRow = async (model: string, row: Record<string, any>) => {
  const schema = fieldTypes[model];
  const converted: Record<string, any> = {};

  for (const [key, value] of Object.entries(row)) {
    const type = schema[key] || 'string';
    const val = value?.toString().trim();

    if (type === 'number') {
      converted[key] = Number(val);

    } else if (type === 'boolean') {
      converted[key] = val === '1' || val === 'true';

    } else if (type === 'date') {
      converted[key] = new Date(val);

    } else {
      if (key === 'password') {
        converted[key] = await bcrypt.hash(val, 10);
      } else {
        converted[key] = val;
      }
    }
  }

  return converted;
};