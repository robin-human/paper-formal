# LaTeX 论文写作规范项目

本项目维护中文 LaTeX 论文的人机交互写作规范，并提供可恢复的协作规则和项目知识记录。

## 主要文件

- `论文人机交互写作规范.md`：LaTeX 论文项目创建、写作、引用、编译与交付规范。
- `AGENTS.md`：智能体在本项目中的入口规则和 GitHub 代理排障规则。
- `人机协同工作规范.md`：通用协作、验证、知识沉淀与安全底线。
- `项目知识/`：当前状态、需求与验收、决策、经验和任务恢复信息。
- `scripts/verify-collab-spec.mjs`：协作规则结构校验脚本。

## 验证

```powershell
node scripts/verify-collab-spec.mjs
```

## 外部规范来源

本项目于 2026-08-08 参考并落实了 `robin-human/ai-software-development-specification` 的协作与项目知识规范。仅引入适用于文档型项目的规则；不适用的软件 API、部署和发布流程已明确标注。
