import React from "react";
import { Button, Container, Grid } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

export default function HomeScreen() {
  return (
    <div>
      <Container maxWidth="md" fixed>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
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
          <Grid item xs={8}>
            <Grid container direction="column" justify="center">
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
        </Grid>
      </Container>
    </div>
  );
}
