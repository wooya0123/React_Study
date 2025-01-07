import './App.css'
import { useState } from 'react'

function Header(props) {
  return (
    <>
      <h1><a href="/" onClick={(event) => {
        event.preventDefault()
        props.onChangeMode()
      }}>{props.title}</a></h1>
    </>
  )
}

function Nav (props) {
  const lis = []
  for (const topic of props.topics) {
    lis.push(
    <li key={topic.id}>
      <a id={topic.id} href={'/read/'+topic.id} onClick={(event) => {
        event.preventDefault()
        props.onChangeMode(Number(event.target.id))
      }}>{topic.title}</a>
    </li>
    )
  }
  return (
    <nav>
    <ol>
      {lis}
    </ol>
  </nav>
  )
}

function Article (props) {
  console.log(props)
  return (
    <>
      <h2>{props.title}</h2>
      {props.body}
    </>
  )
}

function Create (props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={(event) => {
        event.preventDefault()
        const title = event.target.title.value
        const body = event.target.body.value
        props.onCreate(title, body)
      }}>
        <p><input type="text" name="title" placeholder="title"/></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="Create"/></p>
      </form>
    </article>
  )
}


function App() {
  const [mode, setMode] = useState('WELCOME')
  const [id, setId] = useState(null)
  const [nextId, setNextId] = useState(4)
  const [topics, setTopics] = useState([
    {id: 1, title: 'html', body: 'html is ...'},
    {id: 2, title: 'css', body: 'css is ...'},
    {id: 3, title: 'js', body: 'js is ...'},
  ])
  let content = null
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, Web"></Article>
  } else if (mode === 'READ') {
    let title = null
    let body = null
    for (const topic of topics) {
      if (topic.id === id) {
        title = topic.title
        body = topic.body
      }
    };
    content = <Article title={title} body={body}></Article>
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(title, body) => {
      const newTopic = {id: nextId, title: title, body: body}
      const newTopics = [...topics, newTopic]
      setTopics(newTopics)
      setId(nextId)
      setNextId(nextId+1)
      setMode('READ')
      console.log(newTopic)
    }}></Create>
  }

  return (
    <>
      <Header title="WEB" onChangeMode={() => {
        setMode('WELCOME')
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ')
        setId(_id)
      }}></Nav>
      
      {content}
      <p>
        <a href="/create" onClick={event => {
          event.preventDefault()
          setMode('CREATE')
        }}>[Create]</a>
      </p>
    </>
  )
}

export default App