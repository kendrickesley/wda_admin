import React, { Component } from 'react';
import './TicketList.css';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import {db as fireDB} from '../../firebase';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});


class TicketList extends Component {
  componentDidMount(){

    fetch('http://helpdesk.dev/api/tickets', {
      method: 'GET'
    }).then(response=>response.json())
    .then(responseJson=>{
      if(responseJson.status === 'OK'){
        this.props.populateTickets(responseJson.body.tickets);
      }else{
        this.props.requestError();
      }
    }).catch(err=>{
      console.log(err)
      this.props.requestError();
    })  

    fireDB.ref('/technicians').once('value', (snapshot) => {
      const val = snapshot.val();
      if(val){
        var arr = [];
        for(var key in val){
          if (val.hasOwnProperty(key)){
            arr = [...arr, {
              email: val[key].email,
              name: val[key].name,
              key: key
            }]
          }
        }
        console.log(arr);
        this.props.populateTechnicians(arr);
      }
    })
  }

  renderTechniciansOptions(data, classes, ticket_index){
    return (
      <form className={classes.container} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={data.tid + '-ticket-assigned'}>Technician</InputLabel>
        <Select
          value={data.technical_email || ''}
          onChange={(e)=>{
            this.props.changeTechnician(e.target.value, ticket_index);
          }}
          input={<Input id={data.tid + '-ticket-assigned'} />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.props.technicians.map(tech=>(
            <MenuItem key={data.tid + '-' + tech.key} value={tech.key}>{tech.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
    )
  }

  renderTable(item, classes, ticket_index){
    return (
      <TableRow key={item.tid}>
        <TableCell><span>{item.ticket_id}</span></TableCell>
        <TableCell><span>{item.first_name + ' ' + item.last_name}</span></TableCell>
        <TableCell><span>{item.email}</span></TableCell>
        <TableCell><span>{item.software_issue}</span></TableCell>
        <TableCell><span>{item.statuses[0].status || 'Pending'}</span></TableCell>
        <TableCell>{this.renderTechniciansOptions(item, classes, ticket_index)}</TableCell>
        <TableCell>Priority</TableCell>
        <TableCell>Escalation Level</TableCell>
      </TableRow>
    )
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className="App">
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Assigned To</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Escalation Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.tickets.map((data, index)=>{
            return this.renderTable(data, classes, index)
          })}
        </TableBody>
      </Table>
      </div>
    );
  }
}

export default withStyles(styles)(TicketList);