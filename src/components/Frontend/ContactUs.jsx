import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import { School, Class, Instagram, LinkedIn, Twitter, Link, GitHub } from '@mui/icons-material';

export default function ContactUs() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Contact Us
        </Typography>

        <Grid container spacing={3}>
          {/* Section for Savinjaya H N */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>Savinjaya H N</Typography>
              <List>
                <ListItem>
                  <ListItemIcon><School /></ListItemIcon>
                  <ListItemText primary="College" secondary="SDM College Ujire" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Class /></ListItemIcon>
                  <ListItemText primary="Class" secondary="III BCA" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <IconButton color="primary" href="https://www.instagram.com/savinjay_h_n/" target="_blank">
                      <Instagram />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText primary="Instagram" secondary="Follow me on Instagram" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <IconButton color="primary" href="https://www.linkedin.com/in/savinjaya-h-n-82a38031a/" target="_blank">
                      <LinkedIn />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText primary="LinkedIn" secondary="Connect on LinkedIn" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <IconButton color="primary" href="https://x.com/savinjaya" target="_blank">
                      <Twitter />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText primary="X" secondary="Follow me on X" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <IconButton color="primary" href="https://savinjay.github.io/Portfolio/" target="_blank">
                      <Link />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText primary="Portfolio" secondary="View my portfolio" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <IconButton color="primary" href="https://github.com/savinjay" target="_blank">
                      <GitHub />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText primary="GitHub" secondary="Check out my GitHub" />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Section for Your Friend */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>Narthan H S</Typography>
              <List>
                <ListItem>
                  <ListItemIcon><School /></ListItemIcon>
                  <ListItemText primary="College" secondary="SDM College Ujire" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Class /></ListItemIcon>
                  <ListItemText primary="Class" secondary="III BCA" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <IconButton color="primary" href="https://www.instagram.com/_.narthan._hs/" target="_blank">
                      <Instagram />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText primary="Instagram" secondary="Follow on Instagram" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <IconButton color="primary" href="https://linkedin.com" target="_blank">
                      <LinkedIn />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText primary="LinkedIn" secondary="Connect on LinkedIn" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <IconButton color="primary" href="https://x.com" target="_blank">
                      <Twitter />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText primary="X" secondary="Follow on X" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <IconButton color="primary" href="https://portfolio.com" target="_blank">
                      <Link />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText primary="Portfolio" secondary="View portfolio" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <IconButton color="primary" href="https://github.com/narthan" target="_blank">
                      <GitHub />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText primary="GitHub" secondary="Check out GitHub" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}