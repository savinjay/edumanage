import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Calendar, Pencil, LogOut, FileLock2, Linkedin, Instagram, Plus, FileText, Download, Eye, Trash2 } from 'lucide-react';
import {
    Button,
    Typography,
    Box,
    Paper,
    Grid,
    ToggleButton,
    ToggleButtonGroup,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Tooltip,
    Alert,
    Divider,
} from '@mui/material';

function Profile() {
    const navigate = useNavigate();
    const [alignment, setAlignment] = useState('documents');
    const [openBioDialog, setOpenBioDialog] = useState(false);
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const [uploadType, setUploadType] = useState('');
    const [newItemTitle, setNewItemTitle] = useState('');
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');

    const [bioData, setBioData] = useState({
        email: 'savinjaya@gmail.com',
        phone: '+91 9876543210',
        location: 'Bangalore, India',
        linkedin: 'linkedin.com/in/savinjaya',
        instagram: '@savinjaya'
    });

    const [documents, setDocuments] = useState([
        { id: 1, title: 'Tax Returns 2023', date: '2024-02-15', file: null },
        { id: 2, title: 'Cover Letter', date: '2024-02-14', file: null },
    ]);

    const [certificates, setCertificates] = useState([
        { id: 1, title: 'Web Development Certificate', issuer: 'Coursera', date: '2023-12-01', file: null },
        { id: 2, title: 'Python Programming', issuer: 'Udemy', date: '2023-11-15', file: null },
    ]);

    const handleLogoutClick = (event) => {
        event.preventDefault();
        navigate('/');
    };

    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    const handleBioDialogOpen = () => {
        setOpenBioDialog(true);
    };

    const handleBioDialogClose = () => {
        setOpenBioDialog(false);
    };

    const handleBioSubmit = () => {
        console.log('Bio updated:', bioData);
        setOpenBioDialog(false);
    };

    const handleUploadDialogOpen = (type) => {
        setUploadType(type);
        setOpenUploadDialog(true);
        setError('');
        setNewItemTitle('');
        setSelectedFile(null);
    };

    const handleUploadDialogClose = () => {
        setOpenUploadDialog(false);
        setError('');
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
                setSelectedFile(file);
                setError('');
            } else {
                setError('Please select a PDF or image file');
                setSelectedFile(null);
            }
        }
    };

    const handleUploadSubmit = () => {
        if (!selectedFile) {
            setError('Please select a file');
            return;
        }
        if (!newItemTitle.trim()) {
            setError('Please enter a title');
            return;
        }

        const newItem = {
            id: Date.now(),
            title: newItemTitle,
            date: new Date().toISOString().split('T')[0],
            file: selectedFile,
            ...(uploadType === 'certificates' && { issuer: 'Not Specified' })
        };

        if (uploadType === 'documents') {
            setDocuments([...documents, newItem]);
        } else {
            setCertificates([...certificates, newItem]);
        }

        handleUploadDialogClose();
    };

    const handleDelete = (id, type) => {
        if (type === 'documents') {
            setDocuments(documents.filter(doc => doc.id !== id));
        } else {
            setCertificates(certificates.filter(cert => cert.id !== id));
        }
    };

    const handleDownload = (item) => {
        // download the actual file
        console.log('Downloading:', item.title);
    };

    const handleView = (item) => {
        //open the file in a viewer
        console.log('Viewing:', item.title);
    };

    return (
        <Box sx={{
            minHeight: '150vh',
            backgroundColor: 'rgba(113, 126, 142, 0.15)',
        }}>
            {/* Header */}
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                backgroundColor: 'white'
            }}>
                <Typography
                    variant="h4"
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        fontWeight: 'bold' 
                    }}>
                    <FileLock2 size={40} />
                    EduVault
                </Typography>
                <Button 
                    variant='outlined' 
                    color='error'
                    startIcon={<LogOut />}
                    onClick={handleLogoutClick}
                >
                    Logout
                </Button>
            </nav>

            {/* Profile Section */}
            <Paper sx={{
                width: '90%',
                maxWidth: '1500px',
                margin: '2rem auto',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
                <Grid container spacing={3} alignItems="center">
                    {/* Profile Image */}
                    <Grid item xs={12} sm={3} display="flex" justifyContent="center">
                        <Box
                            component="img"
                            src="https://imgs.search.brave.com/XoCvQPCR8cwB92wTx6BVnT53TrDFDtYoR58BYS3mj6M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE5/NjA4Mzg2MS92ZWN0/b3Ivc2ltcGxlLW1h/bi1oZWFkLWljb24t/c2V0LmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1hOGZ3ZFg2/VUtVVkNPZWROX3Aw/cFBzenU4QjRmNnNq/YXJEbVVHSG5ndmRN/PQ"
                            alt="Profile"
                            sx={{
                                width: 140,
                                height: 140,
                                borderRadius: '50%',
                                border: '3px solid #4f46e5',
                                objectFit: 'cover'
                            }}
                        />
                    </Grid>

                    {/* Name & Title */}
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h4" fontWeight="bold" color="primary">
                            Savinjaya H N
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Student
                        </Typography>
                    </Grid>

                    {/* Update Bio Button */}
                    <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            color="black"
                            startIcon={<Pencil />}
                            onClick={handleBioDialogOpen}
                        >
                            Update Bio
                        </Button>
                    </Grid>
                </Grid>

                {/* Contact Information */}
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={4}>
                        <Box display="flex" alignItems="center" gap={1} mb={2}>
                            <Mail color="#e11d48" />
                            <Typography color="text.secondary">
                                {bioData.email}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                            <MapPin color="#059669" />
                            <Typography color="text.secondary">
                                {bioData.location}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box display="flex" alignItems="center" gap={1} mb={2}>
                            <Phone color="#2563eb" />
                            <Typography color="text.secondary">
                                {bioData.phone}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Calendar color="#4f46e5" />
                            <Typography color="text.secondary">
                                Joined Jan 2024
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box display="flex" alignItems="center" gap={1} mb={2}>
                            <Linkedin color="#0077b5" />
                            <Typography color="text.secondary">
                                {bioData.linkedin}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Instagram color="#e4405f" />
                            <Typography color="text.secondary">
                                {bioData.instagram}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            {/* Toggle Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Content Toggle"
                    size="large"
                >
                    <ToggleButton 
                        value="documents"
                        sx={{
                            px: 4,
                            borderRadius: '8px 0 0 8px',
                            '&.Mui-selected': {
                                backgroundColor: '#4f46e5',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#4338ca'
                                }
                            }
                        }}
                    >
                        Documents
                    </ToggleButton>
                    <ToggleButton 
                        value="certificates"
                        sx={{
                            px: 4,
                            borderRadius: '0 8px 8px 0',
                            '&.Mui-selected': {
                                backgroundColor: '#4f46e5',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#4338ca'
                                }
                            }
                        }}
                    >
                        Certificates
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Content Section */}
            <Paper sx={{ 
                width: '90%', 
                maxWidth: '1500px', 
                margin: '0 auto', 
                mb: 4,
                p: 3,
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
                {/* Header with Title and Add Button */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    mb: 3 
                }}>
                    <Typography variant="h5" fontWeight="bold">
                        {alignment === 'documents' ? 'Official Documents' : 'Certificates'}
                    </Typography>
                    <Button
                        variant="outlined"
                        color="black"
                        startIcon={<Plus />}
                        onClick={() => handleUploadDialogOpen(alignment)}
                    >
                        Add {alignment === 'documents' ? 'Document' : 'Certificate'}
                    </Button>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Items List */}
                <Box>
                    {(alignment === 'documents' ? documents : certificates).map((item, index) => (
                        <React.Fragment key={item.id}>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                py: 2,
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.02)'
                                }
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                    <FileText size={24} style={{ marginRight: '12px' }} />
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="medium">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.issuer && `Issuer: ${item.issuer} • `}Added: {item.date}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Tooltip title="View">
                                        <IconButton onClick={() => handleView(item)} color="primary" size="small">
                                            <Eye size={20} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Download">
                                        <IconButton onClick={() => handleDownload(item)} color="primary" size="small">
                                            <Download size={20} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton 
                                            onClick={() => handleDelete(item.id, alignment)} 
                                            color="error"
                                            size="small"
                                        >
                                            <Trash2 size={20} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                            {index < (alignment === 'documents' ? documents : certificates).length - 1 && (
                                <Divider />
                            )}
                        </React.Fragment>
                    ))}
                    {(alignment === 'documents' ? documents : certificates).length === 0 && (
                        <Typography color="text.secondary" textAlign="center" py={4}>
                            No {alignment} found. Click the Add button to upload one.
                        </Typography>
                    )}
                </Box>
            </Paper>

            {/* Update Bio Dialog */}
            <Dialog open={openBioDialog} onClose={handleBioDialogClose} maxWidth="sm" fullWidth>
                <DialogTitle>Update Bio Information</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={bioData.email}
                            onChange={(e) => setBioData({ ...bioData, email: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Phone"
                            value={bioData.phone}
                            onChange={(e) => setBioData({ ...bioData, phone: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Location"
                            value={bioData.location}
                            onChange={(e) => setBioData({ ...bioData, location: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="LinkedIn Profile"
                            value={bioData.linkedin}
                            onChange={(e) => setBioData({ ...bioData, linkedin: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Instagram Handle"
                            value={bioData.instagram}
                            onChange={(e) => setBioData({ ...bioData, instagram: e.target.value })}
                            margin="normal"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBioDialogClose} color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleBioSubmit} variant="contained" color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Upload Dialog */}
            <Dialog open={openUploadDialog} onClose={handleUploadDialogClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Add New {uploadType === 'documents' ? 'Document' : 'Certificate'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Title"
                            value={newItemTitle}
                            onChange={(e) => setNewItemTitle(e.target.value)}
                            margin="normal"
                        />
                        {uploadType === 'certificates' && (
                            <TextField
                                fullWidth
                                label="Issuer"
                                margin="normal"
                            />
                        )}
                        <Box sx={{ mt: 2 }}>
                            <input
                                type="file"
                                accept=".pdf,image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                            />
                            <Button
                                variant="outlined"
                                onClick={() => fileInputRef.current.click()}
                                startIcon={<Plus />}
                            >
                                Select File
                            </Button>
                            {selectedFile && (
                                <Typography sx={{ mt: 1 }}>
                                    Selected: {selectedFile.name}
                                </Typography>
                            )}
                        </Box>
                        {error && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {error}
                            </Alert>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUploadDialogClose} color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleUploadSubmit} variant="contained">
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Profile;