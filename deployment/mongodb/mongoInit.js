db.createUser(
    {
        user: "fan",
        pwd: "lupa_password",
        roles: [
            {
                role: "readWrite",
                db: "db_arfan_betest"
            },
            {
                role: "dbAdmin",
                db: "db_arfan_betest"
            }
        ]
    }
);

db.users.drop();
db.users.insertMany([
    {
        userName: "userName",
        accountNumber: "1670112720001",
        emailAddress: "email@example.com",
        identityNumber: "1670112720000",
    }
]);