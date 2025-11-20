class LoaderServiceClass {
  showLoader: any = null;
  hideLoader: any = null;

  register(show: any, hide: any) {
    this.showLoader = show;
    this.hideLoader = hide;
  }

  show(title?: string, message?: string) {
    if (this.showLoader) {
      this.showLoader({ title, message });
    }
  }

  hide() {
    if (this.hideLoader) {
      this.hideLoader();
    }
  }
}

const LoaderService = new LoaderServiceClass();
export default LoaderService;
