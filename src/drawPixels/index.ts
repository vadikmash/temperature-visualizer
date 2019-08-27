const StackBlur = require('stackblur-canvas')


export const drawPixels = (
  canvas,
  ctx,
  temperatures,
  offsets,
  highlighted,
  visializer,
  bottom,
  top,
  blur
) => {
  temperatures.forEach((row, j) => {
    row.forEach((t, i) => {
      ctx.fillStyle = visializer(t + offsets[j][i], bottom, top)
      ctx.beginPath();
      ctx.rect(i * 48, j * 48, 48, 48)
      ctx.fill()
      // if (highlighted[j][i]) {
      //   ctx.strokeStyle = 'white'
      //   ctx.stroke()
      // }
    })
  })
  StackBlur.canvasRGB(canvas, 0, 0, 768, 192, blur);
}