/**
 *
 * @param {number[][]} graphMatrix
 * @param {number[]} coverMatrix
 * @param {string} id
 * @param {number} width
 * @param {number} height
 * @param {number} margin
 * @param {number} offsetX
 * @param {number} offsetY
 */
function narysujGraf(
  graphMatrix,
  coverMatrix,
  id,
  width = 300,
  height = 300,
  offsetX = 0,
  offsetY = 0,
  margin = 5
) {
  let n = graphMatrix.length;
  let X = new Array(n);
  let Y = new Array(n);
  let pointRadius = 3;
  let svg = document.querySelector(id);
  console.log(svg);
  let xsr = width / 2;
  let ysr = height / 2;
  console.log("ysr i xsr", ysr, xsr);
  // okrąg
  for (var i = 0; i < n; i++) {
    X[i] = Math.floor(xsr * (1 + 0.8 * Math.sin(((2 * Math.PI) / n) * i)));
    Y[i] = Math.floor(ysr * (1 - 0.8 * Math.cos(((2 * Math.PI) / n) * i)));
  }
  // normalizacja
  var max_x = Number.MIN_VALUE;
  var min_x = Number.MAX_VALUE;
  var max_y = Number.MIN_VALUE;
  var min_y = Number.MAX_VALUE;

  for (var i = 0; i < n; i++) {
    if (X[i] > max_x) max_x = X[i];
    if (X[i] < min_x) min_x = X[i];
    if (Y[i] > max_y) max_y = Y[i];
    if (Y[i] < min_y) min_y = Y[i];
  }
  //Dx
  for (var i = 0; i < n; i++) {
    X[i] = Math.floor(
      offsetX +
        margin +
        ((X[i] - min_x) * (width - margin)) / (max_x - min_x + margin)
    );
    Y[i] = Math.floor(
      offsetY +
        margin +
        ((Y[i] - min_y) * (height - margin)) / (max_y - min_y + margin)
    );
  }
  console.log("X", X);
  let template = "<g>";
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (graphMatrix[i][j] == 1) {
        if (coverMatrix.includes(i) || coverMatrix.includes(j))
          template += `<path d="M ${X[i]} ${Y[i]} L ${X[j]} ${Y[j]}" stroke="blue" fill="none" />`;
        else
          template += `<path  d="M ${X[i]} ${Y[i]} L ${X[j]} ${Y[j]}" stroke="red"   fill="none"/>`;
      }
    }
  }
  for (let i = 0; i < X.length; i++) {
    if (coverMatrix.includes(i))
      template += `<circle cx="${X[i]}" cy="${Y[i]}" r="${
        pointRadius + 1
      }" stroke="red" fill="green"/>`;
    else {
      template += `<circle cx="${X[i]}" cy="${Y[i]}" r="${pointRadius}" stroke="black" fill="black"/>`;
    }
    template += `<text x="${X[i] + 5}" y="${Y[i] + 5}">${i}</text>`;
  }

  template += "</g>";
  svg.innerHTML += template;
}
