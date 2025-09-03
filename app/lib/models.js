import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 20
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  img: {
    type: String,
    default: "/noavatar.png"
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});

// Product Schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  color: {
    type: String
  },
  size: {
    type: String
  },
  cat: {
    type: String,
    required: true
  },
  img: {
    type: String,
    default: "/noproduct.jpg"
  }
}, { 
  timestamps: true 
});

// Export Models
export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);