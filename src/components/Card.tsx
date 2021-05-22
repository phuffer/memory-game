import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ReactCardFlip from 'react-card-flip'
import { Card as CardState } from './MemoryGame'
import { makeStyles } from '@material-ui/core/styles'
import cardBack from './cardBack.svg'

type Props = {
  id: string
  front: string
  isFlipped: boolean
  isMatched: boolean
  onClick: (card: CardState) => void
}

const useStyles = makeStyles({
  paper: {
    width: 100,
    height: 140,
    alignContent: 'center',
    textAlign: 'center',
  },
  img: {
    position: 'relative',
    top: '20%',
  },
  front: {
    position: 'relative',
    top: '20%',
  },
})

const Card = (props: Props) => {
  const { id, front, isFlipped, isMatched, onClick } = props
  const classes = useStyles()

  return (
    <ReactCardFlip
      containerStyle={{ width: '100px' }}
      isFlipped={isFlipped || isMatched}
    >
      <Paper
        className={classes.paper}
        onClick={() => {
          onClick({
            id,
            front,
            isFlipped,
            isMatched,
          })
        }}
      >
        <img className={classes.img} src={cardBack} alt={'back of card'} />
      </Paper>
      <Paper
        className={classes.paper}
        onClick={() => {
          onClick({
            id,
            front,
            isFlipped,
            isMatched,
          })
        }}
      >
        <Typography variant='h2' className={classes.front}>
          {front}
        </Typography>
      </Paper>
    </ReactCardFlip>
  )
}

export default Card
