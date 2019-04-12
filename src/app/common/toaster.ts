import Swal from 'sweetalert2';

export class Toaster {
    private toaster: any;
    constructor() {
        this.toaster = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500
        });
    }

    public showSuccess(title: string, message?: string) {
        this.toaster.fire({ title, text: message, type: 'success' });
    }

    public showInfo(title: string, message?: string) {
        this.toaster.fire({ title, text: message, type: 'info' });
    }

    public showError(title: string, message?: string) {
        this.toaster.fire({ title, text: message, type: 'error' });
    }

    public showModalSuccess(title: string, message?: string) {
        Swal.fire(title, message, "success");
    }

    public showModalError(title: string, message?: string) {
        Swal.fire(title, message, "error");
    }
}