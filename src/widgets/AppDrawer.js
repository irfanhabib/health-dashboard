import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MdFitnessCenter from 'react-icons/lib/md/fitness-center';
import FaCalendar from 'react-icons/lib/fa/calendar';
import NavLink from 'react-router-dom/NavLink';
import EpochView from './EpochView';
import Header from './Header';
import withRouter from 'react-router-dom/withRouter';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class AppDrawer extends React.Component {

  constructor(props){
    super(props);

    this.gotoOverview = this.gotoOverview.bind(this);
    this.gotoEpochView = this.gotoEpochView.bind(this);

  }
  state = {
    anchor: 'left',
  };

  gotoOverview = () => {
    this.props.history.push('/summary')
  }

  gotoEpochView = () => {
    this.props.history.push('/data')

  }
  handleChange = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { anchor } = this.state;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor={anchor}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
        <div>
          <ListItem button onClick={this.gotoOverview}>
              <ListItemIcon>
              <MdFitnessCenter />
              </ListItemIcon>
              <ListItemText primary="Overview" />
          </ListItem>
          <ListItem button onClick={this.gotoEpochView}>
            <ListItemIcon>
             <FaCalendar />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItem>
        </div>
        
        
        </List>
      </Drawer>
    );

  
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(AppDrawer));