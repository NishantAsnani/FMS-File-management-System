import React, { useState, useContext } from "react";
import pdfImage from "../../public/pdf.png";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from "../AuthContext";
import { useNavigate } from 'react-router-dom';
import Modal from "./Modal";
import Loading from './Loading';
import {
  Box, Button, Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Card, CardContent, Grid, Menu, MenuItem
} from '@mui/material';
import { styled } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Input = styled('input')({
  display: 'none',
});
const BE_URL=import.meta.env.VITE_BE_URL

function FileUpload({ pdfData, Name }) {
  const [formData, setFormData] = useState(null);
  const [load, setLoading] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [actionAnchorEl, setActionAnchorEl] = useState(null);
  const [actionPdf, setActionPdf] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(e.target.files[0]);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BE_URL}/Logout`, null, {
        headers: {
          Authorization: `${token}`
        }
      });
      if (!response.data) {
        throw new Error("Error");
      } else {
        localStorage.removeItem("token");
        navigate('/Login');
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("file", formData);
      setLoading(true);
      const response = await axios.post(`${BE_URL}/upload/file`, data, {
        headers: {
          Authorization: `${token}`
        }
      });
      if (!response.data) {
        throw new Error("Cannot fetch data");
      } else {
        toast.success("File Uploaded Successfully");
        location.reload();
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      toast.error("File upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Actions menu handlers
  const handleActionClick = (event, pdf) => {
    setActionAnchorEl(event.currentTarget);
    setActionPdf(pdf);
  };

  const handleActionClose = () => {
    setActionAnchorEl(null);
    setActionPdf(null);
  };

  const handleActionSelect = (action) => {
    setSelectedAction(action);
    setSelectedPdf(actionPdf);
    setViewModal(true);
    handleActionClose();
  };

  return (
    <Container maxWidth="md">
      <Box py={6}>
        <Card sx={{ mb: 4, boxShadow: 3 }}>
          <CardContent>
            <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
              <Grid item xs={12} sm={8}>
                <Typography variant="h5" fontWeight={600}>
                  Welcome, {Name}!
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} textAlign={{ xs: 'left', sm: 'right' }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleLogout}
                  sx={{ mb: { xs: 2, sm: 0 } }}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
            <Box component="form" onSubmit={handleSubmit} mt={3} display="flex" alignItems="center" gap={2}>
              <label htmlFor="file">
                <Input id="file" type="file" onChange={handleChange} />
                <Button variant="contained" component="span">
                  Upload File
                </Button>
              </label>
              <Button type="submit" variant="contained" color="primary" disabled={!formData}>
                Submit
              </Button>
            </Box>
            {/* Show file preview below the upload form, before submit */}
            {formData && (
              <Box display="flex" alignItems="center" mt={2} ml={1}>
                <img
                  src={pdfImage}
                  alt="file icon"
                  style={{ width: 28, height: 28, marginRight: 8 }}
                />
                <Typography variant="body2">{formData.name}</Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        <Toaster />

        <Paper elevation={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Owner</TableCell>
                  <TableCell>File</TableCell>
                  <TableCell>Uploaded at</TableCell>
                  <TableCell>File Size</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pdfData && pdfData.map((pdf) => (
                  <TableRow key={pdf._id}>
                    <TableCell>{pdf.authorName || ""}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <img src={pdfImage} alt="" style={{ width: 32, height: 32, marginRight: 8 }} />
                        <a href={pdf.url} target="_blank" rel="noopener noreferrer">{pdf.name || ""}</a>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {pdf.createdAt ? new Date(pdf.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : ""}
                    </TableCell>
                    <TableCell>
                      {pdf.size ? Math.floor((pdf.size / 1000)) : 0} KB
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={(e) => handleActionClick(e, pdf)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        {load && <Loading />}
      </Box>

      <Menu
        anchorEl={actionAnchorEl}
        open={Boolean(actionAnchorEl)}
        onClose={handleActionClose}
      >
        <MenuItem onClick={() => handleActionSelect({ value: 'Access-Right', label: 'Access-Right' })}>
          Access-Right
        </MenuItem>
        <MenuItem onClick={() => handleActionSelect({ value: 'Delete', label: 'Delete' })}>
          Delete
        </MenuItem>
      </Menu>

      <Modal
        viewModal={viewModal}
        setViewModal={setViewModal}
        pdf={selectedPdf}
        selectedOption={selectedAction}
      />
    </Container>
  );
}

export default FileUpload;