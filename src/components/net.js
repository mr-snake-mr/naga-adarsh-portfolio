// Tiny 2-layer neural net (input 2 -> hidden sigmoid -> 1 sigmoid).
// Pure JS, no DOM — kept separate so it can be unit-tested headlessly.
// Binary classification with BCE loss, full-batch gradient descent,
// optional per-step dropout on the hidden layer.

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Two concentric clouds -> requires a circular (non-linear) decision.
export function makeData(nPerClass, seed = 7) {
  const rnd = mulberry32(seed);
  const pts = [];
  for (let i = 0; i < nPerClass; i++) {
    const a = rnd() * Math.PI * 2;
    const rIn = 0.16 + rnd() * 0.22; // inner cloud
    const rOut = 0.62 + rnd() * 0.22; // outer ring
    pts.push({ x: Math.cos(a) * rIn, y: Math.sin(a) * rIn, yb: 1 });
    pts.push({ x: Math.cos(a) * rOut, y: Math.sin(a) * rOut, yb: 0 });
  }
  return pts; // each: {x, y, yb}
}

function addLabelNoise(pts, p, seed) {
  const rnd = mulberry32(seed);
  return pts.map((d) => (rnd() < p ? { ...d, yb: 1 - d.yb } : d));
}

// Deterministic demo dataset (same for every visitor) so the
// underfit / overfit / dropout story reproduces exactly.
let cached = null;
export function demoData() {
  if (cached) return cached;
  const train = addLabelNoise(makeData(28, 1), 0.1, 77);
  const val = makeData(45, 5);
  cached = { train, val };
  return cached;
}

function sigmoid(z) {
  return 1 / (1 + Math.exp(-Math.max(-30, Math.min(30, z))));
}

export class Net {
  constructor(hidden, seed = 11) {
    this.hidden = hidden;
    this.rng = mulberry32(seed * 7919 + 13);
    const rnd = mulberry32(seed);
    const std = Math.sqrt(2 / 3);
    // W1: [hidden][2+1] (bias), W2: [1][hidden+1]
    this.W1 = Array.from({ length: hidden }, () => [
      (rnd() * 2 - 1) * std,
      (rnd() * 2 - 1) * std,
      (rnd() * 2 - 1) * std,
    ]);
    this.W2 = Array.from({ length: hidden + 1 }, () => (rnd() * 2 - 1) * std);
  }

  // forward returns activations too, honoring an optional mask over hidden
  _forward(x, y, mask) {
    const h = new Array(this.hidden);
    for (let i = 0; i < this.hidden; i++) {
      const on = !mask || mask[i] !== false;
      h[i] = on ? sigmoid(this.W1[i][0] * x + this.W1[i][1] * y + this.W1[i][2]) : 0;
    }
    if (mask) for (let i = 0; i < this.hidden; i++) if (mask[i] === false) h[i] = 0;
    return this._out(h);
  }

  _out(h) {
    let s = this.W2[this.hidden];
    for (let i = 0; i < this.hidden; i++) s += this.W2[i] * h[i];
    return { p: sigmoid(s), h };
  }

  predict(x, y, off = null) {
    return this._forward(x, y, off).p;
  }

  accuracy(data, off = null) {
    if (!data.length) return 0;
    let ok = 0;
    for (const d of data) {
      const p = this.predict(d.x, d.y, off);
      if ((p > 0.5 ? 1 : 0) === d.yb) ok++;
    }
    return ok / data.length;
  }

  // Full-batch gradient descent. dropout: 0 = none, else probability a
  // hidden unit is dropped during the update. `off` = permanently disabled
  // hidden units (manual drop / pruning): skipped in training and inference.
  train(data, steps, dropout = 0, off = null) {
    const n = data.length;
    if (!n) return;
    const lr = 3.0;
    for (let s = 0; s < steps; s++) {
      const g1 = this.W1.map(() => [0, 0, 0]);
      const g2 = new Array(this.hidden + 1).fill(0);
      const rndDrop = new Array(this.hidden);
      if (dropout > 0) {
        for (let i = 0; i < this.hidden; i++) rndDrop[i] = this.rng() < dropout;
      }
      const inactive = (i) => (off && off[i] === false) || (dropout > 0 && rndDrop[i]);
      for (const d of data) {
        const mask = new Array(this.hidden);
        for (let i = 0; i < this.hidden; i++) mask[i] = !inactive(i);
        const { p, h } = this._forward(d.x, d.y, mask);
        const e = p - d.yb; // dL/dz_out for BCE + sigmoid
        for (let i = 0; i < this.hidden; i++) {
          g2[i] += e * h[i];
        }
        g2[this.hidden] += e;
        for (let i = 0; i < this.hidden; i++) {
          if (inactive(i)) continue;
          const dz = e * this.W2[i] * h[i] * (1 - h[i]);
          g1[i][0] += dz * d.x;
          g1[i][1] += dz * d.y;
          g1[i][2] += dz;
        }
      }
      const scale = lr / n;
      for (let i = 0; i < this.hidden; i++) {
        this.W1[i][0] -= g1[i][0] * scale;
        this.W1[i][1] -= g1[i][1] * scale;
        this.W1[i][2] -= g1[i][2] * scale;
      }
      for (let i = 0; i <= this.hidden; i++) this.W2[i] -= g2[i] * scale;
    }
  }
}
