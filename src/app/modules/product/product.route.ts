import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
  res.send("route test on from product");
});

export const productRoutes = router;