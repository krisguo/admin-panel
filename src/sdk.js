import { TokenD, base } from '@tokend/js-sdk'

let _sdkInstance = null

export class Sdk {
  static async init (serverUrl) {
    _sdkInstance = await TokenD.create(
      serverUrl,
      { allowHttp: true } // true for use http, only localhost
    )
    return _sdkInstance
  }

  static initSync (serverUrl) {
    _sdkInstance = new TokenD(serverUrl)
    return _sdkInstance
  }

  static getInstance () {
    return _sdkInstance
  }

  static get sdk () {
    return _sdkInstance
  }

  static get base () {
    return base
  }

  static get xdr () {
    return base.xdr
  }

  static get horizon () {
    return _sdkInstance.horizon
  }

  static get api () {
    return _sdkInstance.api
  }
}
