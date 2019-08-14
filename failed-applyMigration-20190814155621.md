# Failed applyMigration at 2019-08-14T14:56:21.044Z
## RPC Input One Line
```json
{"id":1,"jsonrpc":"2.0","method":"applyMigration","params":{"projectInfo":"","force":false,"migrationId":"20190814155609-number","steps":[{"stepType":"UpdateField","model":"Review","name":"beerId","type":{"Base":"Int"}}],"sourceConfig":"datasource db {\n  provider = \"sqlite\"\n  url      = \"file:dev.db\"\n  default  = true\n}\n\ngenerator photon {\n  provider = \"photonjs\"\n}\n\ngenerator nexus_prisma {\n  provider = \"nexus-prisma\"\n}\n\nmodel User {\n  id          String  @default(cuid()) @id @unique\n  userName    String  @unique\n  displayName String?\n  password    String\n}\n\nmodel Review {\n  id      String @default(cuid()) @id @unique\n  userId  String\n  beerId  Int\n  comment String\n  rating  Float\n}"}}
```

## RPC Input Readable
```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "applyMigration",
  "params": {
    "projectInfo": "",
    "force": false,
    "migrationId": "20190814155609-number",
    "steps": [
      {
        "stepType": "UpdateField",
        "model": "Review",
        "name": "beerId",
        "type": {
          "Base": "Int"
        }
      }
    ],
    "sourceConfig": "datasource db {\n  provider = \"sqlite\"\n  url      = \"file:dev.db\"\n  default  = true\n}\n\ngenerator photon {\n  provider = \"photonjs\"\n}\n\ngenerator nexus_prisma {\n  provider = \"nexus-prisma\"\n}\n\nmodel User {\n  id          String  @default(cuid()) @id @unique\n  userName    String  @unique\n  displayName String?\n  password    String\n}\n\nmodel Review {\n  id      String @default(cuid()) @id @unique\n  userId  String\n  beerId  Int\n  comment String\n  rating  Float\n}"
  }
}
```


## RPC Response
```
null
```

