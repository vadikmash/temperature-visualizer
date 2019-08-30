export const blackAndWhite = (t, bottom, top) => {
  const shade = (t - bottom < 0 ? 0 : t - bottom) / (top - bottom) * 255
  return `rgb(${shade}, ${shade}, ${shade})`
}


export const RGB = (t, bottom, top) => {
  let shade = (t - bottom ) / (top - bottom) * 255 * 3 
  shade = shade > 255 * 3 ? 255 * 3 : shade

  let R = 0
  let G = 0
  let B = 0

  // blue
  if (shade < 128) {
    B = shade * 2
  }
  if (shade < 256 && shade >= 128) {
    B = (256 - shade) * 2
  }
  // green
  if (shade < 256 + 128 - 64 && shade >= 256 - 64) {
    G = (shade - (256 - 64)) * 2
  }
  if (shade < 512 && shade >= 256 + 128 - 64) {
    G = ((512) - shade) * 1.5
  }
  // red
  if (shade < 512 + 256 && shade >= 512 - 128) {
    R = (shade - (512 - 128)) * 0.75
  }
  // white
  if (shade < 512 + 256 && shade >= 512) {
    G = (shade - (512)) 
    B = (shade - (512)) 
  }

  return `rgb(${R}, ${G}, ${B})`
}


export const RedAndBlue = (t, bottom, top) => {
  const shade = (t - bottom < 0 ? 0 : t - bottom) / (top - bottom) * 255
  const R = shade
  const B = 255 - shade
  const G = 0

  return `rgb(${R}, ${G}, ${B})`
}