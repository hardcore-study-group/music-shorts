import {Router} from 'express';

const router = Router();

router.get('/token/swap/:code', async (req, res) => {
  try {
    console.log(req.params.code);
    res.status(200).json();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/token/refresh');

export default router;
