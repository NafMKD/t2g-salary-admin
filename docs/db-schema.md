# Database Schema - Salary Management System 

## Tables

### 1. users:

```
- id bigint (pk)
- name varchar(100) not null
- email varchar(100) unique not null -- login
- password varchar(255) not null -- login
- is_admin tinyint(1) not null default 0
- remember_token varchar(100) null
- created_at datetime
- updated_at datetime
- deleted_at datetime -- soft delete
```

### 2. users_salaries:

```
- id bigint (pk)
- name varchar(100) not null
- email varchar(100) unique not null
- salary_local decimal(10,2) not null default 0
- salary_euros decimal(10,2) null
- commission decimal(10,2) not null default 500.00
- created_at datetime
- updated_at datetime
- deleted_at datetime -- soft delete
```
