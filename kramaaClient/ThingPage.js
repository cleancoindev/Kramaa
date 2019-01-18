import React, {Component} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from "axios";
import { Col, Button, Card, CardHeader, CardBody, ListGroupItem, ListGroup } from 'reactstrap';

class ThingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      id: '',
      brand: '',
      associationStatus: '',
      uri: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }


  componentDidMount() {
    axios.post('/api/things/getThingInfo', {'thingID': this.props.match.params.thingID, clientToken: sessionStorage.getItem("clientToken")}).then(res => {
      this.setState({
        name: res.data.thing.name,
        description: res.data.thing.description,
        id: res.data.thing.uniqueId,
        brand: res.data.thing.brand,
        associationStatus: res.data.thing.associationStatus,
        uri: [...this.state.uri, res.data.thing.uri],
      })
    })
  }
  render(){
    const {name, description, id, brand, associationStatus, uri} = this.state;
    return(
      <div>
        <Link to="/things"><Button color="primary">Back to Thing List</Button></Link><br /><br/>
        <Col sm="12" xl="6">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i><strong>Thing Name: {name}</strong>
            </CardHeader>
            <CardBody>
              <ListGroup>
                <ListGroupItem>Thing ID: {id}</ListGroupItem>
                <ListGroupItem>Description: {description}</ListGroupItem>
                <ListGroupItem>Brand: {brand}</ListGroupItem>
                <ListGroupItem>URI: {uri}</ListGroupItem>
                <ListGroupItem>Association to any device?: {String(associationStatus)}</ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </div>
    )
  }
}
export default ThingPage;