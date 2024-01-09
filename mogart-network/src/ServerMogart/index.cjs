const express = require('express');
const app = express();
const port = process.env.PORT || 3040;

// Body parsing middleware to parse JSON bodies
const bodyParser = require('body-parser');

// CSRF protection middleware
const csrf = require('csurf');

// Middleware to parse cookies
const cookieParser = require('cookie-parser');

// Importing functions for database operations
const { checkUserExists, getBlogPosts, getBlogPostByURL, RegisterUserWallet, LoginUserWallet } = require('./Database/Database.cjs');

// Setup CSRF protection using cookies
const csrfProtection = csrf({ cookie: { httpOnly: true } });
app.use(cookieParser());
app.use(express.json());

// CORS middleware setup to allow requests from specified origins
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000']; // => You must add your own address here.
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, CSRF-Token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Route to request a CSRF token
app.get('/TokenRequest', csrfProtection, (req, res) => {
  console.log("Token request received");
  res.status(200).json({ csrfToken: req.csrfToken() });
});

// Route to retrieve a blog post by its URL
app.get('/Blogs/:url', csrfProtection, async (req, res) => {
  try {
    const blogUrl = req.params.url; 
    const blogPost = await getBlogPostByURL(blogUrl); 
    res.status(200).json(blogPost);
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    if (error.message === 'Blog post not found') {
      res.status(404).json({ error: 'Blog post not found' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Route to retrieve a blogs by its filter
app.get('/Blogs/:filter', csrfProtection, async (req, res) => {
  try {
    const filter = req.params.url; 
    const blogPostfilted = await getBlogPosts(filter); 
    res.status(200).json(blogPostfilted);
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    if (error.message === 'Blog post not found') {
      res.status(404).json({ error: 'Blog post not found' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});


// Route to register a user's wallet
app.post('/WalletRegister', csrfProtection, async (req, res) => {
  try {
    const { walletAddress } = req.body.RegisterRequest;
    if (!walletAddress) {
      return res.status(400).send({ message: 'Wallet address cannot both be undefined.', status: "Bad Request" });
    }

    const userExists = await checkUserExists(walletAddress, email);
    if (!userExists) {
      await RegisterUserWallet(walletAddress); 
      res.status(201).send({ message: 'Successfully Registered!', status: "Ok" });
    } else {
      res.status(409).send({ message: 'User already exists!', status: "Conflict" }); 
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send({ message: 'Registration failed!', status: "Error" }); 
  }
});

// Route for user login using a wallet address
app.post('/LoginWallet', csrfProtection, async (req, res) => {
  try {
    const { walletAddress } = req.body;
    if (!walletAddress) {
      return res.status(400).send({ message: 'Wallet address is required.', status: "Bad Request" });
    }

    const userExists = await checkUserExists(walletAddress);
    if (userExists) {
      const token = await LoginUserWallet(walletAddress);
      res.status(200).send({ message: 'Login successful!', token: token, status: "Ok" });
    } else {
      res.status(404).send({ message: 'User does not exist!', status: "Not Found" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ message: 'Login failed!', status: "Error" });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server Listening on Port: ${port}`);
});
