import Head from 'next/head'
import NoteOperations from './components/NoteOperations';
import NoteDetails from './components/NoteDetails';
import { useState } from 'react';
export default function Home() {
  const [ID, setID] = useState(null);
  const getSingleNote = (id) => {
    setID(id)
  }
  return (
    <div className={``}>
      <Head>
        <title>Sample Note App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={``}>
          <div className={``}>
            <NoteOperations getSingleNote={getSingleNote} />
          </div>
          <div className={``}>
            <NoteDetails ID={ID} />
          </div>
        </div>
      </main>
    </div>
  )
}
