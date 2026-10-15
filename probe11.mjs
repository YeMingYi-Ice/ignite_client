import fs from 'fs';
const s = fs.readFileSync('game/latest.js', 'utf8');

console.log('--- aXE 上下文 ---');
[...s.matchAll(/aXE/g)].slice(0, 25).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 60), m.index + 80));
});

console.log('\n--- .wr() 调用 ---');
[...s.matchAll(/\.wr\(\)/g)].slice(0, 10).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 150), m.index + 150));
});

console.log('\n--- 相机变量 jD / jE / im 的赋值 ---');
['jD','jE','im'].forEach(v => {
  console.log(`\n-- ${v}= --`);
  [...s.matchAll(new RegExp(`(?:var\\s+)?${v}\\s*=`, 'g'))].slice(0, 6).forEach((m, i) => {
    console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 60), m.index + 130));
  });
});
