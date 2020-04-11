import { useRouter } from 'next/router';
import useSWR  from 'swr'
import fetcher from '../../data/fetcher'
import fetch from 'node-fetch'

function Joueur({ data }) {
    return (
        <div>
            <h1>{data.joueur.id}</h1>
            <ul>
                <li>Role : {data.joueur.role}</li>
                <li>Position : {data.joueur.position}</li>
                <li>Time To Live : {data.joueur.ttl}</li>
                <li>Url : {data.joueur.url}</li>
                <li>Blurred ? : {data.joueur.blurred}</li>
                <li>Status : {data.joueur.status}</li>
                <li>
                    Trophies list : 
                    <ul>
                        {
                            data.joueur.trophies.map((trophy, index) => {
                                return (<li key={index}>{trophy}</li>)
                            })
                        }
                    </ul>
                </li>
            </ul>
        </div>
    )
}

// This gets called on every request
export async function getServerSideProps(context) {
    // Fetch data from external API

    let url = 'http://localhost:3000/api/players/' + context.params.joueur

    const res = await fetch(url)
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
  }

export default Joueur