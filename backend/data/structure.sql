BEGIN;

DROP TABLE IF EXISTS "rent",
"bike",
"point_of_sale",
"kind_of_bike";

DROP TYPE IF EXISTS "bike_status";

CREATE TYPE bike_status AS ENUM ('AVAILABLE', 'RENT', 'REPAIR', 'LOST');

CREATE TABLE "point_of_sale" (
 "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 "label" TEXT NOT NULL UNIQUE
);

CREATE TABLE "kind_of_bike" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL,
    "price" FLOAT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "bike" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "number" TEXT NOT NULL UNIQUE,
    "status" bike_status NOT NULL,
    "kind_of_bike_id" INT NOT NULL REFERENCES "kind_of_bike" ("id") ON DELETE CASCADE,
    "point_of_sale_id" INT NOT NULL REFERENCES "point_of_sale" ("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "rent" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "client_firstname" TEXT,
    "client_lastname" TEXT,
    "start_date" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "back_date_planned" TIMESTAMPTZ NOT NULL,
    "back_date" TIMESTAMPTZ,
    "bike_id" INT NOT NULL REFERENCES "bike" ("id") ON DELETE CASCADE,
    "rent_point_of_sale_id" INT NOT NULL REFERENCES "point_of_sale" ("id") ON DELETE CASCADE,
    "return_point_of_sale_id" INT REFERENCES "point_of_sale" ("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;
