# 项目协作规则

## 协作规范入口

开始任何任务前，先阅读根目录的 `人机协同工作规范.md`。随后阅读本文件，并按任务需要查看 `项目知识/索引.md`、`项目知识/当前状态.md` 和 `项目知识/任务恢复卡.md`；只有在任务信号涉及需求、决策、故障、架构、接口或执行配置时，才按索引继续读取对应文件。

规则优先级为：系统与安全约束、当前用户明确要求、项目局部规则、本项目协同规范、智能体推断。修改范围应保持最小；不得覆盖用户未提交修改，也不得把推断、凭据或占位信息当作已确认事实。

修改协同规范或 `项目知识/` 后，运行：

```powershell
node scripts/verify-collab-spec.mjs
```

每项交付都应说明修改范围、关键假设、实际验证结果和残余风险。

## GitHub 提交与代理排障

当需要从此项目向 GitHub 推送提交时，先检查远程地址、当前分支和工作区状态：

```powershell
git remote -v
git status --short --branch
```

若 GitHub HTTPS 连接超时或报错，不要假定浏览器正在使用的代理端口，也不要随意修改系统代理或全局 Git 配置。应按以下顺序排查：

1. 检查 Windows WinHTTP、Internet Settings、环境变量和 Git 代理配置；
2. 用 `netstat -ano -p tcp` 或等效命令确认代理程序实际监听的本地地址和端口；
3. 确认该端口可连接，并通过它测试 GitHub；
4. 先使用 `git ls-remote --heads origin` 验证远程访问和认证；
5. 仅在验证成功后执行 `git push -u origin <branch>`。

本项目已确认的环境经验：Clash Verge 的 `verge-mihomo` 监听在 `127.0.0.1:7897`；`127.0.0.1:7890` 未监听。浏览器能访问 GitHub 并不代表 Git 命令行已继承相同的代理路径。

如果 `7897` 仍在监听，使用仓库级配置，不影响其他项目：

```powershell
git config --local http.proxy http://127.0.0.1:7897
git config --local https.proxy http://127.0.0.1:7897
git ls-remote --heads origin
git push -u origin main
```

代理端口可能随 Clash Verge 配置变化。每次连接失败时都必须重新验证监听端口，不得将 `7897` 当作永久不变的事实。

不要将代理用户名、密码、访问令牌或其他凭据写入版本库、`AGENTS.md`、提交信息或终端输出。若代理不再需要，可仅移除本仓库的配置：

```powershell
git config --local --unset http.proxy
git config --local --unset https.proxy
```

推送完成后，使用以下命令确认本地分支已跟踪远程分支，且工作区没有未提交修改：

```powershell
git status --short --branch
git log -1 --oneline
```
