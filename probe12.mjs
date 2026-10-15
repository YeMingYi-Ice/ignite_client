import fs from 'fs';
const s = fs.readFileSync('game/latest.js', 'utf8');

// a0j 是 playerNames
console.log('--- a0j 全部访问 ---');
[...s.matchAll(/a0j/g)].slice(0, 30).forEach((m, i) => {
  const c = s.substring(Math.max(0, m.index - 60), m.index + 80);
  // 只打印有价值的（排除字符串数组里）
  if (!c.includes('"]') && !c.includes('"+')) {
    console.log(`[${i}] @${m.index}:`, c);
  }
});

// 玩家领土渲染（可能是 drawImage 贴名字）
console.log('\n--- bj.fX 全部访问 ---');
[...s.matchAll(/bj\.fX\[/g)].forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 100), m.index + 120));
});
