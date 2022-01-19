import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let inventory;

export default class ChangeDAO {
    static async injectDB(conn) {
        if(inventory) {
            return
        }
        try {
            inventory = await conn.db(process.env.RESTINVENTORY_NS).collection("inventory");
        } catch (e) {
            console.error(`Unable to establish collection handles in DAO: ${e}`);
        }
    }

    static async addChange(date, name, tags, count, price) {
        try {
            const changeDoc = {
                date: date,
                name: name,
                tags: tags,
                count: count,
                price: price
            }

            return await inventory.insertOne(changeDoc);
        } catch (e) {
            console.error(`Unable to post change: ${e}`);
            return { error: e }
        }
    }

    static async updateChange(_id, date, count, price) {
        try {
            const updateResponse = await inventory.updateOne(
                { _id: ObjectId(_id) },
                { $set: { date: date , count: count, price: price} }
            );

            return updateResponse;
        } catch (e) {
            console.error(`Unable to update inventory item: ${e}`);
            return { error: e }
        }
    }

    static async deleteChange(_id) {
        try {
            const deleteResponse = await inventory.deleteOne({
                _id: ObjectId(_id)
            });

            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete inventory item: ${e}`);
            return { error: e }
        }
    }
}