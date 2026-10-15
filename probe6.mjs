import fs from 'fs';
const s = fs.readFileSync('game/latest.js', 'utf8');

// 找每帧调用频率很高的绘制入口：requestAnimationFrame
console.log('--- rAF ---');
[...s.matchAll(/requestAnimationFrame/g)].slice(0, 5).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 200), m.index + 200));
});

// 找主地图渲染：一般会调用 drawImage(mapCanvas, ...)
console.log('\n--- drawImage(..,0,0) 大画布 ---');
[...s.matchAll(/drawImage\([a-zA-Z0-9_$.]+,0,0\)/g)].slice(0, 10).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 150), m.index + 150));
});

// 找 bk / am / aE 等关键对象里的地图变换字段
console.log('\n--- 地图平移/缩放字段 猜测 ---');
['.zoom','.scale','.offsetX','.offsetY','.camX','.camY','.gE','.ex'].forEach(f => {
  const m = new RegExp('\\b(\\w+)' + f.replace('.', '\\.') + '\\b').exec(s);
  if (m) console.log(`${f} -> ${m[1]}${f}`);
});
