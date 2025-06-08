import { useState} from 'react' //useState is a React Hook that lets you add state to functional components
import './global.css' // Importing global styles
import background from "../../assets/background.png" // Importing background image
import Header from '../../components/header/Header.jsx' // Importing Header component
import "../../components/ItemList/ItemList.jsx" // Importing ItemList component
import ItemList from '../../components/ItemList/ItemList.jsx' // Importing ItemList component

// function App => Main component of the application
function App() {

  //BackEnd 
  const [user, setUser] = useState(""); // State to hold the username input
  const [repos, setRepos] = useState(null); // State to hold the repositories data
  const [currentUser, setCurrentUser] = useState(null); // State to hold the current user data
  
  // handleGetData => Function to handle fetching user data and repositories
  const handleGetData = async () => {
     
    //Fetch user data from GitHub API
      const userData = await fetch(`https://api.github.com/users/${user}`);
      const newUser = await userData.json()

      // Set the current user state with the fetched data
      if(newUser.name) {
        const {avatar_url, name, login, bio} = newUser;
        setCurrentUser({
          avatar: avatar_url,
          name: name,
          login: login,
          bio: bio
        });
      }


      // Fetch repositories for the user
      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();
      
      if(newRepos.length > 0) {
        setRepos(newRepos);
      }
};
//FrontEnd
  return ( 
    // OnChange => Updates the user state with the input value
    // OnClick => Calls handleGetData to fetch user and repository data
    //fetch => Fetches (Buscar) data from GitHub API
    <>
    <Header/>
    <div className='container'>
      <img src={background} className='background'/>
    <div className='info'>
      <div className ='search'>
          <input type="text" className='input' name='usuario' placeholder='@usuario' required value={user}
              onChange={(event) => setUser(event.target.value)}/>
          <button className="btn" onClick={handleGetData}> Buscar </button>
      </div>
      {currentUser?.name ? (
        <>
        <div className="profile-container">
          <img src={currentUser.avatar} className='profile-img' alt='profile photo' />
          <div className='profile'>
          <h3>{currentUser.name}</h3>
          <span>@{currentUser.login}</span>
          <p>{currentUser.bio}</p>
          </div>
        </div>
        <hr />
        </>
      ) : null}
      {repos?.length ? (
        <div>
          <h4 className='repo'>Repositórios</h4>
          {repos.map((repo, index) => (
            <ItemList
              key={index}
              title={repo.name}
              description={repo.description ? repo.description : "Sem descrição"}
            />
          ))}
        </div>
      ) : null }
    </div>
    </div>
    </>
  )
}

export default App;
