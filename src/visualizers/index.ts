export const blackAndWhite = (t, bottom, top) => {
  const shade = (t - bottom < 0 ? 0 : t - bottom) / (top - bottom) * 255
  return `rgb(${shade}, ${shade}, ${shade})`
}

export const red = (t, bottom, top) => {
  const shade = (t - bottom < 0 ? 0 : t - bottom) / (top - bottom) * 255
  return `rgb(${shade}, 0, 0)`
}

export const green = (t, bottom, top) => {
  const shade = (t - bottom < 0 ? 0 : t - bottom) / (top - bottom) * 255
  return `rgb(0, ${shade}, 0)`
}

export const blue = (t, bottom, top) => {
  const shade = (t - bottom < 0 ? 0 : t - bottom) / (top - bottom) * 255
  return `rgb(0, 0, ${shade})`
}