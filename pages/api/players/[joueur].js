import list from '../../../data/ListRessource'

export default (req, res) => {
    var joueur = list.get(req.query.joueur)

    res.status(200).json({
        joueur
    });
};