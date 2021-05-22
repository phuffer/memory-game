import React from 'react'
import MemoryGame, { Card } from './MemoryGame'
import { v4 as uuidv4 } from 'uuid'
import { shuffleInPlace } from './utils'

const MIN_SIZE = 4

type Props = {
  /**
   * The amount of cards with which the game will be played.
   * Defaults to 24
   */
  size?: number
  /**
   * The number of cards that need to be matched. The size of the game must be
   * divisible by this value. Defaults to 2
   */
  difficulty?: number
}

const verifySizeAndDifficulty = (size: number, difficulty: number) => {
  if (size < MIN_SIZE) {
    throw new Error(`Game size must be ${MIN_SIZE} or greater.`)
  }

  if (size % difficulty !== 0) {
    throw new Error(`Game size ${size} must be divisible by ${difficulty}.`)
  }
}

const initializeCards = (size: number, difficulty: number): Card[] => {
  const cards: Card[] = []
  for (let i = 0; i < size / difficulty; i++) {
    for (let j = 0; j < difficulty; j++) {
      cards.push({
        id: uuidv4(),
        front: `${i}`,
        isFlipped: false,
        isMatched: false,
      })
    }
  }

  shuffleInPlace(cards)
  return cards
}

const MemoryGameContainer = (props: Props) => {
  const { size = 24, difficulty = 2 } = props
  verifySizeAndDifficulty(size, difficulty)

  const [cards, setCards] = React.useState<Card[]>(
    initializeCards(size, difficulty)
  )

  const flippedCards = cards
    .filter((card) => !card.isMatched)
    .filter((card) => card.isFlipped)
  if (flippedCards.length === difficulty) {
    const allFlippedCardsEqual = flippedCards.every(
      (card) => card.front === flippedCards[0].front
    )
    if (allFlippedCardsEqual) {
      const newCards = [...cards]
      flippedCards.forEach((card) => {
        const cardIndex = cards.indexOf(card)
        newCards[cardIndex] = { ...card, isMatched: true }
      })

      setTimeout(() => {
        setCards(newCards)
      }, 1000)
    } else {
      setTimeout(() => {
        setCards(
          cards.map((card) => {
            return { ...card, isFlipped: false }
          })
        )
      }, 1000)
    }
  }

  const allMatched = cards.every((card) => card.isMatched === true)

  return (
    <>
      <h1>Forget Me Not: Memory Game</h1>
      {allMatched && (
        <p>Winner winner chicken dinner! Refresh to play again!</p>
      )}
      <MemoryGame
        cards={cards}
        onCardClick={(card) => {
          if (flippedCards.length === difficulty) {
            return
          }

          const existingCard = cards.find((existing) => existing.id === card.id)
          if (existingCard) {
            const isFlipped = existingCard.isFlipped
            if (isFlipped) {
              return cards
            }
            const index = cards.indexOf(existingCard)
            cards[index] = { ...existingCard, isFlipped: true }
          }
          setCards(cards.map((c) => c)) // make copy
        }}
      />
    </>
  )
}

export default MemoryGameContainer
