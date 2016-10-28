export default class PawInterface {
    /* eslint-disable max-len */
    static sig = 'ad1003ef52fcdd00be6331d1f2e92bbd6a9f8c6dea651d4342a7add587c7ef3f9975afff123b1b7cbbd83260ec8f6286cca89ef032c5b428f5be24ce3fd07707'
    /* eslint-enable max-len */

    static getExportUrl() {
        let callbackUrl = 'http://console.rest/#?format=swagger&' +
            'version=v2.0&name={{name}}&content={{content}}'

        let pawUrl = 'paw://current.document/export?' +
            'url=' + encodeURIComponent(callbackUrl) +
            '&name=' + encodeURIComponent('Console.REST') +
            '&target=' + encodeURIComponent('swagger') +
            '&signature=' + encodeURIComponent(PawInterface.sig)

        return pawUrl
    }

    static getImportUrl() {
        return ''
    }
}
