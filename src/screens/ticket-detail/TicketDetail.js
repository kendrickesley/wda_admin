import React, { Component } from 'react';
import './TicketDetail.css';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { EditorState } from 'draft-js';
const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    button: {
      margin: theme.spacing.unit,
    },
    formControl: {
      minWidth: 120,
    },
    root: {
      flexGrow: 1,
      marginTop: 30,
    },
    editor:{
      minHeight:300,
    },
    divider: {
      marginTop:15,
      marginBottom:15
    }
  });

  function toTitleCase(str)
  {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

class TicketDetail extends Component {
    componentDidMount(){
        this.props.setTicketID(this.props.tid);
        this.fetchTicket();
    }

    fetchTicket(){
      this.props.loadRequest()
      fetch('http://helpdesk.dev/api/tickets/'+this.props.tid+'?pos='+this.props.position+'&em='+this.props.user.email, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
      }).then(response=>response.json())
      .then(responseJson=>{
        console.log(responseJson)
        if(responseJson.status === 'OK'){
          this.props.setTicket(responseJson.body.ticket);
          this.props.requestError(false);
        }else{
          this.props.requestError();
        }
      }).catch(err=>{
        console.log(err)
        this.props.requestError();
      })  
    }

    submitComment(){
      var formData = new FormData();
      formData.append("admin_email", this.props.user.email);
      formData.append("content", this.props.comment_html);
      this.props.setCommentSaveLoading(true);
      fetch('http://helpdesk.dev/api/tickets/'+this.props.ticket_id+'/comment', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      }).then(response=>response.json())
      .then(responseJson=>{
        console.log(responseJson);
        this.props.setCommentSaveLoading(false);
        this.props.requestCommentError(false);
        if(responseJson.status === 'OK'){
          this.props.setEditorState(EditorState.createEmpty());
          this.props.pushComment(responseJson.body.comment);
        }else{
          this.props.requestCommentError();
        }
      }).catch(err=>{
        this.props.setCommentSaveLoading(false);
        console.log(err)
        this.props.requestCommentError();
      })  
    }

    submitStatus(){
      var formData = new FormData();
      formData.append("admin_email", this.props.user.email);
      formData.append("title", this.props.status_form.title);
      formData.append("content", this.props.status_form.content);
      formData.append("status", this.props.status_form.status);
      this.props.setStatusSaveLoading(true);
      fetch('http://helpdesk.dev/api/tickets/'+this.props.ticket_id+'/status', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      }).then(response=>response.json())
      .then(responseJson=>{
        console.log(responseJson);
        this.props.setStatusSaveLoading(false);
        this.props.requestStatusError(false);
        if(responseJson.status === 'OK'){
          this.props.pushStatus(responseJson.body.status);
          this.props.setStatusTitle('');
          this.props.setStatusContent('');
          this.props.setStatusStatus('');
        }else{
          this.props.requestStatusError();
        }
      }).catch(err=>{
        this.props.setStatusSaveLoading(false);
        console.log(err)
        this.props.requestStatusError();
      })  
    }

    renderError(){
      const classes = this.props.classes;
      return (
        <div>
          <h1>Whoops! Something went wrong</h1>
          <Button onClick={this.fetchTicket.bind(this)} raised color="primary" className={classes.button}>
            Refresh
          </Button>
          <Button onClick={this.props.goBack} raised color="accent" className={classes.button}>
            Back
          </Button>
        </div>
      )
    }

    renderTicketDetail(){
      const ticket = this.props.ticket;
      return (
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography type="caption" gutterBottom>
              Ticket ID
            </Typography>
            <Typography type="display1" gutterBottom>
              {ticket.ticket_id}
            </Typography>
            
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography type="title" gutterBottom>
            {ticket.first_name} {ticket.last_name}
            </Typography>
            <Typography type="caption" gutterBottom>
              Name
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography type="title" gutterBottom>
            {ticket.email}
            </Typography>
            <Typography type="caption" gutterBottom>
              Email
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography type="title" gutterBottom>
            {ticket.phone}
            </Typography>
            <Typography type="caption" gutterBottom>
              Phone
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography type="title" gutterBottom>
            {toTitleCase(ticket.preferred_contact)}
            </Typography>
            <Typography type="caption" gutterBottom>
              Preferred Contact
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography type="title" gutterBottom>
            {ticket.software_issue}
            </Typography>
            <Typography type="caption" gutterBottom>
              Software Issue
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography type="title" gutterBottom>
            {ticket.operating_system}
            </Typography>
            <Typography type="caption" gutterBottom>
              Operating System
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography type="caption" gutterBottom>
              Content
            </Typography>
            <pre>
            <Typography type="title" gutterBottom>
              {ticket.content}
            </Typography>
            </pre>
          </Grid>
          
        </Grid>
      )
    }

    renderAdmin(admin){
      const {technical_email, helpdesk_email, priority, escalation_level} = admin;
      return (
        <Grid container spacing={24}>
          <Grid item xs={12} md={6}>
            <Typography type="title" gutterBottom>
            {technical_email}
            </Typography>
            <Typography type="caption" gutterBottom>
            Assigned To
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography type="title" gutterBottom>
            {helpdesk_email}
            </Typography>
            <Typography type="caption" gutterBottom>
              Helpdesk Assigner
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography type="title" gutterBottom>
            {priority}
            </Typography>
            <Typography type="caption" gutterBottom>
              Priority
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography type="title" gutterBottom>
            {escalation_level}
            </Typography>
            <Typography type="caption" gutterBottom>
              Escalation Level
            </Typography>
          </Grid>
        </Grid>
      )
    }

    renderTechnicianHistory(){
      const {admins} = this.props.ticket;
      return (
        <div>
          <Typography type="title" gutterBottom>
          Admin History
          </Typography>
          {admins && admins.length > 0 ? 
            <div>
              {admins.map(obj=>(
                this.renderAdmin(obj)
              ))}
              <Divider className={this.props.classes.divider}/>
            </div>
            :
            <div>
              <Typography type="body2" gutterBottom>
              No Admin Available
              </Typography>
            </div>
          }
        </div>
      )
    }

    renderTechnician(){
      const {escalation_level, technical_email, helpdesk_email, priority} = this.props.ticket;
      if(technical_email == null){
        return (
          <Typography type="display2" color="accent" gutterBottom>
          Not Assigned
          </Typography>
        )
      }
      return (
        <div>
          <Typography type="display1" gutterBottom>
              Admin
            </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} md={6}>
            <Typography type="title" gutterBottom>
            {technical_email}
            </Typography>
            <Typography type="caption" gutterBottom>
            Assigned To
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography type="title" gutterBottom>
            {helpdesk_email}
            </Typography>
            <Typography type="caption" gutterBottom>
              Helpdesk Assigner
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography type="title" gutterBottom>
            {priority}
            </Typography>
            <Typography type="caption" gutterBottom>
              Priority
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography type="title" gutterBottom>
            {escalation_level}
            </Typography>
            <Typography type="caption" gutterBottom>
              Escalation Level
            </Typography>
          </Grid>
          
        </Grid>
        <Divider className={this.props.classes.divider}/>
        {this.renderTechnicianHistory()}
        </div>
      )
    }

    renderStatus(stat){
      const {title, message, status, admin_email, sid} = stat
      const pendingColor = '#ff6b57';
      const resolvedColor = '#2ef15b';
      const unresolvedColor = '#f22e2e';
      const inProgressColor = '#2d3ef0';
      const color = {
        'PENDING': pendingColor,
        'RESOLVED': resolvedColor,
        'UNRESOLVED': unresolvedColor,
        'IN PROGRESS': inProgressColor
      }
      return (
        <div key={'status-'+sid}>
          <Typography type="body2" gutterBottom>
          {title}
          </Typography>
          <Typography type="body1" gutterBottom>
          {message}
          </Typography>
          <Chip label={status} style={{backgroundColor:color[status], color: '#ffffff'}} />
          <Divider className={this.props.classes.divider}/>
        </div>
      )
    }

    renderStatuses(){
      const statuses = this.props.ticket.statuses;
      return (
        <div>
          <Typography type="display1" gutterBottom>
          Statuses
          </Typography>
          {statuses && statuses.length > 0 ? 
            <div>
            <Divider className={this.props.classes.divider}/>
            {
              statuses.map(obj=>(
                this.renderStatus(obj)
              ))
            }
            </div>
            
            :
            <div>
            <Typography type="body2" gutterBottom>
            No Status Available
            </Typography>
            <Divider className={this.props.classes.divider}/>
            </div>
          }
          {this.props.position == 'technician' ? 
          <div>
          <Typography type="title" gutterBottom>
          Add Status
          </Typography>
          {this.renderStatusForm()}
          </div>:null}
          
        </div>
      )
    }

    renderStatusForm(){
      const classes = this.props.classes;
      return (
        <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="title"
          label="Title"
          value={this.props.status_form.title}
          onChange={(e)=>{
            this.props.setStatusTitle(e.target.value)
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          id="status-content"
          label="Content"
          value={this.props.status_form.content}
          onChange={(e)=>{
            this.props.setStatusContent(e.target.value)
          }}
          fullWidth
          margin="normal"
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="status-status">Status</InputLabel>
          <Select
            value={this.props.status_form.status}
            onChange={(e)=>{
            this.props.setStatusStatus(e.target.value)
          }}
            input={<Input id="status-status" />}
          >
            <MenuItem value="">
              <em>Select Status...</em>
            </MenuItem>
            <MenuItem value={'PENDING'}>Pending</MenuItem>
            <MenuItem value={'IN PROGRESS'}>In Progress</MenuItem>
            <MenuItem value={'UNRESOLVED'}>Unresolved</MenuItem>
            <MenuItem value={'RESOLVED'}>Resolved</MenuItem>
          </Select>
          {this.props.request_status_error ? 
            <Typography type="body2" gutterBottom style={{color:'#fc1414'}}>
              Whoops! make sure your input is valid!
              </Typography>
          :null
          }
          {this.props.status_save_loading ? 
            <CircularProgress size={50}/>
            :
            <Button onClick={this.submitStatus.bind(this)} raised color="primary" style={{marginTop:25}}>
            Save
            </Button>
          }
          
        </FormControl>
      </form>
      )
    }

    renderComment(comment){
      const {admin_email, content, cid} = comment;
      return (
        <div key={'comment-'+cid}>
          <Typography type="body2" gutterBottom>
          {admin_email}
          </Typography>
          <Typography type="body1" gutterBottom>
          <span dangerouslySetInnerHTML={{__html: content}}></span>
          </Typography>
          <Divider className={this.props.classes.divider}/>
        </div>
      )
    }

    renderCommentForm(){
      const classes = this.props.classes;
      return (
        <div>
        
      <Editor 
      editorState={this.props.editor_state}
      editorClassName={this.props.classes.editor}
      onEditorStateChange={this.props.setEditorState}
      />
      {this.props.request_comment_error ? 
        <Typography type="body2" gutterBottom style={{color:'#fc1414'}}>
          Whoops! make sure your input is valid!
          </Typography>
      :null
      }
      {this.props.comment_save_loading ? 
        <CircularProgress size={50}/>
        :
        <Button onClick={this.submitComment.bind(this)} raised color="primary" className={classes.button}>
        Save
        </Button>
      }
      </div>
      )
    }

    renderComments(){
      const comments = this.props.ticket.comments;
      const classes = this.props.classes;
      return (
        <div>
          
          <Typography type="display1" gutterBottom>
          Comments
          </Typography>
          {comments && comments.length > 0 ? 
            <div>
            {
              comments.map(obj=>(
                this.renderComment(obj)
              ))
            }
            </div>
            
          :
          <div>
          <Typography type="body2" gutterBottom>
          No Comment Available
          </Typography>
          <Divider className={classes.divider}/>
          </div>
          }
          <Typography type="title" gutterBottom>
          Add Comments
          </Typography>
          {this.renderCommentForm()}
        </div>
      )
    }

    renderDetail(){
      if(!this.props.ticket){
        return (<div></div>)
      }
      return (
        <div>
          {this.renderTicketDetail()}
          <Divider className={this.props.classes.divider}/>
          {this.renderTechnician()}
          <Divider className={this.props.classes.divider}/>
          <Grid container spacing={24}>
          <Grid item xs={12} md={6}>
            {this.renderComments()}
          </Grid>
          <Grid item xs={12} md={6}>
            {this.renderStatuses()}
          </Grid>
          
        </Grid>
        </div>
      )
    }

    

    render() {
        const classes = this.props.classes;
        return (
        <div className={classes.root}>
          <Button raised dense onClick={this.props.goBack} style={{marginBottom:25}}>Back</Button>
            {
              this.props.loading ? 
              <CircularProgress size={50} />
              :
              (this.props.request_error ? 
              this.renderError() :
              this.renderDetail())
            }
        </div>
        );
    }
}

export default withStyles(styles)(TicketDetail);