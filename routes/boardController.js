const router = require('express').Router();

const boards = [
  { name: 'board 1', list: [] },
  { name: 'board 2', list: [] }
];

router.get('/', (req, res, next) => {
  res.send(boards)
})

router.get('/:name', (req, res, next) => {
  const foundedBoard = boards.find((obj) => obj.name == req.params.name.toLowerCase());

  if(foundedBoard) {
    res.send(foundedBoard);
  } else {
    res.status(404).send(`Board with name '${req.params.name}' does not exists`)
  }
})

router.post('/', (req, res, next) => {
  boards.push(req.query);
  res.send(req.query);
})

router.put('/:name', (req, res, next) => {
  const foundedBoard = boards.find((obj) => obj.name == req.params.name.toLowerCase());

  if(foundedBoard) {
    Object.assign(foundedBoard, req.query)
    res.send(foundedBoard)
  } else {
    res.status(404).send(`Board with name '${req.params.name}' does not exists`)
  }
  
})

router.delete('/:name', (req, res, next) => {
  const foundedBoard = boards.find((obj) => obj.name == req.params.name.toLowerCase());

  if(foundedBoard) {
    res.send(boards.splice(foundedBoard, 1))
  } else {
    res.status(404).send(`User with name '${req.params.name}' does not exists`)
  }

})

module.exports = router;