const prisma = require("./prisma");
const router = require("express").Router();
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const puppies = await prisma.puppy.findMany;
    res.json(puppies);
  } catch (error) {
    console.error(e);
    next({
      message: "The server failed to reach the database",
    });
  }

  router.get("/:id", async (req, res, next) => {
    try {
      const id = +req.params.id;
      const puppy = await prisma.puppy.findUnique({
        where: { id },
      });

      if (!puppy) {
        return next({
          status: 404,
          message: `puppy #${id} dose not exsist `,
        });
      }
      res.json(puppy);
    } catch (error) {
      next({
        message: "The server failed to reach the database for a single puppy",
      });
    }
  });
  router.post("/", async (req, res, next) => {
    try {
      const { name, breed } = req.query;
      const puppy = await prisma.puppy.create({
        data: {
          name,
          breed,
        },
      });
      res.json(puppy);
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const id = +req.params.id;

      const puppy = await prisma.puppy.findUnique({ where: { id } });
      if (!puppy) {
        return next({
          status: 404,
          message: `puppy #${id} dose not exsist `,
        });
      }
      await prisma.puppy.delete({ where: { id } });
      res.status(201).send();
    } catch {
      next({});
    }
  });
});
