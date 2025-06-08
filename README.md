<img src="https://media1.tenor.com/m/pqgfsPUQ-REAAAAC/panosso.gif" alt="Banner" width="100%" height="" z-index:-1/>

# GitFind

GitFind é uma aplicação React que permite buscar usuários do GitHub e listar seus repositórios públicos, exibindo informações do perfil e dos repositórios de forma organizada e responsiva.

## Sumário

- [Funcionalidades](#funcionalidades)
- [Estruturas de Pastas](#estrutura-de-pastas)
- [Fluxo de Aplicação](#fluxo-de-aplicação)
- [Componentes](#componentes)
- [Hooks e Estados](#hooks-e-estados)
- [Estilos e Responsividade](#estilos-de-responsividade)
- [Detalhamento do Código Principal](#detalhamento-do-código-principal-appjsx)
- [Como Rodar o Projeto](#como-rodar-o-projeto)

## Funcionalidades

- Busca de usuários do GitHub via API pública.
- Exibição de informações do perfil: avatar, nome, login, bio.
- Listagem dos repositórios públicos do usuário.
- Interface responsiva para desktop e mobile.
- Feedback visual caso o usuário não seja encontrado ou não tenha repositórios.

## Estrutura de Pastas

```
gitfind/
├── src/
│   ├── assets/
│   │   └── background.png
│   ├── components/
│   │   ├── header/
│   │   │   └── Header.jsx
│   │   └── ItemList/
│   │       ├── ItemList.jsx
│   │       └── ItemList.css
│   ├── pages/
│   │   └── home/
│   │       ├── App.jsx
│   │       └── global.css
│   ├── responsive.css
│   └── index.js
```

## Fluxo de Aplicação

1. **Usuário digita** um nome de usuário do GitHub no input.
2. **Ao clicar em "Buscar"**, a função ```handleGetData``` é chamada.
3. **A função faz duas requisições:** 
    - Uma para buscar os dados do usuário.
    - Outra para buscar os repositórios públicos desse usuário.
4. **Se o usuário existir**, os dados são exibidos na tela.
5. **Se houver repositórios**, eles são listados abaixo do perfil.

## Componentes

- #### App.jsx #####: Componente principal. Gerencia os estados, faz as requisições à API do GitHub e renderiza os componentes de interface.
- #### Header.jsx #####: Componente de cabaçalho.
- #### ItemList.jsx #####: Componente para exibir cada repositório individualmente, recebendo ```title``` e ```description``` como props.

## Hooks e Estados

- **user**: armazena o texto digitado no input.
- **repos**: armazena o array de repositórios retornados da API.
- **currentUser**: armazena os dados do usuário retornados da API.

## Estilos de Responsividade

- **global.css**: estilos globais, cores, espaçamentos, botões, inputs, containers, perfil.
- **responsive.css**: regras para adaptar o layout em telas menores (mobile/tablet).
- **ItemList.css**: estilos específicos para a lista de repositórios.

#### Principais pontos:

- Uso de ```width:100%```, ```max-width```, ```flexbox``` e media queries para garantir responsividade.
- Input e botão estilizados para boa usabilidade em qualquer dispositivo.
- Imagem de fundo adaptável.

## Detalhamento do Código Principal (App.jsx)
```js
import { useState } from 'react';
import './global.css';
import background from "../../assets/background.png";
import Header from '../../components/header/Header.jsx';
import ItemList from '../../components/ItemList/ItemList.jsx';

function App() {
  // Estados principais
  const [user, setUser] = useState("");
  const [repos, setRepos] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Função para buscar dados do usuário e repositórios
  const handleGetData = async () => {
    // Busca dados do usuário
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const { avatar_url, name, login, bio } = newUser;
      setCurrentUser({
        avatar: avatar_url,
        name,
        login,
        bio
      });
    }

    // Busca repositórios
    const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
    const newRepos = await reposData.json();

    if (newRepos.length > 0) {
      setRepos(newRepos);
    }
  };

  // Renderização
  return (
    <>
      <Header />
      <div className='container'>
        <img src={background} className='background' />
        <div className='info'>
          <div className='search'>
            <input
              type="text"
              className='input'
              name='usuario'
              placeholder='@usuario'
              required
              value={user}
              onChange={(event) => setUser(event.target.value)}
            />
            <button className="btn" onClick={handleGetData}>Buscar</button>
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
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;

```

## Como Rodar o Projeto

1. ****Clone o repositório:****
```bash
git clone <url-do-repo>
cd gitfind
```
2. ****Instale as dependências:****
```bash
npm install
```
3. ****Inicie o servidor de desenvolvimento:***
 ```bash
 npm run dev
 ```
 ```bash
npm run dev -- --host //Abre um servidor para visualização em mais de um aparelho simultaneamente.
 ```

