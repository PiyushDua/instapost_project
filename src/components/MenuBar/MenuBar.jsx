import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { EditDialog, RemoveDialog } from './components';

const ITEM_HEIGHT = 48;

class MenuBar extends Component {
  state = {
    anchorEl: null,
    editOpen: false,
    removeOpen: false, 
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleEdit = () => {
    this.setState({ editOpen: true });
  }

  handleRemove = () => {
    this.setState({ removeOpen: true });
  }

  handleEditClose = () => {
    this.setState({ editOpen: false });
  }

  handleRemoveClose = () => {
    this.setState({ removeOpen: false });
  }

  render() {
    const { anchorEl, editOpen, removeOpen } = this.state;
    const { data } = this.props;
    const open = Boolean(anchorEl);
    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => this.handleClose()}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          <MenuItem onClick={() => this.handleEdit()}>
            {"Edit"}
          </MenuItem>
          <MenuItem onClick={() => this.handleRemove()}>
            {"Delete"}
          </MenuItem>
          <EditDialog open={editOpen} data={data} onMenuClose={() => this.handleClose()} onClose={() => this.handleEditClose()} />
          <RemoveDialog open={removeOpen} data={data} onMenuClose={() => this.handleClose()} onClose={() => this.handleRemoveClose()} />
        </Menu>
      </div>
    );
  }
};

  export default MenuBar;