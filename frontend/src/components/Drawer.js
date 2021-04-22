import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core/";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function SmallMenu() {
  <div>
    <div className={classes.drawerHeader}>
      <h1 className="brand">Navegación</h1>
    </div>
    <Divider />
    <List>
      <Link to="/">
        <ListItem button>
          <ListItemIcon>
            <HomeOutlinedIcon style={{ color: orange[700] }} />
          </ListItemIcon>
          <ListItemText style={{ color: orange[800] }} primary="Inicio" />
        </ListItem>
      </Link>
      <ListItem button onClick={() => setShowSearchBox(!showSearchBox)}>
        <ListItemIcon>
          <SearchIcon style={{ color: orange[700] }} />
        </ListItemIcon>
        <ListItemText style={{ color: orange[800] }} primary="Buscar..." />
      </ListItem>
      {userInfo ? (
        <>
          <Link to={`/${userInfo.username}`}>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleRoundedIcon style={{ color: orange[700] }} />
              </ListItemIcon>
              <ListItemText
                style={{ color: orange[800] }}
                primary={userInfo.username}
              />
            </ListItem>
          </Link>
          <ListItem button onClick={signoutHandler}>
            <ExitToAppOutlinedIcon style={{ color: red[500] }} />
            <ListItemText className="menu-margin" style={{ color: red[500] }}>
              Cerrar sesión
            </ListItemText>
          </ListItem>
        </>
      ) : (
        <Link to="/signin">
          <ListItem button>
            <ExitToAppOutlinedIcon style={{ color: green[700] }} />
            <ListItemText className="menu-margin" style={{ color: green[700] }}>
              Iniciar Sesión
            </ListItemText>
          </ListItem>
        </Link>
      )}
    </List>
  </div>;
}
