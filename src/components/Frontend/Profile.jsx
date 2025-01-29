import React, { useState } from 'react';
import {
    // FormControl,
    // InputLabel,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    Grid,
    Card,
    CardContent,
} from '@mui/material';

export default function Profile() {
        const [studentData, setStudentData] = useState({
          name:'',
          age: null,
          class: null,
          college: null,
          bloodGroup: null,
          UUCMS: null
        });

        const [editMode, setEditMode] = useState(false);

        const handleEditToggle = () => {
          setEditMode(!editMode);
        };

        const handleDataUpdate = (field, value) => {
          setStudentData({ ...studentData, [field]: value });
        };

    const [documents, setDocuments] = useState([]);
    const [officialDocs, setOfficialDocs] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCertificate, setNewCertificate] = useState({
        name: '',
        course: '',
        pdf: null,
        aadhar: null,
        tenthMarks: null,
        twelfthMarks: null
    });
    const [showAddDocForm, setShowAddDocForm] = useState(false);
    const [newDocument, setNewDocument] = useState({
        name: '',
        pdf: null
    });

    const handleAddDocument = () => {
        if (newDocument.name && newDocument.pdf) {
            setDocuments([...documents, newDocument]);
            setNewDocument({ name: '', pdf: null });
            setShowAddDocForm(false);
        }
    };

    const handleAddCertificate = () => {
        if (newCertificate.name && newCertificate.course && newCertificate.pdf) {
            setCertificates([...certificates, newCertificate]);
            setNewCertificate({ name: '', course: '', pdf: null });
            setShowAddForm(false);
        }
    };

    const handleFileCertificateChange = (event) => {
        setNewCertificate({ ...newCertificate, pdf: event.target.files[0] });
    };

    const handleDeleteCertificate = (index) => {
        setCertificates(certificates.filter((_, i) => i !== index));
    };
    const handleOfficialDocUpload = (docType, file) => {
        setOfficialDocs({ ...officialDocs, [docType]: file });
    };

    const handleDeleteOfficialDoc = (docType) => {
        setOfficialDocs({ ...officialDocs, [docType]: null });
    };

    const handleFileChange = (event, type) => {
        setNewDocument({ ...newDocument, pdf: event.target.files[0] });
    };



    const DocumentSection = ({ title, document, docType }) => (
        <Paper 
        sx={{
            p: 3, backgroundColor: '#F0F0F0',
            color: 'black',
        }}
        >
            <Typography variant="h6" gutterBottom>{title}</Typography>
            {document ? (
    
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button variant="contained" onClick={() => window.open(URL.createObjectURL(document))}>
                        View
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            const link = window.document.createElement('a');
                            link.href = URL.createObjectURL(document);
                            link.download = `${title}.pdf`;
                            link.click();
                        }}
                    >
                        Download
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteOfficialDoc(docType)}
                    >
                        Delete
                    </Button>
                </Box>
            ) : (
                <Box>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleOfficialDocUpload(docType, e.target.files[0])}
                        style={{ display: 'none' }}
                        id={`${docType}-upload`}
                    />
                    <label htmlFor={`${docType}-upload`}>
                        <Button variant="contained" component="span">
                            Add Document
                        </Button>
                    </label>
                </Box>
            )}
        </Paper>
    );

    return (
        <Box style={{ display: 'block', background: 'white', minHeight: '100vh'}}>
                  <Paper sx={{
                    p:6, mb: 0,
                    backgroundColor: '#2F4F7F',
                    color: 'white',
                  }}>
                    <Typography variant="h4" gutterBottom>Student Profile</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography><strong>Name:</strong> {editMode ? <input type="text" value={studentData.name} onChange={(e) => handleDataUpdate('name', e.target.value)} /> : studentData.name}</Typography>
                        <Typography><strong>Age:</strong> {editMode ? <input type="number" value={studentData.age} onChange={(e) => handleDataUpdate('age', parseInt(e.target.value))} /> : studentData.age}</Typography>
                        <Typography><strong>Class:</strong> {editMode ? <input type="text" value={studentData.class} onChange={(e) => handleDataUpdate('class', e.target.value)} /> : studentData.class}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography><strong>College:</strong> {editMode ? <input type="text" value={studentData.college} onChange={(e) => handleDataUpdate('college', e.target.value)} /> : studentData.college}</Typography>
                        <Typography><strong>Blood Group:</strong> {editMode ? <input type="text" value={studentData.bloodGroup} onChange={(e) => handleDataUpdate('bloodGroup', e.target.value)} /> : studentData.bloodGroup}</Typography>
                        <Typography><strong>UUCMS:</strong> {editMode ? <input type="text" value={studentData.UUCMS} onChange={(e) => handleDataUpdate('UUCMS', e.target.value)} /> : studentData.UUCMS}</Typography>
                      </Grid>
                    </Grid>
                    <Button variant="contained" color="primary" onClick={handleEditToggle}>
                      {editMode ? 'Save' : 'Edit'}
                    </Button>
                  </Paper>


            <Paper elevation={3} sx={{
                p: 2, mb: 3,
                backgroundColor: '#f0f0f0',
                color: 'black',
            }}>
                <Grid container spacing={2}>

                    <Grid item xs={13} sm={13}>
                        <Paper sx={{ display: 'block', p: 3, mb:0, background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', justifyItems:'center',color: '#333', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                            <Typography variant="h5" gutterBottom>Official Documents</Typography>
                            <Grid item xs={12} sm={9} sx={{ display: 'flex', gap: 5, justifyContent: 'center'}}>
                            <DocumentSection title="Aadhar Card" document={officialDocs.aadhar} docType="aadhar" />
                            <DocumentSection title="10th Marks Card" document={officialDocs.tenthMarks} docType="tenthMarks" />
                            <DocumentSection title="12th Marks Card" document={officialDocs.twelfthMarks} docType="twelfthMarks" />
                            </Grid>
                        </Paper>
                    </Grid>
                    {/* Additional Documents */}
                    <Grid item xs={12} sm={6}>
                        <Paper sx={{ p: 3, mb: 3, background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', color: '#333',minHeight:'150px', maxWidth: '700px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                            <Typography variant="h5" gutterBottom>Additional Documents</Typography>
                                {documents.map((doc, index) => (
                                    <Grid item key={index}>
                                        <Card sx={{
                                            backgroundColor: '#f0f0f0',
                                            color: 'black',
                                            mb: '10px',
                                        }}>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>{doc.name}</Typography>
                                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', }}>
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        onClick={() => window.open(URL.createObjectURL(doc.pdf))}
                                                    >
                                                        View
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        size="small"
                                                        onClick={() => {
                                                            const link = document.createElement('a');
                                                            link.href = URL.createObjectURL(doc.pdf);
                                                            link.download = `${doc.name}.pdf`;
                                                            link.click();
                                                        }}
                                                    >
                                                        Download
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        size="small"
                                                        onClick={() => setDocuments(documents.filter((_, i) => i !== index))}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}

                            <Button
                                variant="contained"
                                onClick={() => setShowAddDocForm(true)}
                                sx={{ mt: 2 }}
                            >
                                Add Document
                            </Button>

                            {showAddDocForm && (
                                <Paper sx={{ display: 'block', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', textAlign: 'center', color: '#333', maxWidth: '600px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                                    <Typography variant="h6" gutterBottom>Add New Document</Typography>
                                    <TextField
                                        fullWidth
                                        label="Document Name"
                                        value={newDocument.name}
                                        onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                                        sx={{
                                            mb: 2,
                                            input: { color: 'white' },
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: '#9c27b0', // Change outline color
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#9c27b0', // Change outline color on hover
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#9c27b0', // Change outline color when focused
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'black' // Change label/placeholder color
                                            },
                                            '& .MuiInputLabel-root.Mui-focused': {
                                                color: '#9c27b0' // Change label color when focused
                                            }
                                        }}
                                    />
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={(e) => handleFileChange(e, 'document')}
                                        style={{ display: 'none' }}
                                        id="doc-upload"
                                    />
                                    <label htmlFor="doc-upload">
                                        <Button variant="contained" component="span">
                                            Upload PDF
                                        </Button>
                                    </label>
                                    {newDocument.pdf && (
                                        <Typography sx={{ mt: 1 }}>{newDocument.pdf.name}</Typography>
                                    )}
                                    <Box sx={{ mt: 2 }}>
                                        <Button
                                            variant="contained"
                                            onClick={handleAddDocument}
                                            sx={{ mr: 1 }}
                                        >
                                            Add Document
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => setShowAddDocForm(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </Paper>
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper sx={{ p: 3, mb: 3, background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center',minHeight:'150px', color: '#333', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                            <Typography variant="h5" gutterBottom>Course Completion Certificates</Typography>
                            <Grid container spacing={2}>
                                {certificates.map((cert, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Paper elevation={2} sx={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', textAlign: 'center', color: '#333', maxWidth: '600px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                                            <Typography sx={{ mb: 2, fontStyle: 'bold', color: '#2F4F7F', }}>Course Name :  {cert.name}</Typography>
                                            <Typography sx={{ mb: 2, fontStyle: 'bold', color: '#2F4F7F', }}>Course Details :  {cert.course}</Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => window.open(URL.createObjectURL(cert.pdf))}
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => {
                                                        const link = document.createElement('a');
                                                        link.href = URL.createObjectURL(cert.pdf);
                                                        link.download = `${cert.name}.pdf`;
                                                        link.click();
                                                    }}
                                                >
                                                    Download
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleDeleteCertificate(index)}
                                                >
                                                    Delete
                                                </Button>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>


                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setShowAddForm(true)}
                                sx={{ mt: 1 }}
                            >
                                Add Certificate
                            </Button>


                            {showAddForm && (
                                <Paper elevation={3} sx={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', textAlign: 'center', color: '#333', maxWidth: '600px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                                    <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>Add New Certificate</Typography>
                                    <TextField
                                        fullWidth
                                        color='primary'
                                        label="Certificate Name *"
                                        value={newCertificate.name}
                                        onChange={(e) => setNewCertificate({ ...newCertificate, name: e.target.value })}
                                        sx={{
                                            mb: 2,
                                            input: { color: 'black' },
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: '#9c27b0', // Change outline color
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#9c27b0', // Change outline color on hover
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#9c27b0', // Change outline color when focused
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'black' // Change label/placeholder color
                                            },
                                            '& .MuiInputLabel-root.Mui-focused': {
                                                color: '#9c27b0' // Change label color when focused
                                            }
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        label="Course Details "
                                        color="secondary"
                                        value={newCertificate.course}
                                        onChange={(e) => setNewCertificate({ ...newCertificate, course: e.target.value })}
                                        sx={{
                                            mb: 2,
                                            input: { color: 'black' },
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: '#9c27b0', // Change outline color
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#9c27b0', // Change outline color on hover
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#9c27b0', // Change outline color when focused
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'black   ' // Change label/placeholder color
                                            },
                                            '& .MuiInputLabel-root.Mui-focused': {
                                                color: '#9c27b0' // Change label color when focused
                                            }
                                        }}
                                    />
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handleFileCertificateChange}
                                        style={{ display: 'none' }}
                                        id="pdf-upload"
                                    />
                                    <label htmlFor="pdf-upload">
                                        <Button variant="contained" component="span">
                                            Upload PDF
                                        </Button>
                                    </label>
                                    {newCertificate.pdf && (
                                        <Typography sx={{ mt: 1 }}>{newCertificate.pdf.name}</Typography>
                                    )}
                                    <Box sx={{ mt: 2 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleAddCertificate}
                                            sx={{ mr: 2 }}
                                        >
                                            Add Certificate
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => setShowAddForm(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </Paper>
                            )}
                        </Paper>
                    </Grid>

                </Grid>
            </Paper>
        </Box >
    );
}

