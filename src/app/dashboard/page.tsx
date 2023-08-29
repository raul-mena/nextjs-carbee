"use client";

import { useEffect, useState } from 'react';
import AppoinmentCard from '../components/AppoinmentCard';
import { AppoinmentModal, PaginationInfo } from '../../interfaces/Appoinment';
import { Alert, Box, CircularProgress, Divider, Snackbar, styled } from '@mui/material';
import AvailavilityCheck from '../components/AvailabilityCheck';
import { getAppoinments } from '@/api/services/Appoinments';
import { ApiResponse } from '@/types';
import NavBar from '../components/NavBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const TitleDivider = styled(Divider)({
  color: 'gray',
  margin: 10,
  width: '100%',
  textAlign: 'left',
  fontWeight: 'bold'
});

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appoinments, setAppoinments] = useState<AppoinmentModal[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>();
  const [openErrorAlert, setOpenErrorAlert] = useState<boolean>(false);

  useEffect(() => {
    fetchAppoinments()
  }, []);

  const fetchAppoinments = async (next?: string, prev?: string) => {
    try {
      setIsLoading(true);
      const response: ApiResponse = await getAppoinments(next, prev);
      if (response.success) {
        const { data: { appoinments, pageInfo } } = response;
        setAppoinments(appoinments);
        setPaginationInfo(pageInfo);
      }
    } catch (error) {
      setOpenErrorAlert(true)
    } finally {
      setIsLoading(false);
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorAlert(false);
  };

  const nextPage = () => {
    fetchAppoinments(paginationInfo?.nextCursor)
  }

  const previusPage = () => {
    fetchAppoinments(undefined, paginationInfo?.previousCursor)
  }

  if (isLoading) {
    return (
      <div className='flex top-2'>
        <CircularProgress />
      </div>
    )  
  }

  return (
    <>
      <NavBar />
      <div className='flex top-2'>
        <TitleDivider>Select Date to Check Availability</TitleDivider>
        <Box>
          <AvailavilityCheck />
        </Box>
        <TitleDivider>Appointments</TitleDivider>
        <div className='flex'>
          {
            appoinments.map((item: AppoinmentModal) => (
              <AppoinmentCard key={item.node.id} {...item} />
            ))
          }
        </div>
        <div className='flex'>
          <div className='margin-20'>
            <button disabled={!paginationInfo?.hasPreviousPage} onClick={previusPage}>
              <ArrowBackIcon />
            </button>
          </div>
          ...
          <div className='margin-20'>
            <button disabled={!paginationInfo?.hasNextPage} onClick={nextPage}>
              <ArrowForwardIcon />
             </button>
          </div>
        </div>
      </div>
      <Snackbar open={openErrorAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Something was wrong, please try again
        </Alert>
      </Snackbar>
    </>
   
  )
}

export default Dashboard