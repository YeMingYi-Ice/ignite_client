import fs from 'fs';
const s = fs.readFileSync('game/latest.js', 'utf8');

// 定位 @645391 附近的完整函数
const pos = 645391;
console.log('=== 完整上下文 (前 1500, 后 1200) ===');
console.log(s.substring(Math.max(0, pos - 1500), pos + 1200));

// 找这个循环所在函数的开头
const before = s.substring(Math.max(0, pos - 3000), pos);
const fnames = [...before.matchAll(/function\s+([A-Za-z0-9_$]+)\s*\(/g)];
console.log('\n=== 附近可能的外层函数 ===');
console.log(fnames.slice(-5).map(m => m[1]));

// 找 adJ 的构造
console.log('\n=== adJ 构造 ===');
[...s.matchAll(/adJ\s*=/g)].slice(0, 6).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 50), m.index + 200));
});
