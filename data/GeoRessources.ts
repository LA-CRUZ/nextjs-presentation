class GeoResources {
    id: string
    role: string
    position: Array<number>
    ttl: number
    url: string
    blurred: boolean
    status: string
    trophies: Array<object>

    constructor (
        id: string,
        role: string ="sane",
        position: Array<number> =[0,0],
        ttl: number =-1,
        url: string ="",
        blurred: boolean =true,
        status: string ="alive",
        trophies: Array<object>=[]
    ) {
        this.id = id;
        this.role = role;
        this.position = position;
        this.ttl = ttl;
        this.url = url;
        this.blurred = blurred;
        this.status = status;
        this.trophies = trophies;
    }

    addTrophy(trophyName) {
        this.trophies.push(trophyName)
    }
}

module.exports = GeoResources;