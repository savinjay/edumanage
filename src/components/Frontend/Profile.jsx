import React from 'react';
//{ useState } 

import { Mail, Phone, MapPin, Calendar, Pencil, LogOut, FileLock2, } from 'lucide-react';
import {
    // FormControl,
    // InputLabel,
    //TextField,
    Button,
    Typography,
    Box,
    Paper,
    Grid,
    //Card,
    //CardContent,
} from '@mui/material';

export default function Profile() {
    // const [studentData, setStudentData] = useState({
    //     name: '',
    //     age: null,
    //     class: null,
    //     college: null,
    //     bloodGroup: null,
    //     UUCMS: null
    // });

    // const [editMode, setEditMode] = useState(false);

    // const handleEditToggle = () => {
    //     setEditMode(!editMode);
    // };

    // const handleDataUpdate = (field, value) => {
    //     setStudentData({ ...studentData, [field]: value });
    // };

    // const [documents, setDocuments] = useState([]);
    // const [officialDocs, setOfficialDocs] = useState([]);
    // const [certificates, setCertificates] = useState([]);
    // const [showAddForm, setShowAddForm] = useState(false);
    // const [newCertificate, setNewCertificate] = useState({
    //     name: '',
    //     course: '',
    //     pdf: null,
    //     aadhar: null,
    //     tenthMarks: null,
    //     twelfthMarks: null
    // });
    // const [showAddDocForm, setShowAddDocForm] = useState(false);
    // const [newDocument, setNewDocument] = useState({
    //     name: '',
    //     pdf: null
    // });

    // const handleAddDocument = () => {
    //     if (newDocument.name && newDocument.pdf) {
    //         setDocuments([...documents, newDocument]);
    //         setNewDocument({ name: '', pdf: null });
    //         setShowAddDocForm(false);
    //     }
    // };

    // const handleAddCertificate = () => {
    //     if (newCertificate.name && newCertificate.course && newCertificate.pdf) {
    //         setCertificates([...certificates, newCertificate]);
    //         setNewCertificate({ name: '', course: '', pdf: null });
    //         setShowAddForm(false);
    //     }
    // };

    // const handleFileCertificateChange = (event) => {
    //     setNewCertificate({ ...newCertificate, pdf: event.target.files[0] });
    // };

    // const handleDeleteCertificate = (index) => {
    //     setCertificates(certificates.filter((_, i) => i !== index));
    // };
    // const handleOfficialDocUpload = (docType, file) => {
    //     setOfficialDocs({ ...officialDocs, [docType]: file });
    // };

    // const handleDeleteOfficialDoc = (docType) => {
    //     setOfficialDocs({ ...officialDocs, [docType]: null });
    // };

    // const handleFileChange = (event, type) => {
    //     setNewDocument({ ...newDocument, pdf: event.target.files[0] });
    // };



    // const DocumentSection = ({ title, document, docType }) => (
    //     <Paper
    //         sx={{
    //             p: 3, backgroundColor: '#F0F0F0',
    //             color: 'black',
    //         }}
    //     >
    //         <Typography variant="h6" gutterBottom>{title}</Typography>
    //         {document ? (

    //             <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
    //                 <Button variant="contained" onClick={() => window.open(URL.createObjectURL(document))}>
    //                     View
    //                 </Button>
    //                 <Button
    //                     variant="contained"
    //                     color="secondary"
    //                     onClick={() => {
    //                         const link = window.document.createElement('a');
    //                         link.href = URL.createObjectURL(document);
    //                         link.download = `${title}.pdf`;
    //                         link.click();
    //                     }}
    //                 >
    //                     Download
    //                 </Button>
    //                 <Button
    //                     variant="contained"
    //                     color="error"
    //                     onClick={() => handleDeleteOfficialDoc(docType)}
    //                 >
    //                     Delete
    //                 </Button>
    //             </Box>
    //         ) : (
    //             <Box>
    //                 <input
    //                     type="file"
    //                     accept="application/pdf"
    //                     onChange={(e) => handleOfficialDocUpload(docType, e.target.files[0])}
    //                     style={{ display: 'none' }}
    //                     id={`${docType}-upload`}
    //                 />
    //                 <label htmlFor={`${docType}-upload`}>
    //                     <Button variant="contained" component="span">
    //                         Add Document
    //                     </Button>
    //                 </label>
    //             </Box>
    //         )}
    //     </Paper>
    // );

    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundColor: 'rgba(113, 126, 142, 0.15)',
        }}>
 {/* page header and navigation bar            */}
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0px 1px',
                backgroundColor: 'white'
            }}>
                <Typography
                    variant="h4"
                    fontStyle={'bold'}
                    sx={{ marginLeft: '20px' }}
                    gutterBottom>
                    <FileLock2 size={40} />
                    EduVault
                </Typography>
                <Button variant='outlined' color='black' sx={{ marginRight: '20px' }} ><LogOut /> Logout</Button>
            </nav>

