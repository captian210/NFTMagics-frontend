import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const CreateNFTModal = styled('div')((theme) => {

  const sm = useMediaQuery('(max-width:600px)');
  const md = useMediaQuery('(max-width:900px)');

  return ({
    // backgroundImage: 'linear-gradient(rgb(255 255 255 / 9%), rgb(137 137 137 / 99%))',
    '& .modal-title': {
      fontSize: '1.7rem',
      fontWeight: 600,
      textAlign: 'center'
    },
    '& .modal-body': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...(sm && {
        flexDirection: 'column'
      }),
      '& .select-item': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        textDecoration: 'none',
        transition: 'all 0.3s',
        '& img': {
          height: 400,
          transition: 'all 0.3s',
        },
        '&:hover img': {
          transition: 'all 0.3s',
          transform: 'scale(1.1)'
        },
        '& button': {
          marginTop: 30,
          width: 200,
          clipPath: 'polygon( calc(0px + 15px) 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, calc(0px + 15px) 100%, 0 50% )',
          display: 'inline-block',
          fontWeight: 700,
          fontSize: 20,
          color: '#fff',
          lineHeight: 1,
          padding: '14px 26px',
          transition: 'all 0.3s',
          position: 'relative',
          background: '#5c49d0',
          textTransform: 'capitalize',
          ...((sm || md) && {
            width: 160,
            fontSize: 15,
          }),
          '&:hover': {
            background: '#cf3464',
          }
        },
        '&:hover button': {
          background: '#cf3464',
        },
      }
    },
    '& .modal-actions button': {
      display: 'none',
      ...(( sm || md ) && {
        display: 'block',
        position: 'fixed',
        bottom: 10
      })
    }
  })
})