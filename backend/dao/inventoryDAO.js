let inventory;

export default class InventoryDAO {
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
}

