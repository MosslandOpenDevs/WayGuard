# Safe Return Setup

## 1. Apply SQL

Run this file in Supabase SQL Editor:

- [safe_return_supabase.sql](D:/0_Work/Vibe%20Coding/WayGuard/safe_return_supabase.sql)

Required base table:

- `public.profiles`

## 2. Expected behavior

The Safe Return screen now supports two persistence modes.

- `Supabase 저장됨`: profile/session data is stored remotely.
- `로컬 저장 중`: fallback mode using browser local storage.

## 3. Verification queries

```sql
select * from public.safe_return_profiles order by updated_at desc;
select * from public.safe_return_contacts order by created_at desc;
select * from public.safe_return_sessions order by started_at desc;
```

## 4. Manual test flow

1. Log in.
2. Open `안심 귀가`.
3. Save destination and guardian contacts.
4. Start safe return.
5. Check a row in `safe_return_sessions`.
6. End the trip and confirm `status`, `ended_at` update correctly.
