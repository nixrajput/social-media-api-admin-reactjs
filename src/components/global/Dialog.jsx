import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

const CustomDialog = ({ title, content, open, handleClose, actions = null }) => {

    return (
        <BootstrapDialog
            onClose={() => handleClose}
            aria-labelledby="custom-dialog-title"
            open={open}
            fullWidth={true}
            keepMounted={true}
        >
            <BootstrapDialogTitle
                id="custom-dialog-title"
                onClose={handleClose}
            >
                {title}
            </BootstrapDialogTitle>

            <DialogContent dividers>
                {content}
            </DialogContent>

            <DialogActions>
                <Button
                    autoFocus
                    onClick={handleClose}
                    color="inherit"
                >
                    Close
                </Button>
                {actions}
            </DialogActions>
        </BootstrapDialog>
    );
};

export default CustomDialog;