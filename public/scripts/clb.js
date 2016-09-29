
const Header = React.createClass({
  render () {
    return (
      <div className="jumbotron">
        <div className="container">
          <a href="https://www.freecodecamp.com/" target="_blank">
           <img className="fcclogo" src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg" alt="FreeCodeCamp logo" />
          </a>
          <h1>Top Campers</h1>
        </div>
      </div>
     )
  }
})

const ShowData = React.createClass({
  render: function () {
    let theList;
    if (this.props.data && this.props.data.length){
      theList = this.props.data.map(function(user, pos) {
        return (
          <div key={user.username} className="row-user">
            <div className="col"> {pos+1} </div>
            <div className="col"> <img src={user.img}/> </div>
            <div className="col">
              <a href= {'https://www.freecodecamp.com/' + user.username} target="_blank"> {user.username} </a>
            </div>
            <div className="col"> {user.alltime} </div>
          </div>
        )
      })
    } else {
      console.log("this.props.data", this.props.data)
      //console.log("this.props.data.length", this.props.data.length)
      theList = <div> Loading... </div>
    }
    return (
      <div className="show-data">
        <div className="row-user table-header">
          <div className="col"> # </div>
          <div className="col"> Camper </div>
          <div className="col"> All Time Points </div>
        </div>
        {theList}
      </div>
    )
  }
})

const Body = React.createClass({
  getInitialState: function() {
    return (
       {data: [], column: "recent"}
    )
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.apiroot+"top/"+this.state.column,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
        console.log(this.state.data.length)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.apiroot, status, err.toString());
      }.bind(this)
    });
  },
  render () {
    return (
      <div className="content">
        <ShowData data={this.state.data} />
      </div>
    )
  }
})

const Display = React.createClass({
  render () {
    return (
      <div>
        <Header />
        <div className="container">
          <Body apiroot={this.props.apiroot} />
        </div>
      </div>
    )
  }
})

const App = React.createClass({
  render () {
    return (
      <Display apiroot="https://fcctop100.herokuapp.com/api/fccusers/"/>
    )
  }
})

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
