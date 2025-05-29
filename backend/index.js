const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/data'); // Import your user schema
const cors = require('cors');
const Medicine = require('./models/Medicine');


const app = express();
const PORT = 5000;


app.use(cors()); // Enable CORS for all routes
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JWT Secret Key (In production, use environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

//DATA FEEDING


// ============================================
// SIGNUP ROUTE - Register New User
// ============================================
app.post('/signupdata', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    // Email format validation
    const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Password strength validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email address'
      });
    }

    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: savedUser._id, 
        email: savedUser.email,
        name: savedUser.name 
      },
      JWT_SECRET,
      { expiresIn: '7d' } // Token expires in 7 days
    );

    // Send success response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          createdAt: savedUser.createdAt
        },
        token: token,
        expiresIn: '7 days'
      }
    });

  } catch (error) {
    console.error('Signup Error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    // Handle duplicate key error (if email uniqueness is enforced in schema)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Email address is already registered'
      });
    }

    // General server error
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    });
  }
});

// ============================================
// LOGIN ROUTE - Authenticate User
// ============================================
app.post('/logindata', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        name: user.name 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Update last login time (optional - add this field to your schema if needed)
    // await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt
        },
        token: token,
        expiresIn: '7 days'
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login'
    });
  }
});

// ============================================
// MIDDLEWARE - Verify JWT Token
// ============================================
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token is required'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    
    req.user = decoded; // Add user info to request object
    next();
  });
};

// ============================================
// PROTECTED ROUTES EXAMPLES
// ============================================

// Get user profile (protected route)
app.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    });
  } catch (error) {
    console.error('Profile Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile'
    });
  }
});

// Update user profile (protected route)
app.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { name: name.trim() },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          updatedAt: updatedUser.updatedAt
        }
      }
    });
  } catch (error) {
    console.error('Profile Update Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile'
    });
  }
});

// Logout route (optional - for token blacklisting in production)
app.post('/logout', authenticateToken, (req, res) => {
  // In a real application, you might want to blacklist the token
  // For now, we'll just send a success response
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// ============================================
// MEDICINE ROUTES
// ============================================

// Add new medicine
app.post('/api/medicines', async (req, res) => {
  try {
    const { name, form, strength, price } = req.body;
    
    const newMedicine = new Medicine({
      name,
      form,
      strength,
      price
    });

    const savedMedicine = await newMedicine.save();
    res.status(201).json({
      success: true,
      data: savedMedicine
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding medicine',
      error: error.message
    });
  }
});

// Search medicines


// Get all medicines

// ============================================
// DATABASE CONNECTION
// ============================================
mongoose.connect('mongodb://localhost:27017/mydatabase')
.then(() => {     
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});


const medcationData = [
  { name: "Atorvastatin", form: "tab-cap", strength: "20 mg", price: 0.0439 },
  { name: "Atorvastatin", form: "tab-cap", strength: "10 mg", price: 0.0533 },
  { name: "Ibuprofen", form: "tab-cap", strength: "200 mg", price: 0.0193 },
  { name: "Ibuprofen", form: "tab-cap", strength: "400 mg", price: 0.0148 },
  { name: "Omeprazole", form: "tab-cap", strength: "20 mg", price: 0.0191 },
  { name: "Metformin", form: "tab-cap", strength: "500 mg", price: 0.0262 },
  { name: "Paracetamol", form: "tab-cap", strength: "500 mg", price: 0.0085 }
];

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('POST /signup - Register new user');
  console.log('POST /login - User login');
  console.log('GET /profile - Get user profile (protected)');
  console.log('PUT /profile - Update user profile (protected)');
  console.log('POST /logout - User logout (protected)');
  console.log('POST /api/medicines - Add new medicine');
  console.log('GET /api/medicines/search - Search medicines');
  console.log('GET /api/medicines - Get all medicines');
});

module.exports = app;
