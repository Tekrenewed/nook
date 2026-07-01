import { createClient } from '@supabase/supabase-js';
import type { MenuItem } from '../types/menu';
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const menuItems: MenuItem[] = [
  { name: 'The Smash', description: 'Patty, Cheese, Pickles, House Sauce (Single/Double)', price: 8.99, ingredients: '100% Angus Beef, American Cheese, House Pickles, Secret Smash Sauce, Potato Bun', category: 'Burgers', isDailyItem: false, isActive: true },
  { name: 'Truffle Smash', description: 'Patty, Cheese, Truffle Mayo, Crispy Onions (Single/Double)', price: 9.99, ingredients: '100% Angus Beef, Swiss Cheese, Black Truffle Mayo, Crispy Shallots, Potato Bun', category: 'Burgers', isDailyItem: false, isActive: true },
  { name: 'Stack\'d', description: 'Triple Patty, Triple Cheese, House Sauce (pickles)', price: 10.99, category: 'Burgers', isDailyItem: false, isActive: true },
  { name: 'Bacon Smash', description: 'Double patty, crispy bacon, pickles, house sauce', price: 10.99, category: 'Burgers', isDailyItem: false, isActive: true },
  { name: 'Beyond Smash', description: 'Vegan Patty, Vegan Cheese, House Sauce', price: 9.99, ingredients: 'Beyond Meat Patty, Vegan Cheddar, House Sauce, Vegan Potato Bun', category: 'Burgers', isDailyItem: false, isActive: true },
  { name: 'Hot Smash', description: 'Single patty, jelepenos, pickles, hot sauce', price: 8.99, category: 'Burgers', isDailyItem: false, isActive: true },
  { name: 'Cluck\'d', description: 'Fried Fillet, Cheese, House Sauce', price: 8.99, category: 'Burgers', isDailyItem: false, isActive: true },
  { name: 'Fries (Plain/Cheesy/Truffle)', description: '', price: 3.99, category: 'Sides', isDailyItem: false, isActive: true },
  { name: 'Loaded Fries', description: '', price: 5.99, category: 'Sides', isDailyItem: false, isActive: true },
  { name: 'Tater Tots', description: '', price: 4.50, category: 'Sides', isDailyItem: false, isActive: true },
  { name: 'Oreo Dream', description: '', price: 5.50, category: 'Desserts', isDailyItem: false, isActive: true },
  { name: 'Matilda Cake', description: '', price: 6.50, category: 'Desserts', isDailyItem: false, isActive: true },
  { name: 'Chocolate', description: '', price: 4.99, category: 'Shakes', isDailyItem: false, isActive: true },
  { name: 'Strawberry', description: '', price: 4.99, category: 'Shakes', isDailyItem: false, isActive: true },
  { name: 'Vanilla', description: '', price: 4.99, category: 'Shakes', isDailyItem: false, isActive: true },
  { name: 'Soda', description: '', price: 1.99, category: 'Drinks', isDailyItem: false, isActive: true },
  { name: 'Water', description: '', price: 1.50, category: 'Drinks', isDailyItem: false, isActive: true },
  { name: '0% Beer', description: '', price: 3.50, category: 'Drinks', isDailyItem: false, isActive: true },
];

async function seed() {
  console.log('Seeding database...');
  for (const item of menuItems) {
    await supabase.from('menuItems').insert([item]);
    console.log(`Added: ${item.name}`);
  }
  console.log('Seeding complete!');
}

seed().catch(console.error);
