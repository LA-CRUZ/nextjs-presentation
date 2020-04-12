import { useRouter } from 'next/router';
import useSWR  from 'swr'
import fetcher from '../../data/fetcher'
import fetch from 'node-fetch'
import Link from 'next/link'

function Joueur({ data }) {
    return (
        <div className="container-member">
            <div className="card-member">
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
            <Link href="/" as ="/">
                <a>Retour à l'accueil</a>
            </Link>
            
            <style jsx>{`
                .container-member {
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .card-member {
                    width: 50%;
                    margin: 1rem;
                    padding: 2rem 1.5rem;
                    text-align: center;
                    color: #31394dff;
                    border: 3px solid #eaeaea;
                    border-radius: 10px;
                    background-color: white;
                    box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.75);
                }

                h1 {
                    text-transform: uppercase;
                    font-size: 3rem;
                }

                ul {
                    padding-inline-start: 0px;
                }

                li {
                    list-style-type: none;
                    font-size: 1.5rem;
                    margin: 0.2rem;
                }

                a {
                    background-color: white;
                    margin: 1rem;
                    padding: 1rem 2rem;
                    text-decoration : none;
                    color: #31394dff;
                    font-size: 1.5rem;
                    border-radius: 30px;
                    text-transform: uppercase;
                    box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.75);
                    transition: 0.3s;
                }

                a:hover,
                a:focus,
                a:active {
                    transition: 0.3s;
                    transform: scale(1.08); 
                }

            `}</style>
            <style jsx global>{`
                html,
                body {
                    background-color: #31394dff;
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
                    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                    min-height: 100vh;
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
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