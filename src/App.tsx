import React from 'react'
import makeStyles from '@material-ui/styles/makeStyles'
import MemoryGameContainer from './components/MemoryGameContainer'

const useStyles = makeStyles({
  centerScreen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
})

function App() {
  const classes = useStyles()

  return (
    <div className={classes.centerScreen}>
      <MemoryGameContainer />
    </div>
  )
}

export default App
