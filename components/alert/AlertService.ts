class AlertServiceClass {
    showAlert: any = null;
    hideAlert: any = null;


    register(show: any, hide: any) {
        this.showAlert = show;
        this.hideAlert = hide;
    }

    show( message?: string,title?: string, buttons?: any[]) {
        if (this.showAlert) {
            this.showAlert( title, message, buttons );
        }
    }

    hide() {
        if (this.hideAlert) {
            this.hideAlert();
        }
    }
}

const AlertService = new AlertServiceClass();
export default AlertService;