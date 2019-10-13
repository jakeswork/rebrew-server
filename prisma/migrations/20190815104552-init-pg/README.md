# Migration `20190815104552-init-pg`

This migration has been generated by Jake Flynn at 8/15/2019, 10:45:52 AM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "rebrew"."User"("id" text NOT NULL  ,"user_name" text NOT NULL DEFAULT '' ,"display_name" text   ,"password" text NOT NULL DEFAULT '' ,PRIMARY KEY ("id"));

CREATE TABLE "rebrew"."Review"("id" text NOT NULL  ,"user_id" text NOT NULL DEFAULT '' ,"beer_id" integer NOT NULL DEFAULT 0 ,"comment" text NOT NULL DEFAULT '' ,"rating" Decimal(65,30) NOT NULL DEFAULT 0 ,PRIMARY KEY ("id"));

CREATE UNIQUE INDEX "User.id._UNIQUE" ON "rebrew"."User"("id")

CREATE UNIQUE INDEX "User.user_name._UNIQUE" ON "rebrew"."User"("user_name")

CREATE UNIQUE INDEX "Review.id._UNIQUE" ON "rebrew"."Review"("id")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration ..20190815104552-init-pg
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,28 @@
+datasource pg {
+  provider = "postgresql"
+  url      = env("POSTGRESQL_URL")
+  enabled  = true
+}
+
+generator photon {
+  provider = "photonjs"
+}
+
+generator nexus_prisma {
+  provider = "nexus-prisma"
+}
+
+model User {
+  id           String  @default(cuid()) @id @unique
+  user_name    String  @unique
+  display_name String?
+  password     String
+}
+
+model Review {
+  id      String @default(cuid()) @id @unique
+  user_id String
+  beer_id Int
+  comment String
+  rating  Float
+}
```

## Photon Usage

You can use a specific Photon built for this migration (20190815104552-init-pg)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190815104552-init-pg'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```