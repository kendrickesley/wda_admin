import React, { Component } from 'react';
import './TicketList.css';
import {Link} from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import {db as fireDB} from '../../firebase';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { CircularProgress } from 'material-ui/Progress';
import Icon from 'material-ui/Icon';
import SaveIcon from 'material-ui-icons/Save';
import IconButton from 'material-ui/IconButton';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: 120,
  },
});


class TicketList extends Component {
  componentDidMount(){
    this.props.loadRequest();
    console.log(this.props.user.email)
    console.log('http://helpdesk.dev/api/tickets?pos='+this.props.position+'&em='+this.props.user.email);
    fetch('http://helpdesk.dev/api/tickets?pos='+this.props.position+'&em='+this.props.user.email, {
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
        this.props.populateTechnicians(arr);
      }
    })
  }

  saveTicket = (data, ticket_index) => {
    var formData = new FormData();
    formData.append("technical_email", data.technical_email);
    formData.append("helpdesk_email", this.props.user.email);
    formData.append('escalation_level', data.escalation_level);
    formData.append('priority', data.priority);
    this.props.setSaveLoading(true, ticket_index);
    fetch('http://helpdesk.dev/api/tickets/'+data.tid+'/assign', {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    }).then(response=>response.json())
    .then(responseJson=>{
      console.log(responseJson);
      this.props.setSaveLoading(false, ticket_index);
      if(responseJson.status === 'OK'){
        this.props.setStatic(true, ticket_index);
      }
    }).catch(err=>{
      this.props.setSaveLoading(false, ticket_index);
      console.log(err)
      this.props.requestError();
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
            this.props.changeTechnician(e.target.value, ticket_index)
          }}
          input={<Input id={data.tid + '-ticket-assigned'} />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.props.technicians.map(tech=>(
            <MenuItem key={data.tid + '-' + tech.key} value={decodeURIComponent(tech.key)}>{tech.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
    )
  }

  renderPriorityOptions(data, classes, ticket_index){
    return (
      <form className={classes.container} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={data.tid + '-ticket-priority'}>Priority</InputLabel>
        <Select
          value={data.priority || ''}
          onChange={(e)=>{
            this.props.changePriority(e.target.value, ticket_index)
          }}
          input={<Input id={data.tid + '-ticket-priority'} />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'LOW'}>Low</MenuItem>
          <MenuItem value={'MODERATE'}>Moderate</MenuItem>
          <MenuItem value={'HIGH'}>High</MenuItem>
        </Select>
      </FormControl>
    </form>
    )
  }

  renderEscalationLevelOptions(data, classes, ticket_index){
    return (
      <form className={classes.container} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={data.tid + '-ticket-escalation'}>Escalation Level</InputLabel>
        <Select
          value={data.escalation_level || ''}
          onChange={(e)=>{
            this.props.changeEscalationLevel(e.target.value, ticket_index)
          }}
          input={<Input id={data.tid + '-ticket-escalation'} />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl>
    </form>
    )
  }

  getTechnicalName(email){
    for(var i = 0; i < this.props.technicians.length; i++){
      var item = this.props.technicians[i];
      if(item.email == email){
        return item.name;
      }
    }
    return "";
  }

  renderPriority(priority){
    return this.toTitleCase(priority);
  }

  toTitleCase(str)
  {
    if(str == null){
      return ""
    }
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  renderTable(item, classes, ticket_index){
    return (
      <TableRow key={item.tid}>
        <TableCell><Link to={`/app/tickets/${item.tid}`}>{item.ticket_id}</Link></TableCell>
        <TableCell><span>{item.first_name + ' ' + item.last_name}</span></TableCell>
        <TableCell><span>{item.email}</span></TableCell>
        <TableCell><span>{item.software_issue}</span></TableCell>
        <TableCell><span>{item.statuses[0].status || 'Pending'}</span></TableCell>
        <TableCell>{item.static || this.props.position == 'technician' ? this.getTechnicalName(item.technical_email) : this.renderTechniciansOptions(item, classes, ticket_index)}</TableCell>
        <TableCell>{item.static || this.props.position == 'technician' ? this.renderPriority(item.priority) : this.renderPriorityOptions(item, classes, ticket_index)}</TableCell>
        <TableCell>{item.static || this.props.position == 'technician' ? item.escalation_level : this.renderEscalationLevelOptions(item, classes, ticket_index)}</TableCell>
        <TableCell>
            {item.save_loading ? <CircularProgress size={50} /> : 
              (item.static || this.props.position == 'technician' ? null : <IconButton onClick={()=>{this.saveTicket(item, ticket_index)}} color="accent" aria-label="Save">
            <SaveIcon/>
            </IconButton>)
            }
        </TableCell>
      </TableRow>
    )
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className="App">
        {this.props.loading ? 
          <CircularProgress size={50} /> :
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
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.tickets.map((data,index)=>{
                return this.renderTable(data, classes, index)
              })}
            </TableBody>
          </Table>
        }
      </div>
    );
  }
}

export default withStyles(styles)(TicketList);