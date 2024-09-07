import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default function FormDialog({ onFormSubnit }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: "",
    datetime: null,
    location: "",
    description: "",
    media: "",
    media_url: ""
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      datetime: date,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted:', JSON.stringify(formData));
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Form submitted successfully');
        handleClose();
        if (onFormSubnit) {
          onFormSubnit();
        }
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <React.Fragment>
      <Fab 
        size="large"
        style={{ 
          position: 'fixed', 
          bottom: '100px', 
          right: '20px',
          backgroundColor: "#71C5D5" 
        }} 
        onClick={handleClickOpen}
      >
        <AddIcon style={{ color: "#EDF8FA" }} />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>新增活動</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="活動名稱"
            type="text"
            fullWidth
            variant="standard"
            value={formData.title}
            onChange={handleChange}
          />
          <DateTimePicker
            required
            margin="dense"
            id="datetime"
            name="datetime"
            label="活動時間"
            fullWidth
            variant="standard"
            value={formData.datetime}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 3 }} 
          />
          <TextField
            required
            margin="dense"
            id="location"
            name="location"
            label="活動地點"
            type="text"
            fullWidth
            variant="standard"
            value={formData.location}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="敘述"
            type="text"
            fullWidth
            variant="standard"
            value={formData.description}
            onChange={handleChange}
          />
          <FormControl sx={{ mt: 3, minWidth: 120 }} size="small">
            <InputLabel id="media-label">封面</InputLabel>
            <Select
              id="media"
              name="media"
              labelId="media-label"
              label="封面"
              fullWidth
              value={formData.media}
              onChange={handleChange}
            >
              <MenuItem value={"image"}>圖片</MenuItem>
              <MenuItem value={"video"}>影片</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="media_url"
            name="media_url"
            label="圖片連結或影片 youtube 連結"
            type="text"
            fullWidth
            variant="standard"
            value={formData.media_url}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button type="submit">新增</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}