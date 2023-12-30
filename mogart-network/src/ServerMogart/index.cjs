const express = require('express');
const app = express();
const port = process.env.PORT || 3040;

const bodyParser = require('body-parser');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

// Functions for database operations
const { checkUserExists, getBlogPosts, getBlogPostByURL, RegisterUserWallet, LoginUserWallet } = require('./Database/Database.cjs');

// CSRF protection setup
const csrfProtection = csrf({ cookie: { httpOnly: true } });
app.use(cookieParser());
app.use(express.json());

// CORS settings
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }


  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, CSRF-Token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get('/TokenRequest', csrfProtection, (req, res) => {
  console.log("Token request received");
  res.status(200).json({ csrfToken: req.csrfToken() });
});

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

app.post('/WalletRegister', csrfProtection, async (req, res) => {
  try {
    const { walletAddress, email } = req.body.RegisterRequest;
    if (!walletAddress && !email) {
      return res.status(400).send({ message: 'Wallet address and email cannot both be undefined.', status: "Bad Request" });
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

app.listen(port, () => {
  console.log(`Server Listening on Port: ${port}`);
});
