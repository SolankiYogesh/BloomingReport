export default class Loader {
  static loader: AppLoaderRefType

  static setLoader(loader: AppLoaderRefType) {
    this.loader = loader
  }

  static isLoading(check: boolean) {
    try {
      this.loader?.showLoader(check)
    } catch (_) {
      // something went wrong
    }
  }
}
