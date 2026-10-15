import fs from 'fs';
const s = fs.readFileSync('game/latest.js', 'utf8');

// 1) 解压字符串表，找到 "名字" 相关的字符串索引
const raw = s.match(/var S=(\[.+?"\]);/)?.[1];
const arr = JSON.parse(raw);
console.log('--- 关键字符串索引 ---');
['. ','分','名字','号','％','%'].forEach(k => {
  const hits = arr.map((v, i) => [i, v]).filter(([, v]) => v === k || v.includes(k));
  if (hits.length) console.log(`"${k}" ->`, hits.slice(0, 5));
});

// 2) 找访问 playerNames 的地方
console.log('\n--- .h? (playerNames 混淆名) 的访问 ---');
// 从 patches.js 里已知 playerData.playerNames 是 dict.rawPlayerNames 处理后的
// 直接找出现次数多、每次后面跟 measureText 或 fillText 的字段
const counts = {};
for (const m of s.matchAll(/\.([a-zA-Z0-9_$]+)\[[a-zA-Z0-9_$]+\]/g)) {
  counts[m[1]] = (counts[m[1]] || 0) + 1;
}
const top = Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0, 20);
console.log('高频 [i] 访问字段:', top);

// 3) 找包含 playerNames[i] 附近有 fillText 的代码
console.log('\n--- fillText(...names[i]...) ---');
[...s.matchAll(/fillText\([^)]{0,80}Names\[/g)].slice(0, 8).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 200), m.index + 200));
});

// 4) 找 minX[i] 的使用（玩家领土包围盒）
console.log('\n--- minX[i] 使用 ---');
[...s.matchAll(/\.minX\[/g)].slice(0, 12).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 120), m.index + 200));
});
