import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Models
import User from './models/User.js';
import Cause from './models/Cause.js';
import Event from './models/Event.js';
import FAQ from './models/FAQ.js';
import Testimonial from './models/Testimonial.js';
import Gallery from './models/Gallery.js';
import AdminSettings from './models/AdminSettings.js';

dotenv.config();

// Connect to DB
await connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Cause.deleteMany();
    await Event.deleteMany();
    await FAQ.deleteMany();
    await Testimonial.deleteMany();
    await Gallery.deleteMany();
    await AdminSettings.deleteMany();

    // 1. Create Admin User
    const adminUser = await User.create({
      name: 'Admin',
      email: 'admin@gaushala.org',
      password: 'Admin@123',
      role: 'admin'
    });

    // 2. Seed Causes
    await Cause.create([
      {
        title: 'Feed a Cow',
        description: 'Provide daily nutritious food for our cows. Your contribution ensures they receive fresh green fodder, jaggery, and special nutritional supplements.',
        image: 'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        suggestedAmount: 1100,
        goalAmount: 500000,
        raisedAmount: 350000,
        donorCount: 245,
        category: 'Food',
        isActive: true
      },
      {
        title: 'Medical Treatment',
        description: 'Help us provide necessary medical care, medicines, and surgical treatments for injured or sick cows brought to our shelter.',
        image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        suggestedAmount: 2100,
        goalAmount: 300000,
        raisedAmount: 120000,
        donorCount: 112,
        category: 'Medical',
        isActive: true
      },
      {
        title: 'Shelter Maintenance',
        description: 'Support the construction of new sheds and maintenance of existing ones to protect cows from harsh weather conditions.',
        image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        suggestedAmount: 5100,
        goalAmount: 1000000,
        raisedAmount: 450000,
        donorCount: 89,
        category: 'Infrastructure',
        isActive: true
      }
    ]);

    // 3. Seed Events
    await Event.create([
      {
        title: 'Gopashtami Mahotsav',
        description: 'Join us for the grand celebration of Gopashtami. Special prayers, cow worship, and community feast will be organized.',
        date: new Date('2023-11-20T10:00:00Z'),
        location: 'Main Gaushala Campus',
        image: 'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Festival',
        organizer: 'Gaushala Trust',
        isActive: true
      },
      {
        title: 'Free Veterinary Camp',
        description: 'A free health checkup camp for cattle from nearby villages. Expert veterinarians will be present.',
        date: new Date('2023-12-05T09:00:00Z'),
        location: 'Village Square',
        image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Medical',
        organizer: 'Dr. Sharma & Team',
        isActive: true
      }
    ]);

    // 4. Seed FAQs
    await FAQ.create([
      { question: 'How can I donate?', answer: 'You can donate online through our website using credit/debit cards, net banking, or UPI. We also accept direct bank transfers.', order: 1 },
      { question: 'Is my donation tax-deductible?', answer: 'Yes, all donations made to our Gaushala are eligible for tax exemption under section 80G of the Income Tax Act.', order: 2 },
      { question: 'Can I visit the Gaushala?', answer: 'Yes, we welcome visitors everyday between 9:00 AM and 5:00 PM. Please book a visit through our website.', order: 3 }
    ]);

    // 5. Seed AdminSettings
    await AdminSettings.create({
      aboutTitle: 'About Our Gaushala',
      aboutDescription: 'Dedicated to the welfare and protection of cows.',
      mission: 'To provide a safe haven for all destitute cows.',
      vision: 'A world where every cow is respected and protected.',
      contactInfo: { address: '123 Gaushala Road', phone: '+91 9876543210', email: 'info@gaushala.org', hours: '9AM - 5PM' },
    });

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Cause.deleteMany();
    await Event.deleteMany();
    await FAQ.deleteMany();
    await Testimonial.deleteMany();
    await Gallery.deleteMany();
    await AdminSettings.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '--destroy') {
  destroyData();
} else {
  importData();
}
