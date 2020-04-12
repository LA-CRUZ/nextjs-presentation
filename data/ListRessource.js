import GeoRessources from './GeoRessources.ts'

class ListResources {
    constructor(list={}) {
        this.list = list;
    }
    
    push(resources) {
        this.list[resources.id]=resources;
    }

    get(id) {
        return this.list[id];
    }
}

var list = new ListResources()

list.push(new GeoRessources("Mickael"))
list.push(new GeoRessources("Lucas"))
list.push(new GeoRessources("Etienne"))
list.push(new GeoRessources("Pierre"))

list.get("Lucas").addTrophy("React and Vue")
list.get("Mickael").addTrophy("SCSS Master")
list.get("Etienne").addTrophy("Git commit Sepuku")
list.get("Pierre").addTrophy("Wanabe web developer")

module.exports = list;