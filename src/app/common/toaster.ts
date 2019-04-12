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

    public showSuccess(title: string, message: string) {
        this.toaster.fire({ title, text: message, type: 'success' });
    }

    public showError(title: string, message: string) {
        this.toaster.fire({ title, text: message, type: 'error' });
    }
}