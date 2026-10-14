import fs from 'fs';
const s = fs.readFileSync('game/latest.js', 'utf8');

// 1) a2c 定义（队伍名称数组）
console.log('--- (1) .a2c= ---');
[...s.matchAll(/\.a2c\s*=/g)].slice(0, 6).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 80), m.index + 400));
});

// 2) 颜色表完整定义（找 [255,0,0] 这种开头）
console.log('\n--- (2) 颜色表 ---');
[...s.matchAll(/\[255,0,0\][^;]{0,300}/g)].slice(0, 4).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 250), m.index + 300));
});

// 3) 找 zS（队伍数？）
console.log('\n--- (3) .zS= ---');
[...s.matchAll(/\.zS\s*=/g)].slice(0, 6).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 80), m.index + 150));
});

// 4) 找 fX 写入时机
console.log('\n--- (4) fX 写入 ---');
[...s.matchAll(/\.fX\[[^\]]+\]\s*=/g)].slice(0, 8).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 100), m.index + 120));
});
