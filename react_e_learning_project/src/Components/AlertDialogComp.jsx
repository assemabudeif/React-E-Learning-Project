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
                    {t("course.deleteDialogTitle")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t("course.deleteDialogContent")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleCloseDialog}>
                        {t("course.deleteDialogCancel")}
                    </Button>
                    <Button onClick={props.deleteCourse} autoFocus>
                        {t("course.deleteDialogDelete")}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}