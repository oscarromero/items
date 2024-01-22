import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const ContainerComponent = ({title, toolbar, children}) => {
  return (
    <>
        <Container style={{marginTop: '128px'}}>
            <Grid container style={{marginBottom: '10px'}}>
              <Grid container item xs={6}>
                <Typography variant='h4'>{title}</Typography>
              </Grid>
              <Grid container item xs={6} justifyContent='flex-end'>
                {toolbar}
              </Grid>
            </Grid>
            {children}
        </Container>
    </>
  );
}

export default ContainerComponent;
