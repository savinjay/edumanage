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
  ListItemText
} from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';

export default function ContactUs() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Contact Us
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>Contact Information</Typography>
              <List>
                <ListItem>
                  <ListItemIcon><Email /></ListItemIcon>
                  <ListItemText primary="Email" secondary="support@eduvault.com" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Phone /></ListItemIcon>
                  <ListItemText primary="Phone" secondary="+1 (555) 123-4567" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><LocationOn /></ListItemIcon>
                  <ListItemText primary="Address" secondary="123 Education Street, Learning City, ED 12345" />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>Policies</Typography>
              <Typography variant="subtitle1" gutterBottom>Privacy Policy</Typography>
              <Typography variant="body2" paragraph>
                At EduVault, we are committed to protecting your privacy. We collect and use personal information solely for the purpose of providing and improving our services.
              </Typography>
              <Typography variant="subtitle1" gutterBottom>Terms and Conditions</Typography>
              <Typography variant="body2" paragraph>
                By using EduVault, you agree to comply with our Terms and Conditions. These terms outline the rules for using our platform, your rights and responsibilities, and our liability limitations.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

