-- Si database already exist
DROP DATABASE IF EXISTS ovelo;
DROP ROLE IF EXISTS ovelo_u;

CREATE ROLE ovelo_u WITH LOGIN PASSWORD 'ovelo';
CREATE DATABASE ovelo OWNER ovelo_u;

