import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Calendar, Pencil, LogOut, FileLock2, Linkedin, Instagram, Plus, FileText, Download, Eye, Trash2 } from 'lucide-react';
import {
    Button, Typography, Box, Paper, Grid, ToggleButton, ToggleButtonGroup,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton,
    Tooltip, Alert, Divider
} from '@mui/material';
import { supabase } from '../../helper/supabaseClient.js';

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [alignment, setAlignment] = useState('documents');
    const [openBioDialog, setOpenBioDialog] = useState(false);
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const [uploadType, setUploadType] = useState('');
    const [newItemTitle, setNewItemTitle] = useState('');
    const [newItemIssuer, setNewItemIssuer] = useState('');
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [uploadError, setUploadError] = useState('');
    const [loadingProfileFetch, setLoadingProfileFetch] = useState(false);
    const [loadingProfileUpdate, setLoadingProfileUpdate] = useState(false);
    const [loadingDocuments, setLoadingDocuments] = useState(false);
    const [loadingCertificates, setLoadingCertificates] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [itemLoading, setItemLoading] = useState({});

    const [bioData, setBioData] = useState({
        name: '',
        profession: '',
        email: '',
        phone: '',
        location: '',
        birthdate: '',
        linkedin: '',
        instagram: ''
    });

    const [documents, setDocuments] = useState([]);
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) {
                throw error || new Error('No user found');
            }
            setUser(user);
            fetchUserProfile(user);
            fetchDocuments(user);
            fetchCertificates(user);
        } catch (error) {
            console.error('Error checking user:', error.message);
            setError(error.message || 'Failed to authenticate user. Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        }
    };

    const fetchUserProfile = async (user) => {
        try {
            setLoadingProfileFetch(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) throw error;
            if (data) {
                setBioData({
                    name: data.name || '',
                    profession: data.profession || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    location: data.location || '',
                    birthdate: data.birthdate || '',
                    linkedin: data.linkedin || '',
                    instagram: data.instagram || ''
                });
            }
        } catch (error) {
            console.error('Error fetching profile:', error.message);
            setError(error.message || 'Failed to fetch profile. Check your internet connection.');
        } finally {
            setLoadingProfileFetch(false);
        }
    };

    const fetchDocuments = async (user) => {
        try {
            setLoadingDocuments(true);
            const { data, error } = await supabase
                .from('documents')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setDocuments(data || []);
        } catch (error) {
            console.error('Error fetching documents:', error.message);
            setError(error.message || 'Failed to fetch documents. Check your internet connection.');
        } finally {
            setLoadingDocuments(false);
        }
    };

    const fetchCertificates = async (user) => {
        try {
            setLoadingCertificates(true);
            const { data, error } = await supabase
                .from('certificates')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setCertificates(data || []);
        } catch (error) {
            console.error('Error fetching certificates:', error.message);
            setError(error.message || 'Failed to fetch certificates. Check your internet connection.');
        } finally {
            setLoadingCertificates(false);
        }
    };

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error.message);
            setError(error.message || 'Failed to log out. Check your internet connection.');
        }
    };

    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    const handleBioDialogOpen = () => {
        setOpenBioDialog(true);
        setError('');
    };

    const handleBioDialogClose = () => {
        setOpenBioDialog(false);
        setError('');
    };

    const handleBioSubmit = async () => {
        try {
            setLoadingProfileUpdate(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('No user found');

            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    ...bioData,
                    updated_at: new Date().toISOString()
                });

            if (error) throw error;
            setOpenBioDialog(false);
            await fetchUserProfile(user);
        } catch (error) {
            setError(error.message || 'Failed to update profile. Check your internet connection.');
        } finally {
            setLoadingProfileUpdate(false);
        }
    };

    const handleUploadDialogOpen = (type) => {
        setUploadType(type);
        setOpenUploadDialog(true);
        setUploadError('');
        setNewItemTitle('');
        setNewItemIssuer('');
        setSelectedFile(null);
    };

    const handleUploadDialogClose = () => {
        setOpenUploadDialog(false);
        setUploadError('');
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
                setSelectedFile(file);
                setUploadError('');
            } else {
                setUploadError('Please select a PDF or image file');
                setSelectedFile(null);
            }
        }
    };

    const handleUploadSubmit = async () => {
        try {
            setUploading(true);
            if (!selectedFile) {
                throw new Error('Please select a file');
            }
            if (!newItemTitle.trim()) {
                throw new Error('Please enter a title');
            }

            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError || !user) {
                throw new Error('No user found. Please sign in again.');
            }

            // Upload file to Supabase Storage
            const fileExt = selectedFile.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;
            const filePath = `${user.id}/${uploadType}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(uploadType)
                .upload(filePath, selectedFile);

            if (uploadError) {
                if (uploadError.message.includes('not allowed')) {
                    throw new Error('You do not have permission to upload to this bucket.');
                }
                throw uploadError;
            }

            // Create database record
            const newItem = {
                user_id: user.id,
                title: newItemTitle,
                file_path: filePath,
                file_type: selectedFile.type,
                ...(uploadType === 'certificates' && { issuer: newItemIssuer }),
            };

            const { error: dbError } = await supabase
                .from(uploadType)
                .insert([newItem]);

            if (dbError) {
                if (dbError.message.includes('row-level security')) {
                    throw new Error('You do not have permission to upload this item. Ensure you are signed in and have the correct permissions.');
                }
                throw new Error(dbError.message || 'Failed to create document record.');
            }

            // Refresh data
            if (uploadType === 'documents') {
                await fetchDocuments(user);
            } else {
                await fetchCertificates(user);
            }

            handleUploadDialogClose();
        } catch (error) {
            setUploadError(error.message || 'Failed to upload file. Check your internet connection or use a VPN if on school Wi-Fi.');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id, type) => {
        try {
            setItemLoading(prev => ({ ...prev, [`${id}-delete`]: true }));
            const { data: item, error: fetchError } = await supabase
                .from(type)
                .select('file_path')
                .eq('id', id)
                .single();

            if (fetchError) throw fetchError;

            if (item.file_path) {
                const { error: storageError } = await supabase.storage
                    .from(type)
                    .remove([item.file_path]);

                if (storageError) throw storageError;
            }

            const { error: deleteError } = await supabase
                .from(type)
                .delete()
                .eq('id', id);

            if (deleteError) {
                if (deleteError.message.includes('row-level security')) {
                    throw new Error('You do not have permission to delete this item.');
                }
                throw deleteError;
            }

            if (type === 'documents') {
                await fetchDocuments(user);
            } else {
                await fetchCertificates(user);
            }
        } catch (error) {
            setError(error.message || 'Failed to delete item. Check your internet connection or use a VPN if on school Wi-Fi.');
        } finally {
            setItemLoading(prev => ({ ...prev, [`${id}-delete`]: false }));
        }
    };

    const handleDownload = async (item) => {
        try {
            setItemLoading(prev => ({ ...prev, [`${item.id}-download`]: true }));
            const { data: signedUrl, error } = await supabase.storage
                .from(alignment)
                .createSignedUrl(item.file_path, 60);

            if (error) throw error;

            const link = document.createElement('a');
            link.href = signedUrl.signedUrl;
            link.download = item.title;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            setError(error.message || 'Failed to download file. Check your internet connection or use a VPN if on school Wi-Fi.');
        } finally {
            setItemLoading(prev => ({ ...prev, [`${item.id}-download`]: false }));
        }
    };

    const handleView = async (item) => {
        try {
            setItemLoading(prev => ({ ...prev, [`${item.id}-view`]: true }));
            if (!item.file_type.includes('pdf') && !item.file_type.startsWith('image/')) {
                throw new Error('This file type cannot be viewed in the browser. Please download it instead.');
            }

            const { data: signedUrl, error } = await supabase.storage
                .from(alignment)
                .createSignedUrl(item.file_path, 60);

            if (error) throw error;

            window.open(signedUrl.signedUrl, '_blank');
        } catch (error) {
            setError(error.message || 'Failed to view file. Check your internet connection or use a VPN if on school Wi-Fi.');
        } finally {
            setItemLoading(prev => ({ ...prev, [`${item.id}-view`]: false }));
        }
    };

    return (
        <Box sx={{
            minHeight: '150vh',
            backgroundColor: 'rgba(113, 126, 142, 0.15)',
        }}>
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
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </nav>

            {error && (
                <Alert severity="error" onClose={() => setError('')} sx={{ m: 2 }}>
                    {error}
                </Alert>
            )}

            <Paper sx={{
                width: '90%',
                maxWidth: '1500px',
                margin: '2rem auto',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
                {loadingProfileFetch ? (
                    <Typography textAlign="center">Loading profile...</Typography>
                ) : (
                    <>
                        <Grid container spacing={3} alignItems="center">
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

                            <Grid item xs={12} sm={6}>
                                <Typography variant="h4" fontWeight="bold" color="primary">
                                    {bioData.name || "Full Name"}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    {bioData.profession || "Profession"}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<Pencil />}
                                    onClick={handleBioDialogOpen}
                                >
                                    Update Bio
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container spacing={4} sx={{ mt: 4 }}>
                            <Grid item xs={12} md={4}>
                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                    <Mail color="#e11d48" />
                                    <Typography color="text.secondary">
                                        {bioData.email || "Email"}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <MapPin color="#059669" />
                                    <Typography color="text.secondary">
                                        {bioData.location || "Location"}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                    <Phone color="#2563eb" />
                                    <Typography color="text.secondary">
                                        {bioData.phone || "Phone"}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Calendar color="#4f46e5" />
                                    <Typography color="text.secondary">
                                        {bioData.birthdate || "Birthdate"}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                    <Linkedin color="#0077b5" />
                                    <Typography color="text.secondary">
                                        {bioData.linkedin || "LinkedIn"}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Instagram color="#e4405f" />
                                    <Typography color="text.secondary">
                                        {bioData.instagram || "Instagram"}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Paper>

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

            <Paper sx={{ 
                width: '90%', 
                maxWidth: '1500px', 
                margin: '0 auto', 
                mb: 4,
                p: 3,
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
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
                        color="primary"
                        startIcon={<Plus />}
                        onClick={() => handleUploadDialogOpen(alignment)}
                    >
                        Add {alignment === 'documents' ? 'Document' : 'Certificate'}
                    </Button>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Box>
                    {(alignment === 'documents' ? loadingDocuments : loadingCertificates) ? (
                        <Typography textAlign="center">Loading {alignment}...</Typography>
                    ) : (alignment === 'documents' ? documents : certificates).length === 0 ? (
                        <Typography color="text.secondary" textAlign="center" py={4}>
                            No {alignment} found. Click the Add button to upload one.
                        </Typography>
                    ) : (
                        (alignment === 'documents' ? documents : certificates).map((item, index) => (
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
                                                {item.issuer && `Issuer: ${item.issuer} • `}
                                                Added: {new Date(item.created_at).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Tooltip title="View">
                                            <IconButton 
                                                onClick={() => handleView(item)} 
                                                color="primary" 
                                                size="small"
                                                disabled={itemLoading[`${item.id}-view`]}
                                            >
                                                {itemLoading[`${item.id}-view`] ? 'Viewing...' : <Eye size={20} />}
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Download">
                                            <IconButton 
                                                onClick={() => handleDownload(item)} 
                                                color="primary" 
                                                size="small"
                                                disabled={itemLoading[`${item.id}-download`]}
                                            >
                                                {itemLoading[`${item.id}-download`] ? 'Downloading...' : <Download size={20} />}
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton 
                                                onClick={() => handleDelete(item.id, alignment)} 
                                                color="error"
                                                size="small"
                                                disabled={itemLoading[`${item.id}-delete`]}
                                            >
                                                {itemLoading[`${item.id}-delete`] ? 'Deleting...' : <Trash2 size={20} />}
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Box>
                                {index < (alignment === 'documents' ? documents : certificates).length - 1 && (
                                    <Divider />
                                )}
                            </React.Fragment>
                        ))
                    )}
                </Box>
            </Paper>

            <Dialog open={openBioDialog} onClose={handleBioDialogClose} maxWidth="sm" fullWidth>
                <DialogTitle>Update Bio Information</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Name"
                            value={bioData.name}
                            onChange={(e) => setBioData({ ...bioData, name: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Profession"
                            value={bioData.profession}
                            onChange={(e) => setBioData({ ...bioData, profession: e.target.value })}
                            margin="normal"
                        />
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
                            label="Birthdate"
                            type="date"
                            value={bioData.birthdate}
                            onChange={(e) => setBioData({ ...bioData, birthdate: e.target.value })}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
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
                    <Button onClick={handleBioSubmit} variant="contained" color="primary" disabled={loadingProfileUpdate}>
                        {loadingProfileUpdate ? 'Saving...' : 'Save Changes'}
                    </Button>
                </DialogActions>
            </Dialog>

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
                            required
                        />
                        {uploadType === 'certificates' && (
                            <TextField
                                fullWidth
                                label="Issuer"
                                value={newItemIssuer}
                                onChange={(e) => setNewItemIssuer(e.target.value)}
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
                        {uploadError && (
                            <Alert severity="error" sx={{ mt: 2 }} onClose={() => setUploadError('')}>
                                {uploadError}
                            </Alert>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUploadDialogClose} color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleUploadSubmit} variant="contained" color="primary" disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Upload'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Profile;