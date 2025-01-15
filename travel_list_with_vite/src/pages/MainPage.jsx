import { useState } from 'react';
import { Link } from 'react-router-dom';

function Countries (props) {
  return(
    <div>
      {props.countries.map(country => (
        <li key={country.id}>
          <a href={"/read/"+country.id} onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(country.id)
          }}>{country.name}</a>
        </li>
      ))}
    </div>
  )
}

function Article (props) {
  return(
    <div>
      <h3>{props.name}</h3>
      <ul>
        {props.cities.map(city => (
          <li key={city.id}>
            {city.name}
            <Link to={"/citymap/"+city.name}>
              <button>지도 보기</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Create (props) {
  const [cityInputs, setCityInputs] = useState([])

  return(
    <form onSubmit={(event) => {
      event.preventDefault()
      const name = event.target.country.value
      const city = event.target.city.value
      props.onCreate(name, city)
    }}>
      <p><input type="text" name="country" placeholder="국가"/></p>
      <p><input type="text" name="city" placeholder="도시"/></p>
      <input type="submit" value="추가" />
    </form>
  )
}

function Update (props) {
  const [name, setName] = useState(props.name)
  const [cities, setCities] = useState(props.cities)

  return(
    <form onSubmit={(event) => {
      event.preventDefault()
      props.onUpdateMode(name, cities)
    }}>
      <p>
        <label htmlFor="country">국가: </label>
        <input 
          id="country"
          type="text"
          name="country"
          placeholder="국가"
          value={name}
          onChange={event => {setName(event.target.value)}}
        />
      </p>
        {cities.map((city, index) => (
          <p key={city.id}>
            <label htmlFor={`city-${index}`}>도시{index+1}</label>
            <input
              id={`city-${index}`}
              type="text"
              placeholder="도시"
              value={city.name}
              onChange={event => {
                const newCities = [...cities]
                newCities[index] = { id: city.id, name: event.target.value }
                setCities(newCities)}}
            />
          </p>
        ))}
      <input type="submit" value="수정" />
    </form>
  )
}

function MainPage() {
  const [countries, setCountries] = useState([
    { id: 1,
      name: '독일',
      cities: [
        { id: 1, name: '베를린' },
        { id: 2, name: '뮌헨' },
        { id: 3, name: '프랑크푸르트' },
      ]
    },
    { id: 2,
      name: '프랑스',
      cities: [
        { id: 1, name: '파리' },
        { id: 2, name: '마르세유' },
        { id: 3, name: '리옹' },
      ]
    }
  ]);
  const [mode, setMode] = useState("Home")
  const [Id, setId] = useState(null)

  let content = null

  // 홈 모드
  if (mode === "Home") {
    content = <h3>국가를 선택하세요</h3>
  }
  // 읽기 모드
  else if (mode === "Read") {
    let name = null
    let cities = null

    for (const country of countries) {
      if (Id === country.id) {
        name = country.name
        cities = country.cities
      }
    }

    // forEach는 비동기라 안 됨
    // countries.forEach(country => {
    //   if (Id === country.id)
    //     name = country.name
    //     cities = country.cities
    // })

    content = <Article name={name} cities={cities}></Article>
    
  }
  // 추가 모드
  else if (mode === "Create") {
    content = <Create countries={countries} onCreate={(name, city) => {
      const newCountries = [...countries]
      const countryIndex = newCountries.findIndex(country => country.name === name)
      let moveId = null

      // 국가가 없으면 추가
      if (countryIndex === -1) {
        newCountries.push({ id: newCountries.length + 1, name: name, cities: [{ id: 1, name: city }]})
        moveId = newCountries.length
      // 국가가 있으면 도시 추가
      } else {
        newCountries[countryIndex].cities.push({ id: newCountries[countryIndex].cities.length + 1, name: city })
        moveId = newCountries[countryIndex].id
      }
      setCountries(newCountries)
      setMode("Read")
      setId(moveId)
    }}></Create>
  }
  // 업데이트 모드
  else if (mode === "Update") {
    let name = null
    let cities = null

    for (const country of countries) {
      if (Id === country.id) {
        name = country.name
        cities = country.cities
      }
    }

    content = <Update name={name} cities={cities} onUpdateMode={(name, cities) => {
      const newCountries = [...countries]
      for (const country of newCountries) {
        if (Id === country.id) {
          country.name = name
          country.cities = cities
        }
      }
      setCountries(newCountries)
      setMode("Read")
      setId(Id)
    }}></Update>
  }
  return (
    <div>
      <h1>여행지 리스트</h1>
      <ul>
        <Countries countries={countries} onChangeMode={(id) => {
          setMode("Read")
          setId(id)
        }}></Countries>
      </ul>

      <h2>가본 도시</h2>
        {content}
      
      {/* 추가 버튼 */}
      <div>
        <a href="/create" onClick={(event) => {
          event.preventDefault();
          setMode("Create")
        }}>[Create]</a>
      </div>

      {/* 업데이트 버튼 */}
      <div>
        {mode === "Read" && (
            <a href={"/update"+ Id} onClick={(event) => {
              event.preventDefault();
              setMode("Update")
            }}>[Update]</a>
        )}
      </div>

      {/* 삭제 버튼 */}
      <div>
        {mode === "Read" && (
          <button onClick={event => {
            event.preventDefault()
            if (window.confirm("삭제하시겠습니까?") === false) {
              return
            }
            else {
              const newCountries = []
              for (const country of countries) {
                if (Id !== country.id) {
                  newCountries.push(country)
                }
              }
              setCountries(newCountries)
              setMode("Home")
              setId(null)
            }
          }}>Delete</button>
        )}
      </div>
    </div>
  );
}

export default MainPage;