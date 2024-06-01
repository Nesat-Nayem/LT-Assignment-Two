import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
  res.send("route test on from order");
});

export const orderRoutes = router;