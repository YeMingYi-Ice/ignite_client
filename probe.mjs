import fs from 'fs';
const s = fs.readFileSync('game/latest.js', 'utf8');
console.log('len:', s.length);

// TeamUtils 混淆名是 bv（patches.js 里写死的），看它上面访问了哪些属性
const props = {};
for (const m of s.matchAll(/\bbv\.([A-Za-z0-9_$]+)/g))
  props[m[1]] = (props[m[1]] || 0) + 1;
console.log('bv.* props:', props);

// .ids[ 出现的上下文
console.log('\n--- .ids[ contexts ---');
[...s.matchAll(/\.ids\[/g)].slice(0, 6).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 90), m.index + 140));
});

// gIsTeamGame 的定义模式
console.log('\n--- gIsTeamGame pattern ---');
[...s.matchAll(/this\.[A-Za-z0-9_$]+=this\.[A-Za-z0-9_$]+<7\|\|9===this\.[A-Za-z0-9_$]+/g)]
  .slice(0, 3)
  .forEach((m, i) => {
    console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 120), m.index + 220));
  });

// vL[ 的上下文（spawn 图标数组，TeamManager.ids 常跟它一起出现）
console.log('\n--- vL[ contexts ---');
[...s.matchAll(/vL\[/g)].slice(0, 6).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 100), m.index + 140));
});
