import { useEffect, useMemo, useRef, useState } from 'react';
import { Net, demoData } from './net';
import { SectionHeading } from './ui';

const CFG = {
  underfit: { label: 'too small (2)', hidden: 2, seed: 1, drop: 0, target: 10000, blurb: '2 neurons — too weak to learn the pattern. Expect it to stay bad.' },
  balanced: { label: 'balanced (8)', hidden: 8, seed: 3, drop: 0.25, target: 10000, blurb: '8 neurons with light dropout — the well-behaved setup.' },
  overfit: { label: 'too big (12)', hidden: 12, seed: 1, drop: 0, target: 14000, blurb: '12 neurons, no dropout — enough power to memorise the noise.' },
  fix: { label: 'same + dropout', hidden: 12, seed: 1, drop: 0.4, target: 14000, blurb: 'the same big network with dropout switched on — the usual fix.' },
};

const CHUNK = 2000;
const { train, val } = demoData();

function verdictFor(steps, tr, va) {
  if (steps === 0) return { label: 'not trained yet', cls: 'verdict-sand', why: 'press “run the full experiment” and watch the boundary appear.' };
  if (steps < 6000) return { label: 'still learning', cls: 'verdict-sand', why: 'not enough training yet — let it finish (or keep pressing +2,000).' };
  const gap = tr - va;
  if (tr >= 0.9 && gap >= 0.06) return { label: 'overfitting', cls: 'verdict-tang', why: 'training looks great, but it fails on new data — it memorised the noise instead of learning the pattern.' };
  if (tr < 0.9 && va <= 0.88) return { label: 'underfitting', cls: 'verdict-teal', why: 'even the training data isn\'t learned — the network is simply too small for this problem.' };
  if (va >= tr - 0.04 && tr >= 0.85) return { label: 'healthy fit', cls: 'verdict-lime', why: 'training and new-data scores match — it learned the real pattern.' };
  return { label: 'still learning', cls: 'verdict-sand', why: 'not quite there — run the full experiment again.' };
}

