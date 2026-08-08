import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const required = [
  'AGENTS.md',
  'README.md',
  '人机协同工作规范.md',
  '项目知识/README.md',
  '项目知识/索引.md',
  '项目知识/维护规则.md',
  '项目知识/执行配置.md',
  '项目知识/当前状态.md',
  '项目知识/任务恢复卡.md',
  '项目知识/需求与验收.md',
  '项目知识/系统架构.md',
  '项目知识/系统接口.md',
  '项目知识/问题与经验.md',
  '项目知识/决策记录.md',
];

const failures = [];
for (const relative of required) {
  if (!fs.existsSync(path.join(root, relative))) failures.push(`Missing file: ${relative}`);
}

if (!failures.length) {
  const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
  const agents = read('AGENTS.md');
  const main = read('人机协同工作规范.md');
  const index = read('项目知识/索引.md');
  const maintenance = read('项目知识/维护规则.md');
  const execution = read('项目知识/执行配置.md');

  const checks = [
    ['AGENTS entrypoint', agents, /人机协同工作规范\.md/],
    ['Index routing', index, /任务路由/],
    ['Maintenance triggers', maintenance, /触发矩阵/],
    ['Retrieval budget', maintenance, /首轮最多再读取 2 个/],
    ['Cost levels', main, /C0 工具优先.*C1 轻量模型.*C2 标准模型.*C3 高能力模型/s],
    ['User decisions', main, /需要用户决策的运行配置/],
    ['Execution config', execution, /模型映射/],
    ['Conservative defaults', execution, /当前默认：0/],
    ['Directory naming', main, /目录与文件命名/],
  ];

  for (const [name, text, pattern] of checks) {
    if (!pattern.test(text)) failures.push(`Failed check: ${name}`);
  }
}

if (failures.length) {
  for (const failure of failures) console.error(failure);
  process.exit(1);
}

console.log(`PASS: collaboration specification is structurally complete (${required.length} required files).`);
