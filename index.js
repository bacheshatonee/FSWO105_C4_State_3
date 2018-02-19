import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import PropTypes from 'prop-types';

class GitHubRepos extends React.Component {
  state = {
    repos: [],
    search: "javascript",
    count: 0
  };

  componentDidMount() {
    this.updateSearch();
    this.interval = setInterval(
      () => {this.setState({ count: this.state.count + 1 }); console.log(this.state.count)},
      10000
    );
  }

  setValue(e){
    this.setState({ search: e.target.value});
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateSearch(){
    fetch(
      "https://api.github.com/search/repositories?q=" +
        this.state.search +
        "&type=Repositories&sort=stars&per_page=10"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ repos: responseJson.items });
      });
  }

  render() {
    return (
      <div>
        Repo List
        <hr />
        <input type="text" placeholder="Search" onChange={e => this.setValue(e)} />
        <button onClick={() => this.updateSearch()}>Search</button>
        <ul>
          {this.state.repos.map(repo => <li key={repo.id}>{repo.name}</li>)}
        </ul>
      </div>
    );
  }
}

render(<GitHubRepos/>, document.getElementById('root'));
