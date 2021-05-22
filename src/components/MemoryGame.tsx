import { Grid } from '@material-ui/core'
import CardComponent from './Card'
import { makeStyles } from '@material-ui/core/styles'

export type Card = {
  /**
   * UUID of this card
   */
  id: string
  /**
   * Value displayed on the front of the card
   */
  front: string
  /**
   * If true, the back of the card is displayed, otherwise the front is displayed
   */
  isFlipped: boolean
  /**
   * Whether or not the card is matched with another card.
   */
  isMatched: boolean
}

type Props = {
  cards: Card[]
  onCardClick: (card: Card) => void
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: 900,
    height: 600,
  },
  gridItem: {
    width: 100,
    height: 140,
  },
})

const MemoryGame = (props: Props) => {
  const { cards, onCardClick } = props
  const classes = useStyles()

  return (
    <>
      <Grid container className={classes.root} spacing={2}>
        {cards.map((card) => {
          return (
            <Grid className={classes.gridItem} key={card.id} item xs={2}>
              {!card.isMatched && (
                <CardComponent
                  id={card.id}
                  front={card.front}
                  isFlipped={card.isFlipped}
                  isMatched={card.isMatched}
                  onClick={onCardClick}
                />
              )}
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default MemoryGame
