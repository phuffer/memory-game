const shuffleInPlace = (a: any[]) => {
  let j, x
  for (let i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

export { shuffleInPlace }
