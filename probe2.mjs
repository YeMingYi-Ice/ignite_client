import fs from 'fs';
const s = fs.readFileSync('game/latest.js', 'utf8');

// 1) 找形如 X.ids[i] 的访问（允许空白）
console.log('--- (a) .ids[ 宽松匹配 ---');
[...s.matchAll(/\.\s*ids\s*\[/g)].slice(0, 8).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 100), m.index + 120));
});

// 2) highlightSpawnpoints 的原始模式里有个 drawImage(...?arr[i]:1)，
//    在混淆代码里应该长这样：drawImage(<x>[<a>.YYY[i]:1])
console.log('\n--- (b) drawImage(...[...[i]:1]) ---');
[...s.matchAll(/drawImage\([^()]{0,80}\[[A-Za-z0-9_$]+\[i\]/g)].slice(0, 8).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 120), m.index + 160));
});

// 3) 直接搜 :1) 后面接 drawImage 参数形式 ?X[i]:1
console.log('\n--- (c) ?X[i]:1 ---');
[...s.matchAll(/\?[A-Za-z0-9_$]+\[i\]:1\b/g)].slice(0, 10).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 160), m.index + 120));
});

// 4) gIsTeamGame 定义模式（放宽）
console.log('\n--- (d) gIsTeamGame pattern (loose) ---');
[
  /[A-Za-z0-9_$]+<7\|\|9===[A-Za-z0-9_$]+/g,
  /[A-Za-z0-9_$]+<7\|\|9\s*===\s*[A-Za-z0-9_$]+/g,
].forEach((re, k) => {
  const hits = [...s.matchAll(re)];
  console.log(`pattern ${k}: ${hits.length} hits`);
  hits.slice(0, 3).forEach((m, i) => {
    console.log(`  [${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 140), m.index + 140));
  });
});

// 5) bv 上访问过的方法（每个方法的定义体片段）
console.log('\n--- (e) bv.<method>=function 的定义 ---');
for (const name of ['gj','gk','hD','hE','hH','hI','hJ','hK','hO','i5','i8']) {
  const re = new RegExp(`\\bbv\\.${name}\\s*=\\s*function[^}]{0,180}`, 'g');
  const m = re.exec(s);
  if (m) console.log(`bv.${name}:`, m[0].substring(0, 200));
}
