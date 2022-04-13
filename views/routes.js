import express from 'express'

const router = express.Router()

// GOTTA CATCH EM ALL
router.route('/pokemon/:id')
  .get(getPokemon)


export default router