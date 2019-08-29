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

export const RGB = (t, bottom, top) => {
  const shade = (t - bottom < 0 ? 0 : t - bottom) / (top - bottom) * 255 * 3
  let R = 0
  let G = 0
  let B = 0
  if (shade <= 255)
    B = shade
  if (255 < shade && shade <= 255 * 2)
    G = shade % 255   
  if (shade > 255 * 3)
    R = shade % 255

  return `rgb(${R}, ${G}, ${B})`
}

export const RedAndBlue = (t, bottom, top) => {
  const shade = (t - bottom < 0 ? 0 : t - bottom) / (top - bottom) * 255
  const R = shade
  const B = 255 - shade
  const G = 0

  return `rgb(${R}, ${G}, ${B})`
}