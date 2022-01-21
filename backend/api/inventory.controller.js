import InventoryDAO from '../dao/inventoryDAO.js';

export default class InventoryController {
    static async apiGetInventory(req, res, next) {
        const inventoryPerPage = req.query.inventoryPerPage ? parseInt(req.query.inventoryPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.price) {
            filters.price = req.query.price;
        } else if (req.query.count) {
            filters.count = req.query.count;
        } else if (req.query.name) {
            filters.name = req.query.name;
        } else if (req.query.date) {
            filters.date = req.query.date;
        } else if (req.query.tags) {
            filters.tags = req.query.tags;
        }

        const { inventoryList, totalNumInventory } = await InventoryDAO.getInventory({ filters, page, inventoryPerPage, });

        let response = {
            inventory: inventoryList,
            page: page,
            filters: filters,
            entries_per_page: inventoryPerPage,
            total_results: totalNumInventory,
        }
        res.json(response);
    }

    static async apiGetInventoryById(req, res, next) {
        try {
            let _id = req.params._id || {};
            let item = await InventoryDAO.getInventoryById(_id);

            if (!item) {
                res.status(404).json({ error: "Not found" });
                return;
            }

            res.json(item)
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}