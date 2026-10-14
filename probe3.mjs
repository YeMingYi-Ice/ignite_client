import fs from 'fs';
const s = fs.readFileSync('game/latest.js', 'utf8');

// 1) 找 bv 的实例化位置
console.log('--- (1) bv 实例化 ---');
[...s.matchAll(/bv\s*=\s*new\s+[A-Za-z0-9_$]+\([^)]{0,40}\)/g)].slice(0, 5).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 120), m.index + 200));
});

// 2) 找 this.fS= 定义（canAttack 的定义）
console.log('\n--- (2) this.fS= ---');
[...s.matchAll(/this\.fS\s*=/g)].slice(0, 6).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 100), m.index + 260));
});

// 3) 找 this.gj= 等定义
console.log('\n--- (3) this.gj= / this.gk= / this.hE= ---');
for (const n of ['gj','gk','hD','hE','hH','hI','hJ','hK','hO','i5','i8']) {
  const re = new RegExp(`this\\.${n}\\s*=`, 'g');
  const m = re.exec(s);
  if (m) console.log(`this.${n}:`, s.substring(Math.max(0, m.index - 60), m.index + 200));
}

// 4) bv.fS( 的调用上下文（看到 canAttack 在做什么）
console.log('\n--- (4) bv.fS( 调用 ---');
[...s.matchAll(/bv\.fS\(/g)].slice(0, 8).forEach((m, i) => {
  console.log(`[${i}] @${m.index}:`, s.substring(Math.max(0, m.index - 130), m.index + 130));
});

// 5) 解压字符串数组找名字
const rawMatch = s.match(/var S=(\[.+?"\]);/);
if (rawMatch) {
  const arr = JSON.parse(rawMatch[1]);
  console.log('\n--- (5) 字符串数组长度:', arr.length);
  ['TeamManager','TeamUtils','team','teamId','ids','player','red','blue','Red','Blue'].forEach(name => {
    const hits = arr.map((v, i) => [i, v]).filter(([, v]) => typeof v === 'string' && v.includes(name));
    if (hits.length) console.log(`"${name}" 命中:`, hits.slice(0, 4));
  });
}
