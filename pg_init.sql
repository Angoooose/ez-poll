CREATE TABLE IF NOT EXISTS users (
    id varchar(9),
    email varchar(30),
    password varchar(30),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS polls (
    id varchar(9),
    owner_id varchar(9),
    choices json,
    ends_at bigint,
    title text,
    description text,
    PRIMARY KEY (id)
);