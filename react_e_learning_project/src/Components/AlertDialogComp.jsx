import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTranslation} from "react-i18next";

export default function AlertDialog(props) {
    const [t, i18n] = useTranslation("global");
    return (
        <React.Fragment>
            <Dialog
                open={props.openDialog}
                onClose={props.handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleCloseDialog}>
                        {t("dialog.cancel")}
                    </Button>
                    <Button onClick={props.confirm} autoFocus>
                        {t("dialog.confirm")}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}