{/* profile and bio */}
            <Paper sx={{
                position: 'absolute',
                top: '149px',
                left: '71px',
                width: '1760px',
                height: '251px',
                background: '#FFFEFFFF',
                borderradius: '6px', /* border-m */
                borderwidth: '1px',
                bordercolor: '#F9FAFBFF',
                borderstyle: 'solid',
                boxshadow: '0px 0px 1px #171a1f12, 0px 0px 2px #171a1f1F', /* shadow-xs */
            }}>
                <img style={{
                    borderRadius: '100%',
                    border: 'solid 1px black',
                    position: 'absolute',
                    top: '32px',    
                    left: '34px',
                    width: '140.5081374321881px',
                    height: '140.5081374321881px',
                    background: '50%rgba(192, 201, 213, 0.36)', /* primary-200 */
                    opacity: '10',
                    overflow: 'hidden',  
                }} src="https://imgs.search.brave.com/XoCvQPCR8cwB92wTx6BVnT53TrDFDtYoR58BYS3mj6M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE5/NjA4Mzg2MS92ZWN0/b3Ivc2ltcGxlLW1h/bi1oZWFkLWljb24t/c2V0LmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1hOGZ3ZFg2/VUtVVkNPZWROX3Aw/cFBzenU4QjRmNnNq/YXJEbVVHSG5ndmRN/PQ" alt=" insert your Profile Pic" />
                <Typography position={'absolute'} fontFamily={'Archivo'} fontSize={'30px'} fontWeight={700} lineHeight={'46px'} color={'#1F273FFF'} top={'36px'} left={'210px'}>Savinjaya H N</Typography>
                <Typography position={'absolute'} fontFamily={'Archivo'} fontSize={'20px'} fontWeight={700} lineHeight={'30px'} color={'#85869CFF'} top={'82px'} left={'210px'}>Student</Typography>
                <Button variant='outlined' color='black' sx={{ marginRight: '20px',position: 'absolute',top: '48px',  left: '1450px'}}><Pencil/>Update Bio</Button>
                <div style={{position:'absolute', top:'134px', left:'210px'}}><Mail color='brown'/><Typography position={'absolute'} fontFamily={'Inter'} fontSize={'19px'} fontWeight={400} color={'#85869CFF'} top={'-4px'} left={'30px'}>me</Typography></div>
                <div style={{position:'absolute',top:'180px', left:'210px'}}><MapPin color='green'/><Typography position={'absolute'} fontFamily={'Archivo'} fontSize={'20px'} fontWeight={700} color={'#85869CFF'} top={'-4px'} left={'30px'}>location</Typography></div>
                <div style={{position:'absolute',top:'134px', left:'1015px'}}><Phone color='blue'/><Typography position={'absolute'} fontFamily={'Archivo'} fontSize={'20px'} fontWeight={700} color={'#85869CFF'} top={'-4px'} left={'30px'}>Phone</Typography></div>
                <div style={{position:'absolute',top:'180px', left:'1015px'}}><Calendar color='black'/><Typography position={'absolute'} fontFamily={'Inter'} fontSize={'20px'} fontWeight={400} color={'#85869CFF'} top={'-4px'} left={'30px'}>date</Typography></div>
            </Paper>

            {/* <Paper sx={{
                p: 4, mb: 0,
                background: 'linear-gradient(135deg, #2F4F7F 0%, #1A1D23 100%)',                
                color: 'white',
            }}>
                <Typography variant="h4" gutterBottom>Student Profile</Typography>
                <Button variant="contained" color="primary" onClick={handleEditToggle}>
                    {editMode ? 'Save' : 'Edit'}
                </Button>
                <Paper elevation={3} sx={{
                    p: 6,
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                }}>
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
                </Paper>
            </Paper> */}



            <Grid container spacing={2}>

                <Grid item xs={13} sm={13}>

                    {/* Official documnets */}

                    {/* <Paper sx={{ display: 'block', p: 3, mb: 0, background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', justifyItems: 'center', color: '#333', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                            <Typography variant="h5" gutterBottom>Official Documents</Typography>
                            <Grid item xs={12} sm={9} sx={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
                                <DocumentSection title="Aadhar Card" document={officialDocs.aadhar} docType="aadhar" />
                                <DocumentSection title="10th Marks Card" document={officialDocs.tenthMarks} docType="tenthMarks" />
                                <DocumentSection title="12th Marks Card" document={officialDocs.twelfthMarks} docType="twelfthMarks" />
                            </Grid>
                        </Paper> */}
                </Grid>
                {/* Additional Documents */}
                <Grid item xs={12} sm={6}>
                    {/* <Paper sx={{ p: 3, mb: 3, background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', color: '#333', minHeight: '150px', maxWidth: '700px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
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
                        </Paper> */}
                </Grid>
                <Grid item xs={12} sm={6}>


                    {/* course completion documents */}
                    {/* <Paper sx={{ p: 3, mb: 3, background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', minHeight: '150px', color: '#333', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
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
                        </Paper> */}
                </Grid>

            </Grid>         
        </Box >
    );
}

