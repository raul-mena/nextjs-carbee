"use client";

import React, {useState} from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import dayjs from 'dayjs';
import { ApiResponse } from '@/types';
import { checkAvailability } from '@/api/services/Availability';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  minWidth: 500
}));

const DateContainer = styled('div')({
  borderRadius: 4,
  margin: 10,
  textAlign: 'center',
  fontWeight: 'bold'
});

const DateListContainer = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  padding: 8,
  borderRadius: 4,
  margin: 10,
  width: '100%',
  textAlign: 'center',
  fontWeight: 'bold'
});


const Wrap = styled('div')({
  alignItems: 'center'
});

export default function AvailavilityCheck() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoadin] = useState(false);
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [openErrorAlert, setOpenErrorAlert] = useState<boolean>(false);

  const fetchAvailability = async () => {
    try {
      setIsLoadin(true);
      const result: ApiResponse = await checkAvailability(selectedDate);
      setDates(result.data?.map((d: string) => dayjs(d).format('YYYY-MM-DD hh:mm A')))
    } catch (error) {
      setOpenErrorAlert(true)
    } finally {
      setIsLoadin(false);
    }
  }

  const handleErrorMessageClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorAlert(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    fetchAvailability()
  };

  const handleClose = () => setOpen(false);

  return (
    <Wrap className='flex'>
      <DateContainer>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            label="Date"
            format='YYYY-MM-DD'
            onChange={(e: any) => setSelectedDate(dayjs(e).format('YYYY-MM-DD'))}
            disablePast />
        </LocalizationProvider>
      </DateContainer>
      
      <Button style={{minWidth: '120px', minHeight: '55px'}} variant="outlined" disabled={!selectedDate} onClick={handleClickOpen}>
        Check
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, minWidth: 500 }} id="customized-dialog-title">
          Availibility
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className='flex' dividers>
          {isLoading && <CircularProgress />}
          {
            !isLoading && dates.length ? 
              dates.map(item => (
              <DateListContainer key={item}>
                {item}
              </DateListContainer>
            )) : (
              <Typography gutterBottom>
                There is not availavility on this date
              </Typography>
            )
          }
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <Snackbar open={openErrorAlert} autoHideDuration={6000} onClose={handleErrorMessageClose}>
        <Alert onClose={handleErrorMessageClose} severity="error" sx={{ width: '100%' }}>
          Something was wrong, please try again
        </Alert>
      </Snackbar>
    </Wrap>
  );
}
