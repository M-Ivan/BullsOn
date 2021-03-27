import { Button, Container, Grid } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container maxWidth="md" fixed>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-end"
          xs={12}
          spacing={1}
        >
          <Grid container justify="flex-start">
            <div>
              <h1>Inicio</h1>
            </div>
          </Grid>

          <div>
            <p>
              esto es un textoesto es un textoesto es un textoesto es un texto
              esto es un texto esto es un texto esto es un texto esto es un
              texto esto es un texto esto es un texto esto es un texto esto es
              un texto esto es un texto esto es un texto
            </p>
          </div>
          <Grid container direction="column" item xs={6}>
            <Button
              className="prueba"
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
            >
              Esto es un boton
            </Button>
          </Grid>
        </Grid>
      </Container>
    </BrowserRouter>
  );
}

export default App;
