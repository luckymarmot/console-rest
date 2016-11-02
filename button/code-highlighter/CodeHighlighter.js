import React, { Component } from 'react'

import hljs from './highlight'
import lang_http from './languages/http'
import lang_json from './languages/json'
import lang_yaml from './languages/yaml'
import lang_markdown from './languages/markdown'

hljs.registerLanguage('http', lang_http)
hljs.registerLanguage('json', lang_json)
hljs.registerLanguage('yaml', lang_yaml)
hljs.registerLanguage('markdown', lang_markdown)

require('./code-highlighter.styl')

export default class CodeHighlighter extends Component {
    static propTypes = {
        input: React.PropTypes.string,
        lang: React.PropTypes.string
    }
    static defaultProps = {
        lang: 'http'
    }

    tokensToLines(input, tokens) {
        let tokenPos = 0
        let lines = [ [] ]
        for (let token of tokens) {
            let subInput = input.substr(tokenPos, token.len)
            let subLines = subInput.split('\n')
            let i = 0
            for (let subLine of subLines) {
                if (i > 0) {
                    lines.push([])
                }
                lines[lines.length - 1].push({
                    text: subLine,
                    className: token.className
                })
                i += 1
            }
            tokenPos += token.len
        }
        return lines
    }

    renderLine(line) {
        let tokenComponents = []
        let count = 0
        for (let token of line) {
            let className = null
            if (token.className) {
                className = `hljs-${token.className}`
            }
            tokenComponents.push(<span key={count} className={className}>
                {token.text || '\r'}
            </span>)
            count += 1
        }
        return tokenComponents
    }

    renderText() {
        const { input, lang } = this.props

        // parse with highlightjs
        const tokens = hljs.highlight(lang, input, true).value

        // get lines
        const lines = this.tokensToLines(input, tokens)

        let lineComponents = []
        let count = 0
        for (let line of lines) {
            lineComponents.push(<span key={count} className="line">
                {this.renderLine(line)}
            </span>)
            count += 1
        }
        return lineComponents
    }

    render() {
        const { className } = this.props
        return <pre className={className}>{this.renderText()}</pre>
    }
}