export default function CnnLab() {
  const [cfgKey, setCfgKey] = useState('balanced');
  const [showExplain, setShowExplain] = useState(false);
  const cfg = CFG[cfgKey];
  const [manual, setManual] = useState(() => Array(CFG.balanced.hidden).fill(true));
  const [steps, setSteps] = useState(0);
  const [busy, setBusy] = useState(false);
  const [, setTick] = useState(0);
  const netRef = useRef(null);
  const canvasRef = useRef(null);
  if (!netRef.current) netRef.current = new Net(CFG.balanced.hidden, CFG.balanced.seed);

  useEffect(() => {
    netRef.current = new Net(cfg.hidden, cfg.seed);
    setManual(Array(cfg.hidden).fill(true));
    setSteps(0);
    setTick((t) => t + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cfgKey]);

  const mask = useMemo(() => manual.map((on) => on), [manual]);

  const stats = useMemo(() => {
    const n = netRef.current;
    if (!n) return { tr: 0, va: 0 };
    return { tr: n.accuracy(train, manual.map((on) => on)), va: n.accuracy(val, manual.map((on) => on)) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manual, steps, cfgKey]);

  const verdict = verdictFor(steps, stats.tr, stats.va);

  async function runToTarget() {
    if (busy) return;
    const n = netRef.current;
    if (!n) return;
    const drop = cfg.drop;
    const off = manual.map((on) => on);
    const target = cfg.target;
    setBusy(true);
    let cur = steps;
    while (cur < target) {
      const add = Math.min(CHUNK, target - cur);
      n.train(train, add, drop, off);
      cur += add;
      setSteps(cur);
      // yield so the numbers tick up live
      await new Promise((r) => setTimeout(r, 0));
    }
    setBusy(false);
  }

  async function addSteps() {
    if (busy) return;
    const n = netRef.current;
    if (!n) return;
    const off = manual.map((on) => on);
    setBusy(true);
    n.train(train, CHUNK, cfg.drop, off);
    setSteps((s) => s + CHUNK);
    setBusy(false);
  }

  function resetWeights() {
    if (busy) return;
    netRef.current = new Net(cfg.hidden, cfg.seed);
    setManual(Array(cfg.hidden).fill(true));
    setSteps(0);
    setTick((t) => t + 1);
  }

  function toggleNode(i) {
    if (busy) return;
    setManual((prev) => prev.map((on, idx) => (idx === i ? !on : on)));
  }

  // decision map — theme-aware, and re-drawn instantly on theme change
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas && canvas.getContext('2d');
    if (!ctx) return;
    const S = 460;

    function draw() {
      const css = getComputedStyle(document.documentElement);
      const tkn = (name, fallback) => (css.getPropertyValue(name) || '').trim() || fallback;
      const hexA = (hex, a) => {
        const h = hex.replace('#', '');
        const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
        const num = parseInt(n, 16);
        return `rgba(${(num >> 16) & 255},${(num >> 8) & 255},${num & 255},${a})`;
      };
      const bg = tkn('--paper', '#0e1322');
      const line = tkn('--ink', '#e9effb');
      const dot1 = tkn('--lime', '#c6f12e');
      const wrong = tkn('--tang', '#ff6b1a');
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const dot0 = isDark ? '#1d2740' : '#fffbea';
      const zone = hexA(dot1, isDark ? 0.16 : 0.3);
      ctx.clearRect(0, 0, S, S);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, S, S);
      const pad = 12;
      const toPx = (v) => pad + ((v + 1.08) / 2.16) * (S - pad * 2);
      ctx.fillStyle = zone;
      const st = 10;
      for (let px = 0; px < S; px += st) {
        for (let py = 0; py < S; py += st) {
          const x = ((px - pad) / (S - pad * 2)) * 2.16 - 1.08;
          const y = ((py - pad) / (S - pad * 2)) * 2.16 - 1.08;
          const p = netRef.current ? netRef.current.predict(x, y, mask) : 0.5;
          if (p > 0.5) ctx.fillRect(px, py, st, st);
        }
      }
      const n = netRef.current;
      for (const d of train) {
        const x = toPx(d.x);
        const y = toPx(d.y);
        const p = n ? n.predict(d.x, d.y, mask) : 0.5;
        const wrongPred = (p > 0.5 ? 1 : 0) !== d.yb;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = d.yb === 1 ? dot1 : dot0;
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = line;
        ctx.stroke();
        if (wrongPred) {
          ctx.strokeStyle = wrong;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(x - 9, y - 9); ctx.lineTo(x + 9, y + 9);
          ctx.moveTo(x + 9, y - 9); ctx.lineTo(x - 9, y + 9);
          ctx.stroke();
        }
      }
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = line;
      ctx.strokeRect(1, 1, S - 2, S - 2);
    }

    canvas.width = S;
    canvas.height = S;
    draw();

    const obs = new MutationObserver(draw);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, [manual, steps, cfgKey, mask]);

  // network geometry
  const h = cfg.hidden;
  const cols = h <= 6 ? 1 : 2;
  const rows = Math.ceil(h / cols);
  const W = 240;
  const xIn = 34;
  const xHid1 = 108;
  const xHid2 = 156;
  const xOut = 222;
  const yTop = 92;
  const stepY = 36;
  const H = yTop + rows * stepY + 46;
  const yMid = yTop + ((rows - 1) * stepY) / 2;
  const nodes = [];
  for (let i = 0; i < h; i++) {
    const col = i < rows ? 0 : 1;
    const r = i < rows ? i : i - rows;
    nodes.push({ i, col, x: col === 0 ? xHid1 : xHid2, y: yTop + r * stepY, on: manual[i] !== false });
  }

  return (
    <section className="section section-play" id="play" data-component="dropout-lab" aria-labelledby="play-title">
      <div className="container">
        <SectionHeading
          title="train a tiny neural net"
          note="A real mini network, like the one inside the freshness project, learning to tell two classes apart. Each preset is one experiment — pick it and press run."
        />

        <div className="lab lab-nn">
          <div className="nn-presets" role="group" aria-label="experiments">
            {Object.entries(CFG).map(([key, c]) => (
              <button
                key={key}
                type="button"
                className={`fact lab-sample ${cfgKey === key ? 'active' : ''}`}
                onClick={() => setCfgKey(key)}
                disabled={busy}
              >
                {c.label}
              </button>
            ))}
            <span className="cfg-blurb mono">{cfg.blurb}</span>
          </div>

          <div className={`nn-explain ${showExplain ? 'open' : ''}`} data-component="nn-explain">
            <button
              type="button"
              className="nn-explain-t"
              aria-expanded={showExplain}
              onClick={() => setShowExplain((v) => !v)}
            >
              <span>what am i looking at?</span>
              <span aria-hidden="true">{showExplain ? '▾' : '▸'}</span>
            </button>
            <ol>
              <li><b>two kinds of dots</b> — two classes. imagine fresh fruit vs spoiled fruit.</li>
              <li><b>the shaded zone</b> — where the network thinks class 1 lives.</li>
              <li><b>training score</b> — how well it remembers the examples it trained on.</li>
              <li><b>brand-new score</b> — how it does on fruit it has never seen. that one matters.</li>
              <li><b>green circles</b> — its decision cells. drop one and it has to learn with less.</li>
            </ol>
          </div>

          <div className="nn-stage">
            <div className="nn-net">
              <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Network diagram with clickable hidden neurons">
                {nodes.map((nd) => (
                  <g key={nd.i} className="nn-wire" opacity="0.55">
                    <line x1={xIn} y1={yMid - 20} x2={nd.x} y2={nd.y} />
                    <line x1={xIn} y1={yMid + 20} x2={nd.x} y2={nd.y} />
                    <line x1={nd.x} y1={nd.y} x2={xOut} y2={yMid} />
                  </g>
                ))}
                <circle className="nn-node" cx={xIn} cy={yMid - 20} r="13" style={{ fill: 'var(--teal)' }} />
                <circle className="nn-node" cx={xIn} cy={yMid + 20} r="13" style={{ fill: 'var(--teal)' }} />
                <text x={xIn} y={yMid - 20 + 5} textAnchor="middle" fontSize="12" className="nn-lbl">x</text>
                <text x={xIn} y={yMid + 20 + 5} textAnchor="middle" fontSize="12" className="nn-lbl">y</text>
                <circle className="nn-node" cx={xOut} cy={yMid} r="13" style={{ fill: 'var(--tang)' }} />
                <text x={xOut} y={yMid + 5} textAnchor="middle" fontSize="11" className="nn-lbl">0/1</text>
                {nodes.map((nd) => (
                  <g
                    key={nd.i}
                    role="button"
                    tabIndex={0}
                    aria-pressed={nd.on}
                    aria-label={`neuron ${nd.i + 1} — click to ${nd.on ? 'drop it out' : 'bring it back'}`}
                    onClick={() => toggleNode(nd.i)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleNode(nd.i); } }}
                    style={{ cursor: busy ? 'default' : 'pointer' }}
                  >
                    <circle
                      className="nn-node"
                      cx={nd.x} cy={nd.y} r="13"
                      style={{ fill: nd.on ? 'var(--lime)' : 'var(--sand)' }}
                      strokeDasharray={nd.on ? '0' : '3 2'}
                      opacity={nd.on ? 1 : 0.7}
                    />
                    {!nd.on && <text x={nd.x} y={nd.y + 5} textAnchor="middle" fontSize="13" className="nn-x">×</text>}
                  </g>
                ))}
              </svg>
              <p className="nn-caption">{h} green neurons in the middle — click one to drop it out</p>
            </div>

            <div className="nn-canvas-wrap">
              <canvas ref={canvasRef} className="nn-canvas" aria-label="Decision map of the trained network" />
              <div className="nn-legend mono">
                <span><i className="lg lg-lime" />class 1</span>
                <span><i className="lg lg-hollow" />class 0</span>
                <span><i className="lg lg-x" />got it wrong</span>
                <span><i className="lg lg-zone" />network says class 1</span>
              </div>
            </div>

            <div className="nn-side">
              <div className="nn-metrics">
                <div className="nn-metric">
                  <span className="m-cap">training done</span>
                  <span className="m-val">{steps.toLocaleString()} steps</span>
                </div>
                <div className="nn-metric">
                  <span className="m-cap">training data score</span>
                  <span className="m-val">{steps ? `${Math.round(stats.tr * 100)}%` : '—'}</span>
                </div>
                <div className="nn-metric">
                  <span className="m-cap">brand-new data score</span>
                  <span className="m-val">{steps ? `${Math.round(stats.va * 100)}%` : '—'}</span>
                </div>
              </div>

              <div className="nn-actions">
                <button type="button" className="btn btn-lime" onClick={runToTarget} disabled={busy}>
                  {busy ? 'training…' : 'run the full experiment'}
                </button>
                <button type="button" className="btn btn-paper" onClick={addSteps} disabled={busy}>
                  +2,000
                </button>
                <button type="button" className="btn btn-ghost" onClick={resetWeights} disabled={busy}>
                  reset
                </button>
              </div>

              <div className={`verdict ${verdict.cls}`} role="status">
                <span className="verdict-name">{verdict.label}</span>
                <span className="verdict-why">{verdict.why}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
