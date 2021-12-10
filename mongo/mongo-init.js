db.auth('admin','admin')
db = db.getSiblingDB('audit')
db.createUser({
    user: 'audit',
    pwd: 'audit',
    roles: [
        {
            role: 'readWrite',
            db: 'audit',
        },
    ]
});
