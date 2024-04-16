const db = require("../../data/dbConfig");

module.exports = {
  add,
  findBy,
};

async function add(user) {
    await db("users").insert(user);
    return findBy({ username: user.username });
}

function findBy(filter) {
 return db("users").select("id", "username").where(filter).first();
}
