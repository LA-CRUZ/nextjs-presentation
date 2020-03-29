import { useRouter } from 'next/router';
import useSWR  from 'swr'
import fetcher from '../../data/fetcher'

function Joueur() {
    var router = useRouter()
    const { data, error } = useSWR('/api/players/' + router.query.joueur, fetcher)

    return (
        <div>
            <h1>{data?.joueur.id}</h1>
            <ul>
                <li>Role : {data?.joueur.role}</li>
                <li>Position : {data?.joueur.position}</li>
                <li>Time To Live : {data?.joueur.ttl}</li>
                <li>Url : {data?.joueur.url}</li>
                <li>Blurred ? : {data?.joueur.blurred}</li>
                <li>Status : {data?.joueur.status}</li>
                <li>
                    Trophies list : 
                    <ul>
                        {
                            data?.joueur.trophies.map((trophy, index) => {
                                return (<li key={index}>{trophy}</li>)
                            })
                        }
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default Joueur