import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { withFirebase } from './Firebase';
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import ListGroup from 'react-bootstrap/ListGroup'
 
class AdminPage extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      loading: false,
      users: [],
    };
  }
 
  componentDidMount() {
    this.setState({ loading: true });
 
    this.props.firebase.admins().on('value', snapshot => {
      const usersObject = snapshot.val();
 
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));
 
      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.admins().off();
  }
 
  render() {
    const { users, loading } = this.state;
    return (
     
      <div style={{color: "black", width: "100vw", marginTop: "8vh"  }}>
         <ListGroup style={{float: "left", width: "10vw"}}>
  <ListGroup.Item active>Classes</ListGroup.Item>
  <ListGroup.Item>Students</ListGroup.Item>
  <ListGroup.Item>Teachers</ListGroup.Item>
  <ListGroup.Item>Admins</ListGroup.Item>
</ListGroup>
          <Container className="bg-secondary" style={{width: '80vw', minHeight: "100vh"}}>
          <h1 style={{ fontSize: '25px', color: "black" }}>Manage Database</h1>
          <div class="row" >
    <div className="col-sm">
      <h2>Admin</h2>
      {loading && <div>Loading ...</div>}
      <UserList users={users} />
    </div>
    <div className="col-md">
      <h2>Students</h2>
      <UserList users={users} />
    </div>
    <div className="col-md">
      <h2>Teachers</h2>
      <UserList users={users} />
    </div>
   
  </div>
  <div>
   <h2 style={{textAlign: "center"}}>Classes</h2>
  </div>
  <div style={{align: "bottom"}}>
 <Button style={{marginRight: "10%", marginLeft: "15%"}} onClick={this.props.onAddClass}>Add Class</Button>
 <Button style={{marginRight: "10%"}} onClick={this.props.onAddStudent}>Add Student</Button>
 <Button style={{marginRight: "10%"}} onClick={this.props.onAddTeacher}>Add Teacher</Button>
 </div>
      </Container>
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <Table striped bordered hover variant="light" style={{fontSize: "10px", borderRadius: "10px"}}>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
  {users.map(user => (
      <tr key={user.uid}>
        <th>
          <strong>ID:</strong> {user.uid}
        </th>
        <th>
          <strong>E-Mail:</strong> {user.email}
        </th>
        <th>
          <strong>Username:</strong> {user.username}
        </th>
      </tr>
    ))}
  </tbody>
</Table>
);
 
export default withFirebase(AdminPage);