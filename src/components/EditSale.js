import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';


class EditSale extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  emptyItem = {
    amount: '',
    employeeFirstName: '',
    employeeLastName: '',
    productName: '',
    saleDate: '',
  
  };

  constructor(props) {
    super(props);
    const {cookies} = props;
    this.state = {
      item: this.emptyItem,
      csrfToken: cookies.get('XSRF-TOKEN')
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      try{
      const sale = await (await fetch(`../../api/sale/${this.props.match.params.id}`,{credentials: 'include'})).json();
      this.setState({item: sale});
      }catch(error){
        this.props.history.push('../');
      }
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item,csrfToken} = this.state;

    await fetch('../../api/sale'+ (item.id ? '/' + item.id : ''), {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'X-XSRF-TOKEN': csrfToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
      credentials: 'include'
    });
    this.props.history.push('../sale');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Sale' : 'Add Sale'}</h2>;

    return <div>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
        <FormGroup>
            <Label for="employeeFirstName">Employee First Name</Label>
            <Input type="text" name="employeeFirstName" id="employeeFirstName" value={item.employeeFirstName || ''}
                   onChange={this.handleChange} autoComplete="employeeFirstName"/>
          </FormGroup>
          <FormGroup>
            <Label for="employeeLastName">Employee Last Name</Label>
            <Input type="text" name="employeeLastName" id="employeeLastName" value={item.employeeLastName || ''}
                   onChange={this.handleChange} autoComplete="employeeLastName"/>
          </FormGroup>
          <FormGroup>
            <Label for="amount">Ammount of Sale</Label>
            <Input type="text" name="amount" id="amount" value={item.amount || ''}
                   onChange={this.handleChange} autoComplete="amount"/>
          </FormGroup>
          <FormGroup>
            <Label for="productName">Product Name</Label>
            <Input type="text" name="productName" id="productName" value={item.productName || ''}
                   onChange={this.handleChange} autoComplete="productName"/>
          </FormGroup>
          <FormGroup>
            <Label for="saleDate">Sale Date</Label>
            <Input type="date" name="saleDate" id="saleDate" value={item.saleDate || ''}
                   onChange={this.handleChange} autoComplete="saleDate"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="../sale">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withCookies(withRouter(EditSale));