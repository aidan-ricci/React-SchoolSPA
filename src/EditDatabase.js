import Card from 'react-bootstrap/Card';
const React = require('react')


const Edit = (props) => {
  
    return (
      <Card bg="secondary" style={{ marginTop: '5vh', marginBottom: '-5vh', width: '80rem', height: '30vh' }}>
        <Card.Body>
          <Card.Title style={{ fontSize: '25px' }}>Manage Database</Card.Title>
        </Card.Body>
      </Card>
    );
  }
export default Edit;