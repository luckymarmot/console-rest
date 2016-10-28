/**
 * Created by matthaus on 12/04/2016.
 */


// NOTE: event name is all lower case as per DOM convention
window.addEventListener('unhandledrejection', function(e) {
    // NOTE: e.preventDefault() must be manually called to prevent the default
    // action which is currently to log the stack trace to console.warn
    // NOTE: parameters are properties of the event detail property
    throw e
    // See Promise.onPossiblyUnhandledRejection for parameter documentation
})

// NOTE: event name is all lower case as per DOM convention
window.addEventListener('rejectionhandled', function(e) {
    // NOTE: e.preventDefault() must be manually called prevent the default
    // action which is currently unset (but might be set to something in the
    // future)
    e.preventDefault()
    // NOTE: parameters are properties of the event detail property
    // See Promise.onUnhandledRejectionHandled for parameter documentation
    throw e
})

import React from 'react'
import ReactDOM from 'react-dom'
import Converter from 'crest/app/converter/Converter'

require('./basics/body.styl')

ReactDOM.render(<Converter className="col"/>, document.getElementById('root'))
