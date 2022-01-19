import ChangeDAO from "../dao/changeDAO.js";

export default class ChangeController {
    static async apiPost (req, res, next) {
        try {
            // const _id = req.body._id;
            const date = new Date().toLocaleString();
            const name = req.body.name;
            const tags = req.body.tags;
            const count = req.body.count;
            const price = req.body.price;

            const Response = await ChangeDAO.addChange(
                // _id,
                date,
                name,
                tags,
                count,
                price
            );

            res.json({ status: "success" });
        } catch(e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiUpdate(req, res, next) {
        try {
            const _id = req.body._id;
            const date = new Date().toLocaleString();
            const count = req.body.count;
            const price = req.body.price;

            const response = await ChangeDAO.updateChange(
                _id,
                date,
                count,
                price
            );

            var { error } = response;
            if (error) {
                res.status(400).json({ error })
            }

            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDelete(req, res, next) {
        try {
            const _id = req.query._id;
            console.log(_id);
            const response = await ChangeDAO.deleteChange(_id);
            res.json({ status: "success" });
        } catch(e) {
            res.status(500).json({ error: e.message });
        }
    }
}