## Stack Trace
```bash
thread 'main' panicked at 'called `Result::unwrap()` on an `Err` value: QueryError(SqliteFailure(Error { code: DatabaseBusy, extended_code: 5 }, Some("database is locked"))

stack backtrace:
   0: backtrace::backtrace::trace::h33eb18a9548cdf19 (0x10f21e58e)
   1: backtrace::capture::Backtrace::new_unresolved::hbe15ca481078b281 (0x10f21c7b8)
   2: failure::backtrace::internal::InternalBacktrace::new::hf5b4c597dc48a524 (0x10f21c159)
   3: <failure::backtrace::Backtrace as core::default::Default>::default::h41044c97a6cd31c8 (0x10f21c345)
   4: prisma_query::connector::sqlite::error::<impl core::convert::From<rusqlite::error::Error> for prisma_query::error::Error>::from::had9fb5e274b00750 (0x10ed57ab9)
   5: prisma_query::connector::metrics::query::h4c6e0523cb1bffc6 (0x10ed1044f)
   6: prisma_query::connector::metrics::query::h8346c366d8a6b9f6 (0x10ed11ae5)
   7: <prisma_query::connector::sqlite::Sqlite as prisma_query::connector::queryable::Queryable>::execute::he5d8ce808eedccdc (0x10ed190ae)
   8: <sql_migration_connector::migration_database::Sqlite as sql_migration_connector::migration_database::MigrationDatabase>::execute::h702b8599b44fde07 (0x10ec9b740)
   9: <sql_migration_connector::sql_migration_persistence::SqlMigrationPersistence as migration_connector::migration_persistence::MigrationPersistence>::create::hc1ac5bf7f508e6e9 (0x10ec6a0b4)
  10: migration_core::commands::apply_migration::ApplyMigrationCommand::handle_migration::h9c03894ed9829d33 (0x10eb8b6a2)
  11: <migration_core::commands::apply_migration::ApplyMigrationCommand as migration_core::commands::command::MigrationCommand>::execute::hfe8163b142bd6dbd (0x10eb8a968)
  12: <F as jsonrpc_core::calls::RpcMethodSimple>::call::h8fcf08260d2a7d0d (0x10ebd2136)
  13: <F as jsonrpc_core::calls::RpcMethod<T>>::call::hb442d9b9ed54e562 (0x10eb7bc7c)
  14: <futures::future::lazy::Lazy<F,R> as futures::future::Future>::poll::h09a89a2a34fd8553 (0x10eb8eeb2)
  15: <futures::future::then::Then<A,B,F> as futures::future::Future>::poll::h775f0fa9c81ffc79 (0x10eb7c380)
  16: <futures::future::map::Map<A,F> as futures::future::Future>::poll::hcb839739a3f72949 (0x10eb985ef)
  17: <futures::future::either::Either<A,B> as futures::future::Future>::poll::hfa9ef8827bc7c312 (0x10eb8f1c0)
  18: futures::task_impl::std::set::h2cfca3e3b4f1b536 (0x10ebc721f)
  19: std::thread::local::LocalKey<T>::with::hbfb346743079d794 (0x10ebcae26)
  20: futures::future::Future::wait::h1695fef4a3fe94cf (0x10eb982ff)
  21: jsonrpc_core::io::IoHandler<M>::handle_request_sync::h0471536d007e7c8b (0x10eb7669f)
  22: migration_core::rpc_api::RpcApi::handle::hfa4c493526d8b375 (0x10ebd739b)
  23: migration_engine::main::h8411d37c3bce3c55 (0x10eb52b3d)
  24: std::rt::lang_start::{{closure}}::h056679417669cf3d (0x10eb52ba6)
  25: std::panicking::try::do_call::h1252fc9a2ff235eb (0x10f242a98)
  26: __rust_maybe_catch_panic (0x10f246e7f)
  27: std::rt::lang_start_internal::h4c054360e442146c (0x10f24357e)
  28: main (0x10eb52b99))', src/libcore/result.rs:997:5
stack backtrace:
   0: std::sys::unix::backtrace::tracing::imp::unwind_backtrace
   1: std::sys_common::backtrace::_print
   2: std::panicking::default_hook::{{closure}}
   3: std::panicking::default_hook
   4: std::panicking::rust_panic_with_hook
   5: std::panicking::continue_panic_fmt
   6: rust_begin_unwind
   7: core::panicking::panic_fmt
   8: core::result::unwrap_failed
   9: <sql_migration_connector::sql_migration_persistence::SqlMigrationPersistence as migration_connector::migration_persistence::MigrationPersistence>::create
  10: migration_core::commands::apply_migration::ApplyMigrationCommand::handle_migration
  11: <migration_core::commands::apply_migration::ApplyMigrationCommand as migration_core::commands::command::MigrationCommand>::execute
  12: <F as jsonrpc_core::calls::RpcMethodSimple>::call
  13: <F as jsonrpc_core::calls::RpcMethod<T>>::call
  14: <futures::future::lazy::Lazy<F,R> as futures::future::Future>::poll
  15: <futures::future::then::Then<A,B,F> as futures::future::Future>::poll
  16: <futures::future::map::Map<A,F> as futures::future::Future>::poll
  17: <futures::future::either::Either<A,B> as futures::future::Future>::poll
  18: futures::task_impl::std::set
  19: std::thread::local::LocalKey<T>::with
  20: futures::future::Future::wait
  21: jsonrpc_core::io::IoHandler<M>::handle_request_sync
  22: migration_core::rpc_api::RpcApi::handle
  23: migration_engine::main
  24: std::rt::lang_start::{{closure}}
  25: std::panicking::try::do_call
  26: __rust_maybe_catch_panic
  27: std::rt::lang_start_internal
  28: main

```
