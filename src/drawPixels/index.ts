const StackBlur = require('stackblur-canvas')


export const drawPixels = (canvas, ctx, data, offsets, visializer, bottom, top, blur) => {
  let j = 0
  String(data).split('~').forEach((row, j) => {
    let i = 0
    JSON.parse(row).forEach((t, i) => {
      ctx.fillStyle = visializer(t + offsets[j][i], bottom, top)
      ctx.beginPath();
      ctx.rect(i * 48, j * 48, 48, 48)
      ctx.fill()
    })
  })
  StackBlur.canvasRGB(canvas, 0, 0, 768, 192, blur);
}