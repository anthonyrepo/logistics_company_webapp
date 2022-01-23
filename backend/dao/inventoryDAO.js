import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let inventory;

export default class InventoryDAO {
    // connect to database
    
    static async injectDB(conn) {
        if(inventory) {
            return;
        }
        try {
            inventory = await conn.db(process.env.INVENTORY_NS).collection("inventory");
        } catch(e) {
            console.error(`Unable to establish a collection handle in inventoryDAO: ${e}`,)
        }
    }

    // get a list of the entire inventory
    static async getInventory({
        filters = null,
        page = 0,
        inventoryPerPage = 20,
    } = {}) {
        let query;
        if (filters) {
            // search by name in inventory
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } };
            } else if ("count" in filters) {
                query = { "count": { $eq: filters["count"] } };
            } else if ("price" in filters) {
                query = { "price": { $eq: filters["price"] } };
            } else if ("date" in filters) {
                query = { "date": { $eq: filters["date"] } };
            } else if ("tags" in filters) {
                query = { "tags": filters["tags"] };
            }
            /*
            else if ("zipcode" in filters) {
                query = { "address.zipcode": { $eq: filters["zipcode"] } }
            }
            */
        }

        let cursor;

        try {
            cursor = await inventory
                .find(query);
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { inventoryList: [], totalInventoryCount: 0 };
        }

        const displayCursor = cursor.limit(inventoryPerPage).skip(inventoryPerPage * page);

        try {
            const inventoryList = await displayCursor.toArray();
            const totalNumInventory = await inventory.countDocuments(query);

            return { inventoryList, totalNumInventory };
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents,  ${e}`,
            )
            return { inventoryList: [], totalNumInventory: 0 };
        }
    }

    static async getInventoryById(_id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(_id)
                    }
                }
            ];
            return await inventory.aggregate(pipeline).next()
        } catch(e) {
            console.error(`Something went wrong in getInventoryByID: ${e}`);
            throw e;
        }
    }
}

