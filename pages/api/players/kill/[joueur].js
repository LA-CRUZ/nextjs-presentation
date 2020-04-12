import list from '../../../../data/ListRessource'

export default (req, res) => {
    list.get(req.query.joueur).status = "Dead"

    res.status(200).json({
        message: req.query.joueur + "has been killed"
    })
};