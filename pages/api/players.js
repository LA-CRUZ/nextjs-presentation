import list from '../../data/ListRessource'

export default (req, res) => {
    res.status(200).json({
        list
    });
};