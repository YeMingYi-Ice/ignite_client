import fs from 'fs';
const s = fs.readFileSync('game/latest.js', 'utf8');

// 1) bj 的实例化
console.log('--- (1) bj 实例化 ---');
[...s.matchAll(/\bbj\s*=\s*new\s+[A-Za-z0-9_$]+\(\)/g)].slice(0, 5).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 100), m.index + 100));
});

// 2) fX 的所有赋值/定义
console.log('\n--- (2) .fX= ---');
[...s.matchAll(/\.fX\s*=/g)].slice(0, 12).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 80), m.index + 180));
});

// 3) fX 的读取上下文（看看谁在读）
console.log('\n--- (3) .fX[ ---');
[...s.matchAll(/\.fX\[/g)].slice(0, 12).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 70), m.index + 120));
});

// 4) 找队伍颜色/名称表：一串明显是颜色值或 rgb 的数组
console.log('\n--- (4) 颜色相关 ---');
[
  /Colors\.[A-Za-z0-9_$]+/g,
  /\["#[0-9a-fA-F]{6}"(?:,"#[0-9a-fA-F]{6}")+\]/g,
  /\[0xff[0-9a-fA-F]+(?:,0xff[0-9a-fA-F]+)+\]/g,
].forEach((re, k) => {
  const hits = [...s.matchAll(re)].slice(0, 3);
  hits.forEach((m, i) => console.log(`  pat${k}[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 60), m.index + 180)));
});
