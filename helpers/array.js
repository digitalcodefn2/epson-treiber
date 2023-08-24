const getAverageOfNumberArray = (array) => {
  const initialValue = 0
  const sumWithInitial = array
    .map((item) => item.attributes.ratingValue)
    .reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    )

  const average = sumWithInitial / array.length

  return Math.round(average * 10) / 10
}

export { getAverageOfNumberArray }
