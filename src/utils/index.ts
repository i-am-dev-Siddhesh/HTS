import rateLimit from 'express-rate-limit';

// max 10 request per two minutes
const perTwoMinutesLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, 
  max: 1, 
  handler: (req, res) => {
    return res
      .status(429)
      .json({ message: 'Too many requests, please try again later.' });
  },
});


export { perTwoMinutesLimiter };
