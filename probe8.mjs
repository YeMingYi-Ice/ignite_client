import fs from 'fs';
const s = fs.readFileSync('game/latest.js', 'utf8');

// 1) ah.a0j[i] —— 玩家名的访问（对局中绘制名字的地方）
console.log('--- ah.a0j[ ---');
[...s.matchAll(/ah\.a0j\[/g)].slice(0, 10).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 200), m.index + 250));
});

// 2) ah.hN[i] —— 玩家领土的访问
console.log('\n--- ah.hN[ ---');
[...s.matchAll(/ah\.hN\[/g)].slice(0, 12).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 150), m.index + 200));
});

// 3) 找包围盒字段 —— minX 等（它们在某个类上，不是 ah 上）
console.log('\n--- 玩家包围盒（猜测 minX/maxX 的混淆名）---');
// playerData.minX 在 patches.js 里是 d.minX[i]，但 d 是循环变量
// 直接找形如 X.minX[i] 不行，因为 minX 被混淆了。
// 换个思路：找 gMaxPlayers 附近有边界数组的构造
[...s.matchAll(/new\s+[A-Za-z0-9_$]+\(fW\)/g)].slice(0, 15).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 100), m.index + 150));
});

// 4) bj.fX 的使用（队伍数组）
console.log('\n--- bj.fX[ ---');
[...s.matchAll(/bj\.fX\[/g)].slice(0, 10).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 150), m.index + 200));
});
