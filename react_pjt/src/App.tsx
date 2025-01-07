import './App.css'

interface HeaderProps {
  title: string;
}

interface ArticleProps {
  title: string;
  body: string;
}

interface NavProps {
  topics: Topic[];
}

function Header(props : HeaderProps) {
  return (
    <>
      <h1><a href="/">{props.title}</a></h1>
    </>
  )
}

function Nav (props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let t: object = props.topics[i]
    lis.push(<li>{t.title}</li>)
  }
  return (
    <nav>
    <ol>
      {lis}
    </ol>
  </nav>
  )
}

function Article (props : ArticleProps) {
  return (
    <>
      <h2>{props.title}</h2>
      {props.body}
    </>
  )
}

function App() {
  const topics = [
    {id: 1, title: 'html', body: 'html is ...'},
    {id: 2, title: 'css', body: 'css is ...'},
    {id: 3, title: 'js', body: 'js is ...'},
  ]
  return (
    <>
      <Header title="WEB"></Header>
      <Nav topics={topics}></Nav>
      <Article title="Hi" body="Hello, Web"></Article>
    </>
  )
}

export default App
