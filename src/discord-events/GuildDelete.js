const DataBase = require("../DataBase");

const dataBase = new DataBase();

class GuildDelete {
    main({ client, guild }) {
        // Remove os dados desse servidor
        dataBase.deleteData(guild);
    }
}

module.exports = new GuildDelete();