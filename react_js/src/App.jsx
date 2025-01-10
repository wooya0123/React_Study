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

// Create 컴포넌트
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

// Update 컴포넌트
function Update (props) {
  const [title, setTitle] = useState(props.title)
  const [body, setBody] = useState(props.body)

  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={(event) => {
        event.preventDefault()
        const title = event.target.title.value
        const body = event.target.body.value
        props.onUpdate(title, body)
      }}>
        <p><input type="text" name="title" placeholder="title" value={title} onChange={event => {
          console.log(event.target.value)
          setTitle(event.target.value)
        }}/></p>
        <p><textarea name="body" placeholder="body" value={body} onChange={event => {
          setBody(event.target.value)
        }}></textarea></p>
        <p><input type="submit" value="Update"/></p>
      </form>
    </article>
  )
}

// 화면 표시 함수
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
  let contextControl = null

    // Welcome모드일 때
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, Web"></Article>
  
    // Read모드일 때
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
    contextControl = <>
      <li><a href={"/update" + id} onClick={event => {
        event.preventDefault()
        setMode('UPDATE')
        }}>[Update]</a>
      </li>
      <li>
        <input type="button" value="Delete" onClick={() => {
          const newTopics = []

          for (const topic of topics) {
            if (topic.id !== id)
              newTopics.push(topic)
          }
          setTopics(newTopics)
          setMode('WELCOME')
        }}/>
      </li>
    </>
    

    // Create모드일 때
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(title, body) => {
      const newTopic = {id: nextId, title: title, body: body}
      const newTopics = [...topics, newTopic]
      setTopics(newTopics)
      setId(nextId)
      setNextId(nextId+1)
      setMode('READ')
    }}></Create>

    //Update모드일 때
  } else if (mode === 'UPDATE') {
    let title = null
    let body = null
    for (const topic of topics) {
      if (topic.id === id) {
        title = topic.title
        body = topic.body
      }
    };

    content = <Update title={title} body={body} onUpdate={(title, body) => {
      const newTopics = [...topics]

      for (const topic of newTopics) {
        if (topic.id === id) {
          topic.title = title
          topic.body = body
        }
      }
      setTopics(newTopics)
      setMode('READ')

    }}></Update>
  }

  // 화면 표시
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

      <ul>
        <li>
          <a href="/create" onClick={event => {
            event.preventDefault()
            setMode('CREATE')
          }}>[Create]</a>
        </li>
        {contextControl}
      </ul>
    </>
  )
}

export default App