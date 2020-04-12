import Head from 'next/head'
import useSWR from 'swr'
import fetcher from '../data/fetcher'
import { useState } from 'react'

function Home() {
    const { data, error } = useSWR('/api/players', { fetcher: fetcher, refreshInterval: 1 })
    
    const [titleModal, setTitleModal] = useState("")
    const [textModal, setTextModal] = useState("")
    const [modalDisplay, setModalDisplay] = useState(false)
    const [menToKill, setMenToKill] = useState("")

    var list = data?.list.list

    if(list) {
      list = Object.values(list)
    } else {
      list = []
    }

    async function kill() {
      if(menToKill !== "") {
        await fetch('/api/players/kill/' + menToKill, {
          method: 'PUT'
        }).then((json) => {
          if(json.status === 200) {
            setTextModal("Le joueur " + menToKill + " est mort")
            setTitleModal("Ordre executé")
          } else {
            
            setTextModal("Le joueur " + menToKill + " n'existe pas")
            setTitleModal("Erreur")
          }
          setModalDisplay(true)

          return json.json()
        }).then((data) => {
          console.log(data.list.list.lucas.status)
        })
      }
    }

    return (
      <main className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">
            Bienvenue sur une rapide présentation de <a href="https://nextjs.org">Next.js !</a>
          </h1>

          <p>
            
          </p>

          <div className="grid">
            {
              list.map((elem, index) => {
                  return (
                    <a href={"/game/" + elem.id} className="card" key={index}>
                      <h3>{elem.id}</h3>
                      <p>Voir les informations en jeu de {elem.id}</p>
                      <span className={elem.status == 'alive' ? 'alive' : 'dead'}>{elem.status}</span>
                    </a>
                  )
              })
            } 
          </div>

          <form onSubmit={(e) => {e.preventDefault()}}>
            <h2 className="title">Qui voulez-vous tuer dans le jeu?</h2>
            <div className="container-form">
              <input type="text" value={menToKill} onChange={(e) => {setMenToKill(e.target.value)}} />
              <input className="btn" type="submit" value="Tuer" onClick={() => kill()} />
            </div>
          </form>
        </main>
        {
          modalDisplay &&
          <div className="Modal">
            <div>
              <h3 className="title">{titleModal}</h3>
              <p>{textModal}</p>
              <button className="btn" onClick={() => {setModalDisplay(false)}}>Fermer</button>
            </div>
          </div>
        }

        <style jsx>{`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #31394dff;
          }

          .Modal {
            position: fixed;
            top: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(125,125,125,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.75);
          }

          .Modal div {
            width: 50%;
            height: 30rem;
            background-color: #31394dff;
            border-radius: 25px;
            padding: 3rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-direction: column;
          }

          .Modal p {
            color: white;
            font-size: 2rem;
            font-weight: bold;
            text-transform: uppercase;
          }

          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          .title a {
            color: #0070f3;
            text-decoration: none;
          }

          .title a:hover,
          .title a:focus,
          .title a:active {
            text-decoration: underline;
          }

          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
            color: white;
            text-align: center;
          }

          .grid {
            width: 80%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 3rem;
          }

          .card {
            margin: 1rem;
            padding: 5rem 1.5rem;
            text-align: center;
            color: #31394dff;
            border: 3px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
            background-color: white;
            box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.75);
            transition: 0.3s;
          }

          .card:hover,
          .card:focus,
          .card:active {
            color: #0070f3;
            border-color: #0070f3;
            transition: 0.3s;
            transform: scale(1.08); 
          }

          .card h3 {
            text-align: center;
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
            text-transform: uppercase;
          }

          .card p {
            margin-bottom: 2rem;
            font-size: 1.25rem;
            line-height: 1.5;

          }

          span {
            width: 90%;
            border-radius: 25px;
            padding:  0.5rem 1.5rem;
            color: white;
            text-transform: uppercase;
          }

          .alive {
            background-color: rgb(48, 148, 53);
          }

          .dead {
            background-color: rgb(148, 48, 48);
          }

          form {
            width: 80%;
            margin: 3rem;
          }

          .container-form {
            display:flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          input {
            margin: 1rem;
            padding: 0.5rem 0;
            width: 60%;
            font-size: 1.5rem;
            font-weight: bold;
            text-align:center;
            color: #31394dff;
          }

          .btn {
            width: 30%;
            background-color: white;
            margin: 1rem;
            padding: 0.8rem 0rem;
            text-decoration : none;
            color: #31394dff;
            font-size: 1.5rem;
            border-radius: 30px;
            text-transform: uppercase;
            box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.75);
            transition: 0.3s;
            cursor: pointer;
          }

          .btn:hover,
          .btn:focus,
          .btn:active {
              transition: 0.3s;
              transform: scale(1.08); 
          }
        `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
              Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </main>
    )
}

export default Home
