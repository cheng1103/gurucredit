# 安全漏洞审计报告

## 执行日期
2024年（当前日期）

## 审计范围
- 前端应用 (Next.js)
- 后端API (NestJS)
- 数据库架构 (Prisma)
- 认证和授权机制
- 输入验证和清理
- 敏感数据处理

---

## 🔴 已修复的严重问题

### 1. 服务器/客户端组件边界问题
**严重性**: 🔴 高
**状态**: ✅ 已修复

**问题描述**:
- `parseStatValue()` 函数在服务器组件 `page.tsx` 中被调用
- 由于该函数被客户端组件 `AnimatedCounter` 导入，Next.js 将其视为客户端函数
- 导致运行时错误：无法从服务器调用客户端函数

**修复方案**:
- 将 `parseStatValue` 的逻辑内联到服务器组件中，在服务器端解析值
- 将解析后的数据传递给客户端组件 `AnimatedCounter`

**文件**: `frontend/src/app/page.tsx`

---

### 2. 密码强度不足
**严重性**: 🟠 中-高
**状态**: ✅ 已修复

**问题描述**:
- `RegisterDto` 中密码最小长度只有6个字符
- 缺少密码复杂度要求（大小写字母、数字）
- 密码太弱，容易被暴力破解

**修复方案**:
- 将密码最小长度从6个字符增加到12个字符
- 添加密码复杂度验证：
  - 至少包含一个小写字母
  - 至少包含一个大写字母
  - 至少包含一个数字

**文件**: `backend/src/auth/dto/auth.dto.ts`

**修复前**:
```typescript
@MinLength(6)
password: string;
```

**修复后**:
```typescript
@MinLength(12, { message: 'Password must be at least 12 characters long' })
@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
  message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
})
password: string;
```

---

### 3. 查询参数缺少验证
**严重性**: 🟠 中
**状态**: ✅ 已修复

**问题描述**:
- `leads.service.ts` 和 `contact.service.ts` 中的 `findAll` 方法直接使用查询参数
- 没有验证 `status` 和 `source` 参数是否在允许的值列表中
- 虽然使用 Prisma（防止SQL注入），但仍应验证参数值以防止数据泄露

**修复方案**:
- 添加状态值枚举常量（`LEAD_STATUSES`, `CONTACT_STATUSES`）
- 在 DTO 中添加 `@IsIn` 验证器
- 在服务层添加白名单验证，只允许有效的状态值

**文件**:
- `backend/src/leads/leads.dto.ts`
- `backend/src/leads/leads.service.ts`
- `backend/src/contact/contact.dto.ts`
- `backend/src/contact/contact.service.ts`

---

## 🟡 已识别的潜在问题（建议改进）

### 4. JWT Token 过期时间过长
**严重性**: 🟡 中

**问题描述**:
- JWT token 默认过期时间为7天（`JWT_EXPIRES_IN: '7d'`）
- 过期时间过长，如果token被泄露，攻击者有7天的时间使用它

**建议**:
- 将 access token 过期时间缩短到1-2小时
- 实现 refresh token 机制，用于获取新的 access token
- Refresh token 可以有更长的过期时间（如30天）

**位置**: `backend/src/config/env.validation.ts` (第13行)

---

### 5. 日志中可能记录敏感信息
**严重性**: 🟡 低-中

**当前状态**:
- ✅ 日志记录器已避免记录密码
- ✅ 日志只记录用户ID和邮箱
- ⚠️ URL可能包含敏感信息（如token），需要检查

**建议**:
- 在记录URL之前，过滤掉查询参数中的敏感信息（如token、password等）
- 确保错误日志不包含完整的请求体（可能包含密码）

**位置**: `backend/src/common/interceptors/logging.interceptor.ts`

---

### 6. 密码策略不一致
**严重性**: 🟡 低

**问题描述**:
- `RegisterDto` 和 `CreateUserDto` 中的密码要求不一致
- `RegisterDto`: 原来6个字符，现在已修复为12个字符
- `CreateUserDto`: 8个字符

**建议**:
- 统一密码策略，使用相同的验证规则
- 考虑创建一个共享的密码验证装饰器或类验证器

**位置**: 
- `backend/src/auth/dto/auth.dto.ts`
- `backend/src/users/dto/create-user.dto.ts`

---

## ✅ 已实施的良好安全实践

### 1. SQL注入防护
- ✅ 使用 Prisma ORM，所有查询都经过参数化
- ✅ 没有发现使用原始SQL查询（`$queryRaw` 或 `$executeRaw`）
- ✅ 查询参数通过 Prisma 的 where 条件传递，自动转义

### 2. 输入验证和清理
- ✅ 使用 `class-validator` 进行输入验证
- ✅ 实现了 `Sanitize` 装饰器，清理HTML标签和危险字符
- ✅ 前端使用 Zod 进行表单验证和清理

### 3. 敏感数据加密
- ✅ PII数据（IC号码）使用 AES-256-GCM 加密
- ✅ 使用哈希验证防止数据篡改
- ✅ 密码使用 bcrypt 哈希存储（10轮）

### 4. 认证和授权
- ✅ 实现了 JWT 认证
- ✅ 实现了基于角色的访问控制（RBAC）
- ✅ 登录失败次数限制（5次后锁定15分钟）
- ✅ 账户锁定机制

### 5. 速率限制
- ✅ 全局速率限制（60请求/分钟）
- ✅ 特定端点的额外限制：
  - `/auth/login`: 5次/分钟
  - `/contact`: 3次/分钟
  - `/leads`: 8次/分钟

### 6. CORS配置
- ✅ 生产环境禁止使用 `*`
- ✅ 需要明确列出允许的源
- ✅ 开发环境有适当的回退机制

### 7. 安全头部
- ✅ 设置了严格的安全头部：
  - `Strict-Transport-Security`
  - `X-Content-Type-Options`
  - `X-Frame-Options`
  - `Content-Security-Policy`

### 8. 环境变量验证
- ✅ 使用 Joi 验证环境变量
- ✅ `PII_ENCRYPTION_KEY` 必须是base64编码的32字节密钥
- ✅ `JWT_SECRET` 最小长度为16个字符

---

## 📋 建议的后续行动

### 高优先级
1. ✅ 修复服务器/客户端组件边界问题
2. ✅ 增强密码强度要求
3. ✅ 添加查询参数验证

### 中优先级
4. ⚠️ 实施 refresh token 机制，缩短 access token 过期时间
5. ⚠️ 统一密码策略（`CreateUserDto` 也应该要求12个字符）
6. ⚠️ 审查日志记录，确保不记录敏感信息

### 低优先级
7. ⚠️ 考虑实施密码历史记录（防止重复使用最近N个密码）
8. ⚠️ 考虑添加密码过期策略（如90天）
9. ⚠️ 考虑添加双因素认证（2FA）选项

---

## 🔍 未发现的安全问题

经过检查，以下方面未发现安全问题：

- ✅ **文件上传**: 代码库中未实现文件上传功能，因此没有相关的安全问题
- ✅ **命令注入**: 没有发现执行系统命令的代码
- ✅ **XXE攻击**: 没有发现XML解析代码
- ✅ **反序列化**: 没有发现不安全的反序列化操作
- ✅ **SSRF**: 没有发现服务器端请求伪造的漏洞
- ✅ **CSRF**: Next.js 和 NestJS 都有内置的CSRF防护机制

---

## 总结

本次安全审计发现了3个需要修复的问题，均已修复。代码库整体安全实践良好，使用了现代的安全最佳实践（ORM、输入验证、加密、速率限制等）。建议的改进主要集中在：

1. Token 管理策略（refresh token）
2. 密码策略一致性
3. 日志安全

所有已修复的问题都应该在部署前进行测试，确保功能正常。

